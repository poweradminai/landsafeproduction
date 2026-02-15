import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAircraftByHex, isAirborne, isLanded, isEmergencyDescent } from '@/lib/adsb'
import { sendSms } from '@/lib/sms'

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get all active tracking sessions
    const activeSessions = await prisma.tracking.findMany({
      where: {
        status: { in: ['monitoring', 'airborne'] },
      },
    })

    let processed = 0
    let errors = 0

    for (const session of activeSessions) {
      try {
        // Look up ICAO hex if not stored
        let icaoHex = session.icaoHex
        if (!icaoHex) {
          // TODO: Add tail number → ICAO hex lookup (FAA registry API)
          continue
        }

        // Get aircraft data from ADS-B Exchange
        const adsbData = await getAircraftByHex(icaoHex)
        const aircraft = adsbData.ac?.[0]

        if (!aircraft) {
          continue // Aircraft not visible on ADS-B (not flying or out of range)
        }

        const currentlyAirborne = isAirborne(aircraft, session.speedThreshold)
        const wasAirborne = session.status === 'airborne'

        // Update tracking data
        await prisma.tracking.update({
          where: { id: session.id },
          data: {
            lastPosition: aircraft.lat && aircraft.lon
              ? { lat: aircraft.lat, lon: aircraft.lon }
              : null,
            lastGroundSpeed: aircraft.gs,
            lastAltitude: aircraft.alt_baro,
            lastVerticalSpeed: aircraft.baro_rate,
            lastUpdated: new Date(),
          },
        })

        // Detect takeoff
        if (currentlyAirborne && !wasAirborne) {
          await prisma.tracking.update({
            where: { id: session.id },
            data: {
              status: 'airborne',
              takeoffTime: new Date(),
            },
          })

          const message = `${session.tailNumber} is now airborne. We'll notify you when you land. Safe flight!`
          const smsResult = await sendSms({
            to: session.pilotPhone,
            message,
          })

          await prisma.notificationLog.create({
            data: {
              trackingId: session.id,
              type: 'takeoff',
              recipient: session.pilotPhone,
              channel: 'sms',
              message,
              status: smsResult.success ? 'sent' : 'failed',
              sentAt: smsResult.success ? new Date() : null,
              failureReason: smsResult.error || null,
            },
          })
        }

        // Detect landing
        if (!currentlyAirborne && wasAirborne) {
          await prisma.tracking.update({
            where: { id: session.id },
            data: {
              status: 'landed',
              landingTime: new Date(),
            },
          })

          const message = `${session.tailNumber} has landed safely${session.destination ? ` at ${session.destination}` : ''}. Welcome back!`
          const smsResult = await sendSms({
            to: session.pilotPhone,
            message,
          })

          await prisma.notificationLog.create({
            data: {
              trackingId: session.id,
              type: 'landing',
              recipient: session.pilotPhone,
              channel: 'sms',
              message,
              status: smsResult.success ? 'sent' : 'failed',
              sentAt: smsResult.success ? new Date() : null,
              failureReason: smsResult.error || null,
            },
          })
        }

        // Check for emergency descent
        if (wasAirborne && isEmergencyDescent(aircraft, session.descentThreshold)) {
          const message = `⚠️ ${session.tailNumber}: Steep descent detected (${aircraft.baro_rate} ft/min). This is advisory only - your judgment takes precedence.`
          const smsResult = await sendSms({
            to: session.pilotPhone,
            message,
          })

          await prisma.notificationLog.create({
            data: {
              trackingId: session.id,
              type: 'emergency',
              recipient: session.pilotPhone,
              channel: 'sms',
              message,
              status: smsResult.success ? 'sent' : 'failed',
              sentAt: smsResult.success ? new Date() : null,
              failureReason: smsResult.error || null,
            },
          })
        }

        processed++
      } catch (error) {
        console.error(`Error processing session ${session.id}:`, error)
        errors++
      }
    }

    return NextResponse.json({
      success: true,
      processed,
      errors,
      total: activeSessions.length,
    })
  } catch (error) {
    console.error('Flight monitor error:', error)
    return NextResponse.json(
      { error: 'Flight monitor failed' },
      { status: 500 }
    )
  }
}
