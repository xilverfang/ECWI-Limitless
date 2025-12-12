import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const league = searchParams.get('league')

    if (!league) {
      return NextResponse.json(
        { success: false, error: 'Invalid league' },
        { status: 400 }
      )
    }

    // Only return data for Premier League (we have real data for it)
    if (league === 'premier-league') {
      return NextResponse.json({
        success: true,
        matches: getPremierLeagueMatches(),
        league,
        count: PREMIER_LEAGUE_FIXTURES.length,
      })
    }

    // For other leagues, return empty array
    return NextResponse.json({
      success: true,
      matches: [],
      league,
    })
  } catch (error: any) {
    console.error('Error in matches API:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch matches',
      },
      { status: 500 }
    )
  }
}

// Real Premier League fixtures data from provided JSON
const PREMIER_LEAGUE_FIXTURES = [
  {
    date: "Saturday, December 13, 2025",
    home: "Chelsea",
    away: "Everton",
    stadium: "Stamford Bridge",
    stadium_capacity: 40044,
    location: "London (Fulham)",
    referee: "To be confirmed"
  },
  {
    date: "Saturday, December 13, 2025",
    home: "Liverpool",
    away: "Brighton & Hove Albion",
    stadium: "Anfield",
    stadium_capacity: 61276,
    location: "Liverpool (Anfield)",
    referee: "To be confirmed"
  },
  {
    date: "Saturday, December 13, 2025",
    home: "Burnley",
    away: "Fulham",
    stadium: "Turf Moor",
    stadium_capacity: 21990,
    location: "Burnley",
    referee: "To be confirmed"
  },
  {
    date: "Saturday, December 13, 2025",
    home: "Arsenal",
    away: "Wolverhampton Wanderers",
    stadium: "Emirates Stadium",
    stadium_capacity: 60704,
    location: "London (Holloway)",
    referee: "To be confirmed"
  },
  {
    date: "Sunday, December 14, 2025",
    home: "Crystal Palace",
    away: "Manchester City",
    stadium: "Selhurst Park",
    stadium_capacity: 25194,
    location: "London (Selhurst)",
    referee: "To be confirmed"
  },
  {
    date: "Sunday, December 14, 2025",
    home: "Nottingham Forest",
    away: "Tottenham Hotspur",
    stadium: "City Ground",
    stadium_capacity: 30404,
    location: "West Bridgford",
    referee: "To be confirmed"
  },
  {
    date: "Sunday, December 14, 2025",
    home: "Sunderland",
    away: "Newcastle United",
    stadium: "Stadium of Light",
    stadium_capacity: 48095,
    location: "Sunderland",
    referee: "To be confirmed"
  },
  {
    date: "Sunday, December 14, 2025",
    home: "West Ham United",
    away: "Aston Villa",
    stadium: "London Stadium",
    stadium_capacity: 62500,
    location: "London (Stratford)",
    referee: "To be confirmed"
  },
  {
    date: "Sunday, December 14, 2025",
    home: "Brentford",
    away: "Leeds United",
    stadium: "Brentford Community Stadium",
    stadium_capacity: 17250,
    location: "London (Brentford)",
    referee: "To be confirmed"
  },
  {
    date: "Monday, December 15, 2025",
    home: "Manchester United",
    away: "AFC Bournemouth",
    stadium: "Old Trafford",
    stadium_capacity: 74244,
    location: "Manchester (Trafford)",
    referee: "To be confirmed"
  }
]

// Transform Premier League fixtures to match format
function getPremierLeagueMatches(): any[] {
  return PREMIER_LEAGUE_FIXTURES.map((fixture, index) => {
    // Parse the date string (format: "Saturday, December 13, 2025")
    let dateObj: Date
    try {
      dateObj = new Date(fixture.date)
      // If date parsing fails, parse manually
      if (isNaN(dateObj.getTime())) {
        const dateMatch = fixture.date.match(/(\w+), (\w+) (\d+), (\d+)/)
        if (dateMatch) {
          const [, , month, day, year] = dateMatch
          const monthMap: Record<string, string> = {
            'January': '01', 'February': '02', 'March': '03', 'April': '04',
            'May': '05', 'June': '06', 'July': '07', 'August': '08',
            'September': '09', 'October': '10', 'November': '11', 'December': '12'
          }
          const monthNum = monthMap[month] || '12'
          dateObj = new Date(`${year}-${monthNum}-${day.padStart(2, '0')}`)
        } else {
          dateObj = new Date('2025-12-13') // Default fallback
        }
      }
    } catch {
      dateObj = new Date('2025-12-13') // Default fallback
    }
    
    const dateStr = dateObj.toISOString().split('T')[0]
    // Default times based on day of week
    const dayOfWeek = dateObj.getDay()
    let defaultTime = '15:00' // Saturday default
    if (dayOfWeek === 0) defaultTime = '14:00' // Sunday
    if (dayOfWeek === 1) defaultTime = '20:00' // Monday
    
    return {
      id: `pl-${index + 1}`,
      homeTeam: fixture.home,
      awayTeam: fixture.away,
      date: dateStr,
      time: defaultTime,
      venue: fixture.stadium,
      city: fixture.location,
      capacity: fixture.stadium_capacity,
      referee: fixture.referee,
      league: 'Premier League',
      dateDisplay: fixture.date, // Keep original date string for display
    }
  })
}

