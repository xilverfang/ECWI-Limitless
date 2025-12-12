'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, TrendingUp, AlertCircle } from 'lucide-react'
import Header from './Header'
import MatchCard from './MatchCard'

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  time: string
  venue: string
  predictedWinner?: 'home' | 'away' | 'draw'
  confidence?: number
  keyFactors?: string[]
}

interface LeagueMatchesProps {
  leagueId: string
}

const LEAGUE_NAMES: Record<string, string> = {
  'premier-league': 'Premier League',
  'la-liga': 'La Liga',
  'bundesliga': 'Bundesliga',
  'serie-a': 'Serie A',
  'ucl': 'UEFA Champions League',
}

export default function LeagueMatches({ leagueId }: LeagueMatchesProps) {
  const router = useRouter()
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMatches()
  }, [leagueId])

  const fetchMatches = async () => {
    setLoading(true)
    try {
      // Fetch matches from API
      const response = await fetch(`/api/matches?league=${leagueId}`)
      const data = await response.json()
      
      console.log('API Response:', data) // Debug log
      
      if (data.success && data.matches && data.matches.length > 0) {
        setMatches(data.matches)
      } else if (data.matches && data.matches.length > 0) {
        // Handle case where API returns matches but success might be false
        setMatches(data.matches)
      } else {
        // No matches from API
        console.log('No matches from API')
        setMatches([])
      }
    } catch (error) {
      console.error('Error fetching matches:', error)
      setMatches([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#1ebc8d] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Leagues</span>
        </button>

        {/* League Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {LEAGUE_NAMES[leagueId] || leagueId}
          </h1>
          <p className="text-gray-600">
            Upcoming matches with expert predictions and insights
          </p>
        </div>

        {/* Matches Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ebc8d]"></div>
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No upcoming matches found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                leagueId={leagueId}
                onClick={() => router.push(`/matches/${match.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

