# Twitter API Setup Guide

This guide will help you set up Twitter API v2 access for the EWCI dashboard.

## Step 1: Apply for Twitter Developer Account

1. Visit [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Sign in with your Twitter account
3. Click "Sign up" or "Apply" for a developer account
4. Fill out the application form:
   - **Use case**: Select "Making a bot" or "Exploring the API"
   - **Description**: Explain you're building a sports prediction analytics dashboard that analyzes public sentiment about football matches
   - **Will you make Twitter content available to a government entity?**: Select "No"
5. Review and accept the Developer Agreement
6. Verify your email address

## Step 2: Create a Twitter App

1. Once approved, go to the [Developer Portal Dashboard](https://developer.twitter.com/en/portal/dashboard)
2. Click "Create Project" or "Create App"
3. Fill in the details:
   - **Project name**: EWCI Dashboard (or your preferred name)
   - **Use case**: Select "Making a bot" or "Exploring the API"
   - **App name**: Choose a unique name (e.g., "ewci-dashboard-app")
4. Click "Create"

## Step 3: Get Your API Credentials

After creating your app, you'll see several keys and tokens:

### Essential Credentials:

1. **Bearer Token** (for read-only operations - recommended for scraping)
   - This is the simplest option for our use case
   - Found under "Keys and tokens" tab
   - Click "Generate" if not already created

2. **API Key and API Secret** (for OAuth operations)
   - Found under "Keys and tokens" tab
   - Keep these secure!

3. **Access Token and Access Token Secret** (for user authentication)
   - Only needed if you want to post tweets or access user-specific data
   - For scraping, Bearer Token is sufficient

## Step 4: Set Up Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your credentials:
   ```env
   TWITTER_BEARER_TOKEN=your_bearer_token_here
   TWITTER_API_KEY=your_api_key_here
   TWITTER_API_SECRET=your_api_secret_here
   ```

   **Minimum required**: `TWITTER_BEARER_TOKEN` (for basic scraping)

3. **Never commit `.env.local` to git!** (It's already in `.gitignore`)

## Step 5: Test Your Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test the connection by visiting:
   ```
   http://localhost:3000/api/twitter/test
   ```

   You should see a success message if everything is configured correctly.

## Step 6: Understanding Rate Limits

Twitter API v2 has rate limits based on your access level:

### Free Tier (Essential):
- **Search Tweets**: 10,000 requests/month
- **User Timeline**: 1,500 requests/15 minutes
- **Rate limit**: Be mindful of these limits

### Tips:
- Cache results when possible
- Use pagination efficiently
- Implement retry logic with exponential backoff
- Monitor your usage in the Developer Portal

## Step 7: Alternative: Using Twitter API v2 with Elevated Access

If you need higher rate limits:

1. Apply for **Elevated Access** in the Developer Portal
2. This gives you:
   - 10,000 tweets/month for search
   - Higher rate limits
   - More features

## Troubleshooting

### Error: "Invalid or expired token"
- Check that your Bearer Token is correctly set in `.env.local`
- Regenerate the token in the Developer Portal if needed
- Make sure there are no extra spaces in the token

### Error: "Rate limit exceeded"
- You've hit Twitter's rate limits
- Wait for the rate limit window to reset
- Consider implementing caching

### Error: "Forbidden" or "Unauthorized"
- Your app might not have the right permissions
- Check your app's settings in the Developer Portal
- Ensure you're using the correct authentication method

## Security Best Practices

1. **Never commit API keys to git**
2. **Use environment variables** for all sensitive data
3. **Rotate keys regularly** if compromised
4. **Use Bearer Token** for read-only operations (simpler and more secure)
5. **Monitor API usage** in the Developer Portal

## Next Steps

Once your Twitter API is set up:

1. Test the search endpoint: `POST /api/twitter/search`
2. Test the accounts endpoint: `POST /api/twitter/accounts`
3. Integrate with the frontend to fetch real match data
4. Add caching to reduce API calls
5. Implement error handling and retry logic

## Useful Resources

- [Twitter API v2 Documentation](https://developer.twitter.com/en/docs/twitter-api)
- [Twitter API v2 Rate Limits](https://developer.twitter.com/en/docs/twitter-api/rate-limits)
- [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
- [twitter-api-v2 Library Docs](https://github.com/PLhery/node-twitter-api-v2)

