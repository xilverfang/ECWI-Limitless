# Testing Guide

## Quick Test Checklist

### 1. Start the Development Server
```bash
npm run dev
```
The server should start on `http://localhost:3000`

### 2. Test League Selection Page
- **URL**: `http://localhost:3000`
- **Expected**: 
  - See 5 league cards (Premier League, La Liga, Bundesliga, Serie A, UCL)
  - Each card should be clickable
  - Hover effects should work
  - Header should be visible

### 3. Test League Matches Page
- **URL**: `http://localhost:3000/leagues/premier-league`
- **Expected**:
  - See list of upcoming matches
  - Each match card shows:
    - Team names
    - Date and time
    - Venue
    - Prediction with confidence percentage
  - "Back to Leagues" button works
  - Match cards are clickable

### 4. Test Match Detail Page
- **URL**: `http://localhost:3000/matches/1`
- **Expected**:
  - Match header with teams, date, venue
  - Prediction section with confidence
  - "Why This Prediction?" section with insights:
    - Home record
    - Injuries
    - Form
    - Head-to-head
  - "What People Are Saying" section:
    - Should attempt to load Twitter comments
    - Shows loading state
    - Displays tweets if Twitter API is working
  - "Back" button works

### 5. Test Twitter Integration
- **Check**: Twitter API credentials in `.env.local`
- **Expected**: 
  - On match detail page, Twitter comments should load automatically
  - If credentials are invalid, you'll see an error in the console but the page still works

### 6. Test All Leagues
Try navigating to:
- `/leagues/premier-league`
- `/leagues/la-liga`
- `/leagues/bundesliga`
- `/leagues/serie-a`
- `/leagues/ucl`

Each should show different sample matches.

## Common Issues & Solutions

### Issue: Page not loading
- **Solution**: Check if dev server is running (`npm run dev`)
- Check browser console for errors

### Issue: Twitter comments not loading
- **Solution**: 
  - Verify `.env.local` has `TWITTER_BEARER_TOKEN`
  - Check browser console for API errors
  - Test Twitter API at `/test-twitter` page

### Issue: Matches not showing
- **Solution**: 
  - Check browser console for API errors
  - Verify API route is working: `http://localhost:3000/api/matches?league=premier-league`

### Issue: Navigation not working
- **Solution**: 
  - Check if Next.js router is working
  - Verify all route files exist
  - Check browser console for errors

## Testing Twitter API

1. Visit: `http://localhost:3000/test-twitter`
2. Click "Test Connection"
3. If successful, try "Search Match Tweets" with:
   - Home Team: Manchester United
   - Away Team: Liverpool
   - League: Premier League

## Next Steps After Testing

Once testing is complete, we'll integrate a real football API to:
- Fetch real upcoming fixtures
- Get team statistics
- Get injury reports
- Get head-to-head records
- Get recent form data

## Test Data

Currently using sample data. Real API integration will replace:
- `/api/matches` - Will fetch from football API
- `/api/matches/[matchId]` - Will fetch real match data and generate insights

