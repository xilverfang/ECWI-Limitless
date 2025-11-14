'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, MapPin, TrendingUp, AlertTriangle, CheckCircle, XCircle, MessageSquare, Loader2 } from 'lucide-react'
import Header from './Header'

interface MatchInsight {
  type: 'home-record' | 'away-record' | 'form' | 'injury' | 'suspension' | 'head-to-head'
  title: string
  description: string
  impact: 'positive' | 'negative' | 'neutral'
  team: 'home' | 'away'
}

interface SocialComment {
  id: string
  author: string
  text: string
  timestamp: string
  likes: number
  sentiment: 'positive' | 'negative' | 'neutral'
}

interface MatchDetailProps {
  matchId: string
}

export default function MatchDetail({ matchId }: MatchDetailProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [match, setMatch] = useState<any>(null)
  const [insights, setInsights] = useState<MatchInsight[]>([])
  const [socialComments, setSocialComments] = useState<SocialComment[]>([])
  const [loadingComments, setLoadingComments] = useState(false)

  useEffect(() => {
    fetchMatchData()
  }, [matchId])

  useEffect(() => {
    if (match) {
      fetchSocialComments()
    }
  }, [match])

  const fetchMatchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/matches/${matchId}`)
      const data = await response.json()
      setMatch(data.match)
      setInsights(data.insights || [])
    } catch (error) {
      console.error('Error fetching match:', error)
      // Fallback to sample data
      setMatch(getSampleMatch(matchId))
      setInsights(getSampleInsights(matchId))
    } finally {
      setLoading(false)
    }
  }

  const fetchSocialComments = async () => {
    if (!match) return
    
    setLoadingComments(true)
    try {
      const response = await fetch('/api/twitter/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          league: match.league,
          maxResults: 20,
        }),
      })
      const data = await response.json()
      
      if (data.success && data.tweets) {
        const comments: SocialComment[] = data.tweets.slice(0, 10).map((tweet: any, idx: number) => ({
          id: tweet.id,
          author: `@${tweet.author}`,
          text: tweet.text,
          timestamp: tweet.createdAt,
          likes: tweet.likeCount,
          sentiment: tweet.sentiment || 'neutral',
        }))
        setSocialComments(comments)
      }
    } catch (error) {
      console.error('Error fetching social comments:', error)
    } finally {
      setLoadingComments(false)
    }
  }

  const getSampleMatch = (id: string) => {
    return {
      id,
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      date: '2024-01-20',
      time: '15:00',
      venue: 'Old Trafford',
      league: 'Premier League',
      predictedWinner: 'away',
      confidence: 68,
    }
  }

  const getSampleInsights = (id: string): MatchInsight[] => {
    return [
      {
        type: 'home-record',
        title: 'Strong Home Record',
        description: 'Manchester United has won 8 of their last 10 home matches',
        impact: 'positive',
        team: 'home',
      },
      {
        type: 'injury',
        title: 'Key Player Injured',
        description: 'Bruno Fernandes is out with a knee injury - major impact on creativity',
        impact: 'negative',
        team: 'home',
      },
      {
        type: 'form',
        title: 'Excellent Away Form',
        description: 'Liverpool has won 6 of their last 7 away matches',
        impact: 'positive',
        team: 'away',
      },
      {
        type: 'head-to-head',
        title: 'Recent Head-to-Head',
        description: 'Liverpool has won 3 of the last 5 meetings between these teams',
        impact: 'positive',
        team: 'away',
      },
      {
        type: 'suspension',
        title: 'Suspension Concern',
        description: 'Casemiro is suspended after receiving a red card in the previous match',
        impact: 'negative',
        team: 'home',
      },
    ]
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'injury':
      case 'suspension':
        return <AlertTriangle className="w-5 h-5" />
      default:
        return <TrendingUp className="w-5 h-5" />
    }
  }

  const getInsightColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'bg-green-50 border-green-200 text-green-900'
      case 'negative':
        return 'bg-red-50 border-red-200 text-red-900'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-[#1ebc8d] animate-spin" />
        </div>
      </div>
    )
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="text-center py-20">
          <p className="text-gray-600">Match not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#1ebc8d] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Match Header */}
        <div className="bg-gradient-to-r from-[#1ebc8d]/10 to-[#1ebc8d]/5 rounded-2xl p-8 mb-8 border border-[#1ebc8d]/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {match.homeTeam} vs {match.awayTeam}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(match.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    at {match.time}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{match.venue}</span>
                </div>
              </div>
            </div>
            {match.predictedWinner && match.confidence && (
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Predicted Winner</div>
                <div className="text-2xl font-bold text-[#1ebc8d]">
                  {match.predictedWinner === 'home' ? match.homeTeam : match.predictedWinner === 'away' ? match.awayTeam : 'Draw'}
                </div>
                <div className="text-sm text-gray-600 mt-1">{match.confidence}% confidence</div>
              </div>
            )}
          </div>
        </div>

        {/* Insights Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why This Prediction?</h2>
          <div className="space-y-4">
            {insights.map((insight, idx) => (
              <div
                key={idx}
                className={`border-2 rounded-xl p-5 ${getInsightColor(insight.impact)} animate-fade-in`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    insight.impact === 'positive' ? 'bg-green-200' :
                    insight.impact === 'negative' ? 'bg-red-200' :
                    'bg-gray-200'
                  }`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{insight.title}</h3>
                      <span className="text-xs font-medium px-2 py-1 rounded bg-white/50">
                        {insight.team === 'home' ? match.homeTeam : match.awayTeam}
                      </span>
                    </div>
                    <p className="text-sm opacity-90">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Comments */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <MessageSquare className="w-6 h-6" />
              <span>What People Are Saying</span>
            </h2>
            {loadingComments && (
              <Loader2 className="w-5 h-5 text-[#1ebc8d] animate-spin" />
            )}
          </div>

          {loadingComments ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading social media comments...</p>
            </div>
          ) : socialComments.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-xl">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-600">No comments found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {socialComments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow animate-fade-in"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{comment.author}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        comment.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                        comment.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {comment.sentiment}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.text}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>❤️ {comment.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

