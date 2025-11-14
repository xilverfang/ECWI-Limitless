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
      setMatches(data.matches || [])
    } catch (error) {
      console.error('Error fetching matches:', error)
      // Fallback to sample data
      setMatches(getSampleMatches(leagueId))
    } finally {
      setLoading(false)
    }
  }

  const getSampleMatches = (league: string): Match[] => {
    // Sample data - will be replaced with real API data
    const samples: Record<string, Match[]> = {
      'premier-league': [
        {
          id: '1',
          homeTeam: 'Manchester United',
          awayTeam: 'Liverpool',
          date: '2024-01-20',
          time: '15:00',
          venue: 'Old Trafford',
          predictedWinner: 'away',
          confidence: 68,
          keyFactors: ['Strong away form', 'Key player returning'],
        },
        {
          id: '2',
          homeTeam: 'Arsenal',
          awayTeam: 'Chelsea',
          date: '2024-01-21',
          time: '17:30',
          venue: 'Emirates Stadium',
          predictedWinner: 'home',
          confidence: 72,
          keyFactors: ['Home advantage', 'Recent form'],
        },
        {
          id: '3',
          homeTeam: 'Manchester City',
          awayTeam: 'Tottenham',
          date: '2024-01-22',
          time: '16:00',
          venue: 'Etihad Stadium',
          predictedWinner: 'home',
          confidence: 75,
          keyFactors: ['Dominant home record'],
        },
      ],
      'la-liga': [
        {
          id: '4',
          homeTeam: 'Real Madrid',
          awayTeam: 'Barcelona',
          date: '2024-01-20',
          time: '20:00',
          venue: 'Santiago Bernabéu',
          predictedWinner: 'home',
          confidence: 65,
          keyFactors: ['El Clásico', 'Home advantage'],
        },
      ],
      'bundesliga': [
        {
          id: '5',
          homeTeam: 'Bayern Munich',
          awayTeam: 'Borussia Dortmund',
          date: '2024-01-20',
          time: '18:30',
          venue: 'Allianz Arena',
          predictedWinner: 'home',
          confidence: 70,
          keyFactors: ['Der Klassiker', 'Strong home form'],
        },
      ],
      'serie-a': [
        {
          id: '6',
          homeTeam: 'AC Milan',
          awayTeam: 'Inter Milan',
          date: '2024-01-21',
          time: '20:45',
          venue: 'San Siro',
          predictedWinner: 'draw',
          confidence: 55,
          keyFactors: ['Derby della Madonnina', 'Evenly matched'],
        },
      ],
      'ucl': [
        {
          id: '7',
          homeTeam: 'Real Madrid',
          awayTeam: 'Manchester City',
          date: '2024-01-23',
          time: '21:00',
          venue: 'Santiago Bernabéu',
          predictedWinner: 'away',
          confidence: 58,
          keyFactors: ['Champions League', 'Recent form'],
        },
      ],
    }
    return samples[league] || []
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

