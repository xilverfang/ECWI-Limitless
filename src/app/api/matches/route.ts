import { NextRequest, NextResponse } from 'next/server'
import { getUpcomingFixtures, LEAGUE_IDS } from '@/lib/football/api'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const league = searchParams.get('league')

    if (!league || !LEAGUE_IDS[league]) {
      return NextResponse.json(
        { success: false, error: 'Invalid league' },
        { status: 400 }
      )
    }

    const leagueId = LEAGUE_IDS[league]

    try {
      // Fetch real fixtures from API-Football
      const fixtures = await getUpcomingFixtures(leagueId, 10)

      // Transform to our format
      const matches = fixtures.map((fixture) => ({
        id: fixture.fixture.id.toString(),
        homeTeam: fixture.teams.home.name,
        awayTeam: fixture.teams.away.name,
        date: fixture.fixture.date.split('T')[0],
        time: new Date(fixture.fixture.date).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        venue: fixture.fixture.venue?.name || 'TBD',
        league: fixture.league.name,
        leagueId: fixture.league.id,
        homeTeamId: fixture.teams.home.id,
        awayTeamId: fixture.teams.away.id,
        homeTeamLogo: fixture.teams.home.logo,
        awayTeamLogo: fixture.teams.away.logo,
        status: fixture.fixture.status.short,
      }))

      return NextResponse.json({
        success: true,
        matches,
        league,
      })
    } catch (apiError: any) {
      console.error('API-Football error:', apiError.message)
      
      // Fallback to sample data if API fails
      return NextResponse.json({
        success: true,
        matches: getSampleMatches(league),
        league,
        fallback: true,
        error: apiError.message,
      })
    }
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

// Fallback sample data
function getSampleMatches(league: string): any[] {
  const samples: Record<string, any[]> = {
    'premier-league': [
      {
        id: '1',
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        date: '2024-01-20',
        time: '15:00',
        venue: 'Old Trafford',
        league: 'Premier League',
      },
    ],
    'la-liga': [
      {
        id: '4',
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        date: '2024-01-20',
        time: '20:00',
        venue: 'Santiago Bernabéu',
        league: 'La Liga',
      },
    ],
    'bundesliga': [
      {
        id: '5',
        homeTeam: 'Bayern Munich',
        awayTeam: 'Borussia Dortmund',
        date: '2024-01-20',
        time: '18:30',
        venue: 'Allianz Arena',
        league: 'Bundesliga',
      },
    ],
    'serie-a': [
      {
        id: '6',
        homeTeam: 'AC Milan',
        awayTeam: 'Inter Milan',
        date: '2024-01-21',
        time: '20:45',
        venue: 'San Siro',
        league: 'Serie A',
      },
    ],
    'ucl': [
      {
        id: '7',
        homeTeam: 'Real Madrid',
        awayTeam: 'Manchester City',
        date: '2024-01-23',
        time: '21:00',
        venue: 'Santiago Bernabéu',
        league: 'UEFA Champions League',
      },
    ],
  }
  return samples[league] || []
}
