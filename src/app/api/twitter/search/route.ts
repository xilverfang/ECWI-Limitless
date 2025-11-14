import { NextRequest, NextResponse } from 'next/server'
import { searchMatchTweets, analyzeSentiment } from '@/lib/twitter/scraper'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { homeTeam, awayTeam, league, date, maxResults = 100 } = body

    if (!homeTeam || !awayTeam) {
      return NextResponse.json(
        { error: 'homeTeam and awayTeam are required' },
        { status: 400 }
      )
    }

    // Search for tweets
    const tweets = await searchMatchTweets(
      { homeTeam, awayTeam, league, date },
      maxResults
    )

    // Analyze sentiment
    const sentiment = analyzeSentiment(tweets)

    return NextResponse.json({
      success: true,
      tweets,
      sentiment,
      count: tweets.length,
    })
  } catch (error: any) {
    console.error('Error in Twitter search API:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to search Twitter',
      },
      { status: 500 }
    )
  }
}

