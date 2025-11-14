import { NextRequest, NextResponse } from 'next/server'
import { searchMatchTweets, analyzeSentiment } from '@/lib/twitter/scraper'
import {
  getFixtureById,
  getTeamForm,
  getHeadToHead,
  getInjuries,
} from '@/lib/football/api'
import { generateMatchInsights, predictWinner } from '@/lib/football/insights'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    const { matchId } = await params
    const fixtureId = parseInt(matchId)

    if (isNaN(fixtureId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid match ID' },
        { status: 400 }
      )
    }

    try {
      // Fetch real fixture data
      const fixture = await getFixtureById(fixtureId)

      if (!fixture) {
        return NextResponse.json(
          { success: false, error: 'Fixture not found' },
          { status: 404 }
        )
      }

      // Fetch additional data in parallel
      const [homeForm, awayForm, h2h, injuries] = await Promise.all([
        getTeamForm(fixture.teams.home.id, 5),
        getTeamForm(fixture.teams.away.id, 5),
        getHeadToHead(fixture.teams.home.id, fixture.teams.away.id, 5),
        getInjuries(fixtureId),
      ])

      // Generate insights
      const insights = await generateMatchInsights(
        fixture,
        homeForm,
        awayForm,
        h2h,
        injuries
      )

      // Predict winner
      const prediction = predictWinner(insights)

      // Automatically scrape Twitter for this match
      let twitterData = null
      try {
        const tweets = await searchMatchTweets(
          {
            homeTeam: fixture.teams.home.name,
            awayTeam: fixture.teams.away.name,
            league: fixture.league.name,
          },
          20
        )
        const sentiment = analyzeSentiment(tweets)
        twitterData = { tweets, sentiment }
      } catch (twitterError) {
        console.error('Twitter scraping failed:', twitterError)
        // Continue without Twitter data
      }

      // Format match data
      const match = {
        id: fixture.fixture.id.toString(),
        homeTeam: fixture.teams.home.name,
        awayTeam: fixture.teams.away.name,
        homeTeamId: fixture.teams.home.id,
        awayTeamId: fixture.teams.away.id,
        homeTeamLogo: fixture.teams.home.logo,
        awayTeamLogo: fixture.teams.away.logo,
        date: fixture.fixture.date.split('T')[0],
        time: new Date(fixture.fixture.date).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        venue: fixture.fixture.venue?.name || 'TBD',
        city: fixture.fixture.venue?.city || '',
        league: fixture.league.name,
        leagueId: fixture.league.id,
        status: fixture.fixture.status.short,
        predictedWinner: prediction.winner,
        confidence: prediction.confidence,
      }

      return NextResponse.json({
        success: true,
        match,
        insights,
        twitterData,
        statistics: {
          homeForm: homeForm.length,
          awayForm: awayForm.length,
          h2hMatches: h2h.length,
          injuries: injuries.length,
        },
      })
    } catch (apiError: any) {
      console.error('API-Football error:', apiError.message)

      // Fallback to sample data
      return NextResponse.json({
        success: true,
        match: getSampleMatch(matchId),
        insights: getSampleInsights(),
        fallback: true,
        error: apiError.message,
      })
    }
  } catch (error: any) {
    console.error('Error in match detail API:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch match',
      },
      { status: 500 }
    )
  }
}

// Fallback sample data
function getSampleMatch(id: string) {
  return {
    id,
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    date: '2024-01-20',
    time: '15:00',
    venue: 'Old Trafford',
    league: 'Premier League',
    predictedWinner: 'away',
    confidence: 68,
  }
}

function getSampleInsights() {
  return [
    {
      type: 'home-record',
      title: 'Strong Home Record',
      description: 'Manchester United has won 8 of their last 10 home matches',
      impact: 'positive',
      team: 'home',
    },
    {
      type: 'injury',
      title: 'Key Player Injured',
      description: 'A key midfielder is out with injury - major impact on team performance',
      impact: 'negative',
      team: 'home',
    },
    {
      type: 'form',
      title: 'Excellent Away Form',
      description: 'Liverpool has won 6 of their last 7 away matches',
      impact: 'positive',
      team: 'away',
    },
  ]
}
