import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendSms, SMS_STOP_RESPONSE, SMS_START_RESPONSE, SMS_HELP_RESPONSE } from '@/lib/sms'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const from = formData.get('from') as string
    const body = formData.get('body') as string

    if (!from || !body) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const message = body.trim().toUpperCase()

    // Handle STOP/START/HELP keywords (TCPA compliance)
    if (message === 'STOP' || message === 'UNSUBSCRIBE') {
      await prisma.smsConsent.update({
        where: { phoneNumber: from },
        data: {
          consentGiven: false,
          revokedAt: new Date(),
        },
      })

      await sendSms({ to: from, message: SMS_STOP_RESPONSE })
      return NextResponse.json({ success: true })
    }

    if (message === 'START' || message === 'SUBSCRIBE') {
      await prisma.smsConsent.upsert({
        where: { phoneNumber: from },
        update: {
          consentGiven: true,
          revokedAt: null,
          consentDate: new Date(),
        },
        create: {
          phoneNumber: from,
          consentGiven: true,
          consentText: 'Re-subscribed via START keyword',
          consentDate: new Date(),
          source: 'sms_keyword',
        },
      })

      await sendSms({ to: from, message: SMS_START_RESPONSE })
      return NextResponse.json({ success: true })
    }

    if (message === 'HELP') {
      await sendSms({ to: from, message: SMS_HELP_RESPONSE })
      return NextResponse.json({ success: true })
    }

    // Find active tracking session for this phone number
    const tracking = await prisma.tracking.findFirst({
      where: {
        pilotPhone: from,
        status: { in: ['monitoring', 'airborne'] },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!tracking) {
      const response = "No active flight tracking found. Visit landedsafe.com to start tracking."
      await sendSms({ to: from, message: response })
      return NextResponse.json({ success: true })
    }

    // Log conversation
    await prisma.aiConversation.create({
      data: {
        trackingId: tracking.id,
        role: 'user',
        content: body,
      },
    })

    // Simple AI response (can be enhanced with OpenAI later)
    let response = ''
    if (tracking.status === 'monitoring') {
      response = `Your flight ${tracking.tailNumber} is being monitored. We'll notify you when you take off and land.`
    } else if (tracking.status === 'airborne') {
      response = `Your flight ${tracking.tailNumber} is currently airborne. We're tracking your landing.`
    }

    // Send response
    await sendSms({ to: from, message: response })

    // Log AI response
    await prisma.aiConversation.create({
      data: {
        trackingId: tracking.id,
        role: 'assistant',
        content: response,
      },
    })

    // Log notification
    await prisma.notificationLog.create({
      data: {
        trackingId: tracking.id,
        type: 'ai_response',
        recipient: from,
        channel: 'sms',
        message: response,
        status: 'sent',
        sentAt: new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error handling inbound SMS:', error)
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
  }
}
