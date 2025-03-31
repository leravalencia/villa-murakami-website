import ICAL from 'ical.js'

interface AirbnbAvailability {
  start: Date
  end: Date
  price?: number
  isAvailable: boolean
}

export async function fetchAirbnbAvailability(): Promise<AirbnbAvailability[]> {
  try {
    const response = await fetch('https://www.airbnb.com/calendar/ical/1367509825861386634.ics?s=8f209483a6922d551136c280b9ce7d35&locale=en')
    const icsData = await response.text()
    const jcalData = ICAL.parse(icsData)
    
    const availabilities: AirbnbAvailability[] = []
    
    // Process each event in the calendar
    const events = jcalData.getAllSubcomponents('VEVENT')
    console.log('Found events:', events.length)
    
    events.forEach((event: any) => {
      try {
        const startStr = event.getFirstPropertyValue('DTSTART')
        const endStr = event.getFirstPropertyValue('DTEND')
        const summary = event.getFirstPropertyValue('SUMMARY')
        
        // Convert date strings to Date objects
        const start = new Date(startStr)
        const end = new Date(endStr)
        
        // Check if this is a pricing event (contains price information)
        const priceMatch = summary?.match(/\$(\d+)/)
        const price = priceMatch ? parseInt(priceMatch[1]) : undefined
        
        // Determine availability based on summary
        const isAvailable = !summary?.toLowerCase().includes('blocked')
        
        availabilities.push({
          start,
          end,
          price,
          isAvailable
        })
        
        console.log('Processed event:', {
          start: start.toISOString(),
          end: end.toISOString(),
          price,
          isAvailable,
          summary
        })
      } catch (error) {
        console.error('Error processing event:', error)
      }
    })
    
    // Sort availabilities by start date
    availabilities.sort((a, b) => a.start.getTime() - b.start.getTime())
    
    console.log('Final availabilities:', availabilities)
    return availabilities
  } catch (error) {
    console.error('Error fetching Airbnb availability:', error)
    return []
  }
}

export const AIRBNB_LISTING_URL = 'https://www.airbnb.com/rooms/1367509825861386634' 