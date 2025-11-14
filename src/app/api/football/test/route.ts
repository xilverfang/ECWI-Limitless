import { NextResponse } from 'next/server'
import { getUpcomingFixtures, LEAGUE_IDS } from '@/lib/football/api'

export async function GET() {
  try {
    // Test with Premier League (small request)
    const leagueId = LEAGUE_IDS['premier-league']
    const fixtures = await getUpcomingFixtures(leagueId, 2)
    
    return NextResponse.json({
      success: true,
      message: 'API-Football connection successful!',
      fixturesCount: fixtures.length,
      sampleFixture: fixtures[0] || null,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to connect to API-Football',
        details: error.response?.data || null,
      },
      { status: 500 }
    )
  }
}

