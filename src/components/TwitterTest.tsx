'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Loader2, Search, Users } from 'lucide-react'

export function TestConnection() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testConnection = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const response = await fetch('/api/twitter/test')
      const data = await response.json()
      setResult(data)
    } catch (error: any) {
      setResult({ success: false, error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Test Twitter Connection</h2>
      <button
        onClick={testConnection}
        disabled={loading}
        className="bg-[#1ebc8d] hover:bg-[#17a078] text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Testing...</span>
          </>
        ) : (
          <span>Test Connection</span>
        )}
      </button>
      
      {result && (
        <div className={`mt-4 p-4 rounded-lg ${
          result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {result.success ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className={`font-semibold ${
              result.success ? 'text-green-900' : 'text-red-900'
            }`}>
              {result.success ? 'Connection Successful!' : 'Connection Failed'}
            </span>
          </div>
          <pre className="text-sm text-gray-700 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export function SearchTweets() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [homeTeam, setHomeTeam] = useState('Manchester United')
  const [awayTeam, setAwayTeam] = useState('Liverpool')
  const [league, setLeague] = useState('Premier League')

  const searchTweets = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const response = await fetch('/api/twitter/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ homeTeam, awayTeam, league, maxResults: 50 }),
      })
      const data = await response.json()
      setResult(data)
    } catch (error: any) {
      setResult({ success: false, error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
        <Search className="w-5 h-5" />
        <span>Search Match Tweets</span>
      </h2>
      
      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Home Team
          </label>
          <input
            type="text"
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ebc8d] focus:border-transparent"
            placeholder="e.g., Manchester United"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Away Team
          </label>
          <input
            type="text"
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ebc8d] focus:border-transparent"
            placeholder="e.g., Liverpool"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            League (Optional)
          </label>
          <input
            type="text"
            value={league}
            onChange={(e) => setLeague(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ebc8d] focus:border-transparent"
            placeholder="e.g., Premier League"
          />
        </div>
      </div>
      
      <button
        onClick={searchTweets}
        disabled={loading || !homeTeam || !awayTeam}
        className="bg-[#1ebc8d] hover:bg-[#17a078] text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Searching...</span>
          </>
        ) : (
          <>
            <Search className="w-4 h-4" />
            <span>Search Tweets</span>
          </>
        )}
      </button>
      
      {result && (
        <div className={`mt-4 p-4 rounded-lg ${
          result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`font-semibold ${
              result.success ? 'text-green-900' : 'text-red-900'
            }`}>
              {result.success ? `Found ${result.count} tweets` : 'Search Failed'}
            </span>
            {result.sentiment && (
              <div className="text-sm text-gray-600">
                Sentiment: {result.sentiment.positive} positive, {result.sentiment.negative} negative, {result.sentiment.neutral} neutral
              </div>
            )}
          </div>
          
          {result.tweets && result.tweets.length > 0 && (
            <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
              {result.tweets.slice(0, 5).map((tweet: any) => (
                <div key={tweet.id} className="bg-white p-3 rounded border border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">@{tweet.author}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(tweet.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900">{tweet.text}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>❤️ {tweet.likeCount}</span>
                    <span>🔄 {tweet.retweetCount}</span>
                    <span>💬 {tweet.replyCount}</span>
                  </div>
                </div>
              ))}
              {result.tweets.length > 5 && (
                <p className="text-sm text-gray-500 text-center">
                  ... and {result.tweets.length - 5} more tweets
                </p>
              )}
            </div>
          )}
          
          {result.error && (
            <p className="text-sm text-red-700 mt-2">{result.error}</p>
          )}
        </div>
      )}
    </div>
  )
}

export function TestAccounts() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [usernames, setUsernames] = useState('premierleague,OptaJoe,SkySportsPL')

  const fetchFromAccounts = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const usernameArray = usernames.split(',').map(u => u.trim()).filter(Boolean)
      const response = await fetch('/api/twitter/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernames: usernameArray, maxResults: 20 }),
      })
      const data = await response.json()
      setResult(data)
    } catch (error: any) {
      setResult({ success: false, error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
        <Users className="w-5 h-5" />
        <span>Fetch from Football Accounts</span>
      </h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Twitter Usernames (comma-separated)
        </label>
        <input
          type="text"
          value={usernames}
          onChange={(e) => setUsernames(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ebc8d] focus:border-transparent"
          placeholder="e.g., premierleague,OptaJoe,SkySportsPL"
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter Twitter usernames without @ symbol, separated by commas
        </p>
      </div>
      
      <button
        onClick={fetchFromAccounts}
        disabled={loading || !usernames}
        className="bg-[#1ebc8d] hover:bg-[#17a078] text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Fetching...</span>
          </>
        ) : (
          <>
            <Users className="w-4 h-4" />
            <span>Fetch Tweets</span>
          </>
        )}
      </button>
      
      {result && (
        <div className={`mt-4 p-4 rounded-lg ${
          result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`font-semibold ${
              result.success ? 'text-green-900' : 'text-red-900'
            }`}>
              {result.success ? `Fetched ${result.count} tweets` : 'Fetch Failed'}
            </span>
          </div>
          
          {result.tweets && result.tweets.length > 0 && (
            <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
              {result.tweets.slice(0, 5).map((tweet: any) => (
                <div key={tweet.id} className="bg-white p-3 rounded border border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">@{tweet.author}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(tweet.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900">{tweet.text}</p>
                </div>
              ))}
              {result.tweets.length > 5 && (
                <p className="text-sm text-gray-500 text-center">
                  ... and {result.tweets.length - 5} more tweets
                </p>
              )}
            </div>
          )}
          
          {result.error && (
            <p className="text-sm text-red-700 mt-2">{result.error}</p>
          )}
        </div>
      )}
    </div>
  )
}

