import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendSms, formatPhoneE164, SMS_CONSENT_LANGUAGE } from '@/lib/sms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      tailNumber,
      pilotPhone,
      destination,
      smsConsent,
    } = body

    // Validate required fields
    if (!tailNumber || !pilotPhone) {
      return NextResponse.json(
        { error: 'Tail number and pilot phone are required' },
        { status: 400 }
      )
    }

    if (!smsConsent) {
      return NextResponse.json(
        { error: 'SMS consent is required' },
        { status: 400 }
      )
    }

    // Format phone number
    const formattedPhone = formatPhoneE164(pilotPhone)

    // Create tracking session
    const tracking = await prisma.tracking.create({
      data: {
        tailNumber: tailNumber.toUpperCase(),
        pilotPhone: formattedPhone,
        destination: destination || null,
        status: 'monitoring',
        smsConsentGiven: true,
        smsConsentText: SMS_CONSENT_LANGUAGE,
        smsConsentTimestamp: new Date(),
      },
    })

    // Record SMS consent
    await prisma.smsConsent.upsert({
      where: { phoneNumber: formattedPhone },
      update: {
        consentGiven: true,
        consentText: SMS_CONSENT_LANGUAGE,
        consentDate: new Date(),
        revokedAt: null,
        source: 'tracking_form',
      },
      create: {
        phoneNumber: formattedPhone,
        consentGiven: true,
        consentText: SMS_CONSENT_LANGUAGE,
        consentDate: new Date(),
        source: 'tracking_form',
      },
    })

    // Send welcome SMS
    const welcomeMessage = `LandedSafe tracking activated for ${tailNumber}. We'll monitor your flight and notify you when you land. Text STOP to opt out. landedsafe.com/track/${tracking.trackingId}`

    const smsResult = await sendSms({
      to: formattedPhone,
      message: welcomeMessage,
    })

    // Log the notification
    await prisma.notificationLog.create({
      data: {
        trackingId: tracking.id,
        type: 'welcome',
        recipient: formattedPhone,
        channel: 'sms',
        message: welcomeMessage,
        status: smsResult.success ? 'sent' : 'failed',
        sentAt: smsResult.success ? new Date() : null,
        failureReason: smsResult.error || null,
        providerId: smsResult.messageId || null,
      },
    })

    return NextResponse.json({
      success: true,
      trackingId: tracking.trackingId,
      trackingUrl: `/track/${tracking.trackingId}`,
    })
  } catch (error) {
    console.error('Error creating tracking session:', error)
    return NextResponse.json(
      { error: 'Failed to create tracking session' },
      { status: 500 }
    )
  }
}
