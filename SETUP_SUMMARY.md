# Twitter Scraper Setup Summary

## ✅ What's Been Implemented

### 1. Twitter API Integration
- **Client Setup** (`src/lib/twitter/client.ts`)
  - Twitter API v2 client initialization
  - Bearer Token authentication (simplest for read-only operations)
  - Connection testing functionality

### 2. Scraper Functions (`src/lib/twitter/scraper.ts`)
- **`searchMatchTweets()`**: Search for tweets about specific football matches
  - Builds optimized search queries with team names
  - Filters retweets and non-English content
  - Returns structured tweet data with metrics
  
- **`getTweetsFromAccounts()`**: Fetch tweets from specific Twitter accounts
  - Useful for scraping football news accounts
  - Supports multiple accounts in one call
  
- **`analyzeSentiment()`**: Basic sentiment analysis
  - Categorizes tweets as positive, negative, or neutral
  - Uses keyword matching (can be enhanced with ML later)

### 3. API Endpoints
- **`GET /api/twitter/test`**: Test Twitter API connection
- **`POST /api/twitter/search`**: Search for match-related tweets
- **`POST /api/twitter/accounts`**: Fetch tweets from football accounts

### 4. Football Accounts Database (`src/lib/twitter/football-accounts.ts`)
- Curated list of popular football accounts by league
- Functions to get relevant accounts based on league
- Includes Premier League, La Liga, Serie A, Bundesliga, etc.

### 5. Test Interface
- **`/test-twitter` page**: Interactive UI to test all Twitter functionality
- Test connection, search tweets, and fetch from accounts
- Real-time feedback and error handling

## 📋 Next Steps to Get Started

### Step 1: Install Dependencies
```bash
npm install
```

This will install:
- `twitter-api-v2` - Official Twitter API v2 client
- `axios` - HTTP client
- `natural` - Natural language processing
- `date-fns` - Date utilities
- `dotenv` - Environment variable management

### Step 2: Get Twitter API Credentials

1. **Apply for Twitter Developer Account**
   - Visit: https://developer.twitter.com/en/portal/dashboard
   - Complete the application (usually approved quickly)
   - See `TWITTER_SETUP.md` for detailed instructions

2. **Create a Twitter App**
   - Get your Bearer Token (minimum required)
   - Optionally get API Key/Secret for advanced features

### Step 3: Configure Environment Variables

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Add your credentials to `.env.local`:
   ```env
   TWITTER_BEARER_TOKEN=your_bearer_token_here
   ```

   **Minimum required**: Just the Bearer Token for basic scraping

### Step 4: Test the Setup

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Visit the test page:
   ```
   http://localhost:3000/test-twitter
   ```

3. Click "Test Connection" to verify your API credentials work

## 🎯 How It Works

### Search Flow
1. User provides: `homeTeam`, `awayTeam`, `league` (optional)
2. System builds optimized search query:
   - Includes team names (with variations)
   - Adds league context
   - Excludes retweets
   - Filters for English only
   - Adds match-related keywords
3. Fetches tweets from Twitter API
4. Analyzes sentiment
5. Returns structured data

### Account Scraping Flow
1. User provides: List of Twitter usernames
2. System fetches user IDs
3. Retrieves recent tweets from each account
4. Combines and returns all tweets

## 📊 Data Structure

### Tweet Object
```typescript
{
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
```

### Sentiment Analysis Result
```typescript
{
  positive: number
  negative: number
  neutral: number
  total: number
}
```

## 🔒 Security Notes

- ✅ `.env.local` is in `.gitignore` (never commit credentials)
- ✅ API routes are server-side only (credentials never exposed)
- ✅ Bearer Token is sufficient for read-only operations
- ⚠️ Monitor API usage to avoid rate limits

## 🚀 Future Enhancements

1. **Caching Layer**
   - Cache search results to reduce API calls
   - Use Redis or in-memory cache

2. **Advanced Sentiment Analysis**
   - Use ML models (e.g., Transformers.js)
   - Better accuracy than keyword matching

3. **Real-time Updates**
   - WebSocket connections for live match updates
   - Polling for new tweets during matches

4. **Data Integration**
   - Combine with team records APIs
   - Historical performance data
   - Injury reports from official sources

5. **Expert Weighting**
   - Identify expert accounts automatically
   - Weight their predictions higher in EWCI

## 📝 Example Usage

### In Your Components
```typescript
// Search for match tweets
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

const { tweets, sentiment } = await response.json()

// Use tweets and sentiment data in your UI
```

## ⚠️ Rate Limits

Twitter API v2 Free Tier:
- **Search**: 10,000 requests/month
- **User Timeline**: 1,500 requests/15 minutes

**Tip**: Implement caching to maximize efficiency!

## 🐛 Troubleshooting

### "TWITTER_BEARER_TOKEN is not set"
- Make sure `.env.local` exists and contains your Bearer Token
- Restart the dev server after adding environment variables

### "Rate limit exceeded"
- You've hit Twitter's rate limits
- Wait for the limit window to reset
- Consider implementing caching

### "Forbidden" or "Unauthorized"
- Check your Bearer Token is correct
- Verify your Twitter Developer account is approved
- Check app permissions in Developer Portal

---

**Ready to scrape!** Once you've set up your Twitter API credentials, you can start collecting real-time football match data. 🎉

