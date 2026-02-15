// SIBT (Send It By Text) SMS client with TCPA compliance

export interface SmsOptions {
  to: string // phone number (E.164 format)
  message: string
  uid?: string // SIBT user ID (optional, uses default if not provided)
}

export interface SmsResponse {
  success: boolean
  messageId?: string
  error?: string
}

export async function sendSms(options: SmsOptions): Promise<SmsResponse> {
  const apiKey = process.env.SIBT_API_KEY
  const apiUrl = process.env.SIBT_API_URL || 'https://useclientconnect.com/api/v2/'
  const defaultUid = process.env.SIBT_DEFAULT_UID || '5724'

  if (!apiKey) {
    throw new Error('SIBT_API_KEY not configured')
  }

  const formData = new FormData()
  formData.append('apikey', apiKey)
  formData.append('request', 'sendclienttext')
  formData.append('uid', options.uid || defaultUid)
  formData.append('clientphone', options.to)
  formData.append('message', options.message)

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    })

    const text = await response.text()

    // SIBT returns "success" or "error: message"
    if (text.toLowerCase().includes('success')) {
      return { success: true, messageId: text }
    } else {
      return { success: false, error: text }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export function formatPhoneE164(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')

  // Add +1 if US number (10 digits)
  if (digits.length === 10) {
    return `+1${digits}`
  }

  // Already has country code
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`
  }

  // Return as-is with + prefix
  return `+${digits}`
}

// TCPA-compliant SMS consent language
export const SMS_CONSENT_LANGUAGE = `By checking this box, I consent to receive automated text messages from LandedSafe regarding my flight tracking and landing notifications. Message and data rates may apply. Reply STOP to opt out at any time.`

export const SMS_STOP_RESPONSE = `You have been unsubscribed from LandedSafe notifications. Reply START to opt back in.`
export const SMS_START_RESPONSE = `You have been re-subscribed to LandedSafe notifications. Reply STOP to opt out.`
export const SMS_HELP_RESPONSE = `LandedSafe flight tracking. Reply STOP to unsubscribe or visit landedsafe.com for help.`
