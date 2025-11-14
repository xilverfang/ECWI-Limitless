import { NextRequest, NextResponse } from 'next/server'
import { getTweetsFromAccounts } from '@/lib/twitter/scraper'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { usernames, maxResults = 50 } = body

    if (!usernames || !Array.isArray(usernames) || usernames.length === 0) {
      return NextResponse.json(
        { error: 'usernames array is required' },
        { status: 400 }
      )
    }

    // Get tweets from specified accounts
    const tweets = await getTweetsFromAccounts(usernames, maxResults)

    return NextResponse.json({
      success: true,
      tweets,
      count: tweets.length,
    })
  } catch (error: any) {
    console.error('Error in Twitter accounts API:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch tweets from accounts',
      },
      { status: 500 }
    )
  }
}

