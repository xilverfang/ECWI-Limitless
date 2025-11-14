# Twitter Scraper Module

This module provides functionality to scrape and analyze Twitter data for football match insights.

## Files

- **`client.ts`**: Twitter API client initialization and connection testing
- **`scraper.ts`**: Core scraping functions for searching tweets and fetching from accounts
- **`football-accounts.ts`**: Curated list of football accounts to scrape

## API Endpoints

### `GET /api/twitter/test`
Test Twitter API connection
- Returns: Connection status and user info

### `POST /api/twitter/search`
Search for tweets about a specific match
- Body: `{ homeTeam, awayTeam, league?, date?, maxResults? }`
- Returns: Array of tweets with sentiment analysis

### `POST /api/twitter/accounts`
Fetch tweets from specific Twitter accounts
- Body: `{ usernames: string[], maxResults? }`
- Returns: Array of tweets from specified accounts

## Usage Examples

### Search for Match Tweets

```typescript
const response = await fetch('/api/twitter/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    league: 'Premier League',
    maxResults: 100
  })
})

const data = await response.json()
// data.tweets - array of tweet objects
// data.sentiment - sentiment analysis results
```

### Fetch from Football Accounts

```typescript
import { getAccountsForLeague } from '@/lib/twitter/football-accounts'

const accounts = getAccountsForLeague('Premier League')
const response = await fetch('/api/twitter/accounts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    usernames: accounts,
    maxResults: 50
  })
})
```

## Rate Limits

Twitter API v2 Free Tier:
- Search: 10,000 requests/month
- User Timeline: 1,500 requests/15 minutes

**Important**: Implement caching to avoid hitting rate limits!

## Next Steps

1. Add caching layer (Redis or in-memory cache)
2. Implement retry logic with exponential backoff
3. Add more sophisticated sentiment analysis
4. Extract key insights and predictions from tweets
5. Integrate with match data APIs for team records

