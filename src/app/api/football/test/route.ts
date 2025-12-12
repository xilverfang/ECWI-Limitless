import { NextResponse } from 'next/server'
import { getUpcomingFixtures, LEAGUE_IDS } from '@/lib/football/api'

export async function GET() {
  try {
    // Test with Premier League
    const leagueId = LEAGUE_IDS['premier-league']
    const fixtures = await getUpcomingFixtures(leagueId, 5)
    
    return NextResponse.json({
      success: true,
      message: 'API-Sports.io connection successful!',
      fixturesCount: fixtures.length,
      sampleFixture: fixtures[0] ? {
        id: fixtures[0].fixture.id,
        homeTeam: fixtures[0].teams.home.name,
        awayTeam: fixtures[0].teams.away.name,
        date: fixtures[0].fixture.date,
        venue: fixtures[0].fixture.venue.name,
      } : null,
      allFixtures: fixtures.map(f => ({
        id: f.fixture.id,
        match: `${f.teams.home.name} vs ${f.teams.away.name}`,
        date: f.fixture.date,
      })),
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to connect to API-Sports.io',
        details: error.response?.data || null,
      },
      { status: 500 }
    )
  }
}
