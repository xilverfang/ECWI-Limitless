import { TwitterApi } from 'twitter-api-v2'

// Initialize Twitter API client
export function getTwitterClient() {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN
  const apiKey = process.env.TWITTER_API_KEY
  const apiSecret = process.env.TWITTER_API_SECRET
  const accessToken = process.env.TWITTER_ACCESS_TOKEN
  const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET

  if (!bearerToken) {
    throw new Error('TWITTER_BEARER_TOKEN is not set in environment variables')
  }

  // Use Bearer Token for read-only operations (simpler and sufficient for scraping)
  const client = new TwitterApi(bearerToken)

  // For write operations, you'd use:
  // const client = new TwitterApi({
  //   appKey: apiKey!,
  //   appSecret: apiSecret!,
  //   accessToken: accessToken!,
  //   accessSecret: accessTokenSecret!,
  // })

  return client.readOnly
}

// Test Twitter API connection
export async function testTwitterConnection() {
  try {
    const client = getTwitterClient()
    // Test with a simple search query (Bearer Token can do this)
    const testQuery = 'football -is:retweet lang:en'
    const result = await client.v2.search(testQuery, {
      max_results: 1,
    })
    
    return { 
      success: true, 
      message: 'Twitter API connection successful',
      testResults: result.meta 
    }
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to connect to Twitter API',
      details: error.data || null
    }
  }
}

