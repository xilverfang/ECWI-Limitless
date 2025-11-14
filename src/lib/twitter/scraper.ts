import { getTwitterClient } from './client'

export interface TweetData {
  id: string
  text: string
  author: string
  authorId: string
  createdAt: string
  likeCount: number
  retweetCount: number
  replyCount: number
  sentiment?: 'positive' | 'negative' | 'neutral'
}

export interface MatchQuery {
  homeTeam: string
  awayTeam: string
  league?: string
  date?: string
}

/**
 * Search for tweets related to a football match
 */
export async function searchMatchTweets(
  query: MatchQuery,
  maxResults: number = 100
): Promise<TweetData[]> {
  try {
    const client = getTwitterClient()
    
    // Build search query
    const searchQuery = buildSearchQuery(query)
    
    console.log(`Searching Twitter for: ${searchQuery}`)
    
    // Search recent tweets
    const response = await client.v2.search(searchQuery, {
      max_results: Math.min(maxResults, 100), // Twitter API v2 free tier limit is 100
      'tweet.fields': ['created_at', 'public_metrics', 'author_id'],
      'user.fields': ['username'],
      expansions: ['author_id'],
    })

    if (!response.data || !response.data.data) {
      return []
    }

    // Map users by ID for easy lookup
    const usersMap = new Map()
    if (response.includes?.users) {
      response.includes.users.forEach((user: any) => {
        usersMap.set(user.id, user.username)
      })
    }

    // Transform tweets to our format
    const tweets: TweetData[] = response.data.data.map((tweet: any) => ({
      id: tweet.id,
      text: tweet.text,
      author: usersMap.get(tweet.author_id) || 'unknown',
      authorId: tweet.author_id,
      createdAt: tweet.created_at,
      likeCount: tweet.public_metrics?.like_count || 0,
      retweetCount: tweet.public_metrics?.retweet_count || 0,
      replyCount: tweet.public_metrics?.reply_count || 0,
    }))

    return tweets
  } catch (error: any) {
    console.error('Error searching Twitter:', error)
    throw new Error(`Twitter search failed: ${error.message}`)
  }
}

/**
 * Build optimized search query for football matches
 */
function buildSearchQuery(query: MatchQuery): string {
  const { homeTeam, awayTeam, league } = query
  
  // Build base query with team names
  let searchQuery = `(${homeTeam} OR "${homeTeam}") AND (${awayTeam} OR "${awayTeam}")`
  
  // Add league context if provided
  if (league) {
    searchQuery += ` (${league} OR #${league.replace(/\s+/g, '')})`
  }
  
  // Exclude retweets and filter for English
  searchQuery += ' -is:retweet lang:en'
  
  // Add common football match keywords
  searchQuery += ' (match OR game OR fixture OR vs OR v OR prediction OR preview)'
  
  return searchQuery
}

/**
 * Get tweets from specific football accounts/pages
 */
export async function getTweetsFromAccounts(
  usernames: string[],
  maxResults: number = 50
): Promise<TweetData[]> {
  try {
    const client = getTwitterClient()
    const allTweets: TweetData[] = []

    for (const username of usernames) {
      try {
        // Get user ID from username
        const user = await client.v2.userByUsername(username, {
          'user.fields': ['id', 'username'],
        })

        if (!user.data) {
          console.warn(`User ${username} not found`)
          continue
        }

        // Get user's recent tweets
        const tweets = await client.v2.userTimeline(user.data.id, {
          max_results: Math.min(maxResults, 100),
          'tweet.fields': ['created_at', 'public_metrics'],
        })

        if (tweets.data?.data) {
          const formattedTweets: TweetData[] = tweets.data.data.map((tweet: any) => ({
            id: tweet.id,
            text: tweet.text,
            author: username,
            authorId: user.data.id,
            createdAt: tweet.created_at,
            likeCount: tweet.public_metrics?.like_count || 0,
            retweetCount: tweet.public_metrics?.retweet_count || 0,
            replyCount: tweet.public_metrics?.reply_count || 0,
          }))

          allTweets.push(...formattedTweets)
        }
      } catch (error: any) {
        console.error(`Error fetching tweets from ${username}:`, error.message)
        // Continue with next username
      }
    }

    return allTweets
  } catch (error: any) {
    console.error('Error getting tweets from accounts:', error)
    throw new Error(`Failed to fetch tweets: ${error.message}`)
  }
}

/**
 * Analyze sentiment of tweets (basic implementation)
 */
export function analyzeSentiment(tweets: TweetData[]): {
  positive: number
  negative: number
  neutral: number
  total: number
} {
  const positiveKeywords = ['win', 'winning', 'victory', 'great', 'excellent', 'amazing', 'best', 'strong', 'dominate', 'favorite']
  const negativeKeywords = ['lose', 'losing', 'defeat', 'weak', 'poor', 'bad', 'terrible', 'worst', 'struggle', 'injury']

  let positive = 0
  let negative = 0
  let neutral = 0

  tweets.forEach(tweet => {
    const text = tweet.text.toLowerCase()
    const positiveCount = positiveKeywords.filter(keyword => text.includes(keyword)).length
    const negativeCount = negativeKeywords.filter(keyword => text.includes(keyword)).length

    if (positiveCount > negativeCount) {
      tweet.sentiment = 'positive'
      positive++
    } else if (negativeCount > positiveCount) {
      tweet.sentiment = 'negative'
      negative++
    } else {
      tweet.sentiment = 'neutral'
      neutral++
    }
  })

  return { positive, negative, neutral, total: tweets.length }
}

