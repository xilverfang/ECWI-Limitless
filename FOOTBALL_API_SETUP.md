# API-Football Setup Guide

This guide will help you set up API-Football from RapidAPI to get live football data.

## Step 1: Sign Up for RapidAPI

1. Visit [RapidAPI](https://rapidapi.com/)
2. Sign up for a free account (or log in if you already have one)
3. Verify your email address

## Step 2: Subscribe to API-Football

1. Go to [API-Football on RapidAPI](https://rapidapi.com/api-sports/api/api-football)
2. Click "Subscribe to Test" or choose a plan:
   - **Basic Plan (Free)**: 100 requests/day
   - **Pro Plan**: 500 requests/day ($9.99/month)
   - **Ultra Plan**: 10,000 requests/day ($49.99/month)
3. For testing, the Basic (Free) plan is sufficient

## Step 3: Get Your API Key

1. After subscribing, go to your [RapidAPI Dashboard](https://rapidapi.com/developer/billing)
2. Navigate to "Security" or "My Apps"
3. Copy your **X-RapidAPI-Key** (it looks like: `abc123def456...`)

## Step 4: Add API Key to Environment Variables

1. Open your `.env.local` file (or create it if it doesn't exist)
2. Add your RapidAPI key:

```env
RAPIDAPI_KEY=your_rapidapi_key_here
```

3. **Never commit this file to git!** (It's already in `.gitignore`)

## Step 5: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Visit a league page: `http://localhost:3000/leagues/premier-league`
3. You should see real upcoming fixtures from API-Football

## API Endpoints Used

The integration uses these API-Football endpoints:

- **`/fixtures`** - Get upcoming fixtures for a league
- **`/fixtures/{id}`** - Get specific fixture details
- **`/fixtures/statistics`** - Get team statistics for a fixture
- **`/fixtures/headtohead`** - Get head-to-head records
- **`/injuries`** - Get injury reports for a fixture
- **`/standings`** - Get league standings

## Rate Limits

### Free Tier (Basic Plan)
- **100 requests/day**
- **10 requests/minute**

### Tips to Stay Within Limits
- The app caches data when possible
- Only fetches data when viewing match details
- Uses fallback sample data if API fails

## Supported Leagues

The following leagues are configured:

- **Premier League** (ID: 39)
- **La Liga** (ID: 140)
- **Bundesliga** (ID: 78)
- **Serie A** (ID: 135)
- **UEFA Champions League** (ID: 2)

## Troubleshooting

### Error: "RAPIDAPI_KEY is not set"
- Make sure `.env.local` exists and contains `RAPIDAPI_KEY`
- Restart the dev server after adding the key
- Check for typos in the key

### Error: "Rate limit exceeded"
- You've hit the daily request limit
- Wait 24 hours or upgrade your plan
- The app will use fallback sample data

### Error: "Invalid API key"
- Verify your key is correct in RapidAPI dashboard
- Make sure you've subscribed to API-Football
- Check that the key hasn't expired

### No matches showing
- Check browser console for errors
- Verify your API key is working
- The app will show sample data as fallback

## Fallback Behavior

If the API fails or rate limits are hit, the app automatically:
- Shows sample data so the UI still works
- Logs errors to the console
- Continues functioning without breaking

## Next Steps

Once API-Football is set up:
1. Real fixtures will load automatically
2. Match details include real statistics
3. Insights are generated from actual data
4. Head-to-head records are accurate
5. Injury reports are up-to-date

## Alternative APIs

If you prefer a different API:

### Football-Data.org (Free Tier)
- Simpler API
- Limited features
- No RapidAPI account needed
- [Documentation](https://www.football-data.org/documentation/quickstart)

### SportMonks
- Very comprehensive
- Paid plans only
- [Documentation](https://www.sportmonks.com/football-api/documentation)

---

**Ready to go!** Once your API key is set up, you'll have access to live football data. 🎉

