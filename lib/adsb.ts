// ADS-B Exchange API client via RapidAPI

export interface AircraftData {
  hex: string
  r?: string // registration (tail number)
  t?: string // aircraft type
  alt_baro?: number // altitude (feet)
  gs?: number // ground speed (knots)
  baro_rate?: number // vertical speed (ft/min)
  lat?: number
  lon?: number
  seen?: number // seconds since last position update
  flight?: string // callsign
}

export interface AdsbResponse {
  ac?: AircraftData[]
  total?: number
  now?: number
  msg?: string
}

export async function getAircraftByHex(hex: string): Promise<AdsbResponse> {
  const apiKey = process.env.RAPIDAPI_KEY
  const apiHost = process.env.RAPIDAPI_HOST || 'adsbexchange-com1.p.rapidapi.com'

  if (!apiKey) {
    throw new Error('RAPIDAPI_KEY not configured')
  }

  const response = await fetch(`https://${apiHost}/v2/hex/${hex}/`, {
    headers: {
      'x-rapidapi-host': apiHost,
      'x-rapidapi-key': apiKey,
    },
  })

  if (!response.ok) {
    throw new Error(`ADS-B API error: ${response.statusText}`)
  }

  return response.json()
}

export function isAirborne(aircraft: AircraftData | undefined, threshold: number = 50): boolean {
  if (!aircraft) return false
  return (aircraft.gs ?? 0) > threshold
}

export function isLanded(aircraft: AircraftData | undefined, threshold: number = 50): boolean {
  if (!aircraft) return false
  return (aircraft.gs ?? 0) <= threshold
}

export function isEmergencyDescent(aircraft: AircraftData | undefined, threshold: number = 2000): boolean {
  if (!aircraft || !aircraft.baro_rate) return false
  return aircraft.baro_rate < -threshold
}
