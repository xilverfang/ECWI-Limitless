'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, Calendar, MapPin, Clock, TrendingUp, AlertTriangle, MessageSquare, Loader2, Trophy, Target, Users, User } from 'lucide-react'
import Header from './Header'

interface MatchInfo {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  time: string
  venue: string
  stadium: string
  stadiumCapacity: number
  referee: string
  league: string
  predictedWinner?: 'home' | 'away' | 'draw'
  confidence?: number
}

interface TeamRecord {
  team: 'home' | 'away'
  teamName: string
  recentForm: string[]
  homeAwayRecord: string
  goalsScored: number
  goalsConceded: number
  keyPlayers: string[]
  injuries: string[]
  suspensions: string[]
}

interface PredictionReason {
  id: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  favors: 'home' | 'away' | 'neutral'
}

interface Comment {
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
  const [loading, setLoading] = useState(true)
  const [match, setMatch] = useState<MatchInfo | null>(null)
  const [teamRecords, setTeamRecords] = useState<TeamRecord[]>([])
  const [predictionReasons, setPredictionReasons] = useState<PredictionReason[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [loadingComments, setLoadingComments] = useState(false)

  useEffect(() => {
    fetchMatchData()
  }, [matchId])

  const fetchMatchData = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/matches/${matchId}`)
      // const data = await response.json()

      // Sample data - replace with API data
      setMatch({
        id: matchId,
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        date: '2024-01-20',
        time: '15:00',
        venue: 'Old Trafford',
        stadium: 'Old Trafford',
        stadiumCapacity: 74879,
        referee: 'Michael Oliver',
        league: 'Premier League',
        predictedWinner: 'away',
        confidence: 68,
      })

      setTeamRecords([
        {
          team: 'home',
          teamName: 'Manchester United',
          recentForm: ['W', 'L', 'W', 'D', 'W'],
          homeAwayRecord: '8W-2D-2L (Home)',
          goalsScored: 24,
          goalsConceded: 15,
          keyPlayers: ['Bruno Fernandes', 'Marcus Rashford', 'Casemiro'],
          injuries: ['Bruno Fernandes (knee)'],
          suspensions: ['Casemiro'],
        },
        {
          team: 'away',
          teamName: 'Liverpool',
          recentForm: ['W', 'W', 'W', 'L', 'W'],
          homeAwayRecord: '6W-1D-1L (Away)',
          goalsScored: 32,
          goalsConceded: 12,
          keyPlayers: ['Mohamed Salah', 'Virgil van Dijk', 'Darwin Núñez'],
          injuries: [],
          suspensions: [],
        },
      ])

      setPredictionReasons([
        {
          id: '1',
          title: 'Superior Away Form',
          description: 'Liverpool has won 6 of their last 7 away matches, demonstrating strong performance on the road.',
          impact: 'high',
          favors: 'away',
        },
        {
          id: '2',
          title: 'Key Player Absences',
          description: 'Manchester United missing Bruno Fernandes (injury) and Casemiro (suspension) significantly weakens their midfield.',
          impact: 'high',
          favors: 'away',
        },
        {
          id: '3',
          title: 'Head-to-Head Record',
          description: 'Liverpool has won 3 of the last 5 meetings between these teams.',
          impact: 'medium',
          favors: 'away',
        },
        {
          id: '4',
          title: 'Home Advantage',
          description: 'Manchester United has a strong home record with 8 wins in 12 home matches this season.',
          impact: 'medium',
          favors: 'home',
        },
        {
          id: '5',
          title: 'Attacking Prowess',
          description: 'Liverpool has scored 32 goals this season compared to Man United\'s 24, showing better offensive output.',
          impact: 'medium',
          favors: 'away',
        },
      ])

      // Simulate fetching comments from Polymarket API
      await fetchComments()
    } catch (error) {
      console.error('Error fetching match data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    setLoadingComments(true)
    try {
      // TODO: Replace with actual Polymarket API call
      // const response = await fetch('/api/polymarket/comments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ matchId }),
      // })
      // const data = await response.json()

      // Sample comments
      setComments([
        {
          id: '1',
          author: '@FootballPundit',
          text: 'Liverpool looking unstoppable right now. Even at Old Trafford, I fancy them to get the win.',
          timestamp: '2024-01-18T10:30:00Z',
          likes: 142,
          sentiment: 'positive',
        },
        {
          id: '2',
          author: '@RedDevil99',
          text: 'Without Bruno and Casemiro, this is going to be tough. But never count United out at home!',
          timestamp: '2024-01-18T12:15:00Z',
          likes: 89,
          sentiment: 'neutral',
        },
        {
          id: '3',
          author: '@LFCAnalysis',
          text: 'Salah is in incredible form. If he continues like this, United\'s defense will struggle.',
          timestamp: '2024-01-18T14:45:00Z',
          likes: 203,
          sentiment: 'positive',
        },
        {
          id: '4',
          author: '@TacticsBoard',
          text: 'This match will be decided in midfield. With Casemiro out, Liverpool will dominate possession.',
          timestamp: '2024-01-19T09:20:00Z',
          likes: 156,
          sentiment: 'neutral',
        },
        {
          id: '5',
          author: '@PremierLeagueFan',
          text: 'Old Trafford atmosphere will be electric! United always show up for these big matches.',
          timestamp: '2024-01-19T11:30:00Z',
          likes: 98,
          sentiment: 'positive',
        },
      ])
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoadingComments(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-[#1ebc8d] animate-spin" />
        </div>
      </div>
    )
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-white">
        <div className="text-center py-20">
          <p className="text-gray-600">Match not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#1ebc8d] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Leagues</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Team Analysis & Prediction Reasons */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section 1: Match Details (Now at the top of left column) */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#1ebc8d] to-[#17a179] p-6">
                <h2 className="text-white text-xl font-bold mb-2">{match.league}</h2>
                <p className="text-white/90 text-sm font-medium">Match Details</p>
              </div>

              <div className="p-6">
                {/* Teams */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{match.homeTeam}</div>
                    <div className="text-sm text-gray-500 font-medium">Home</div>
                  </div>

                  <div className="px-6">
                    <span className="text-gray-400 font-bold text-xl">VS</span>
                  </div>

                  <div className="flex-1 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{match.awayTeam}</div>
                    <div className="text-sm text-gray-500 font-medium">Away</div>
                  </div>
                </div>

                {/* Match Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-[#1ebc8d] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-0.5">Date</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {new Date(match.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-[#1ebc8d] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-0.5">Kick-off</div>
                      <div className="text-sm font-semibold text-gray-900">{match.time} GMT</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-[#1ebc8d] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-0.5">Venue</div>
                      <div className="text-sm font-semibold text-gray-900">{match.stadium}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-[#1ebc8d] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-0.5">Stadium Capacity</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {match.stadiumCapacity.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-[#1ebc8d] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-0.5">Referee</div>
                      <div className="text-sm font-semibold text-gray-900">{match.referee}</div>
                    </div>
                  </div>

                  {/* Prediction */}
                  {match.predictedWinner && match.confidence && (
                    <div className="flex items-start space-x-3">
                      <Target className="w-5 h-5 text-[#1ebc8d] flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-0.5">Expert Prediction</div>
                        <div className="text-sm font-bold text-[#1ebc8d]">
                          {match.predictedWinner === 'home' ? match.homeTeam : match.predictedWinner === 'away' ? match.awayTeam : 'Draw'}
                        </div>
                        <div className="text-xs text-gray-600">{match.confidence}% confidence</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Team Analysis */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Analysis</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamRecords.map((record) => (
                  <div key={record.team} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">{record.teamName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${record.team === 'home' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {record.team === 'home' ? 'Home' : 'Away'}
                      </span>
                    </div>

                    {/* Recent Form */}
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-2">Recent Form</div>
                      <div className="flex space-x-1">
                        {record.recentForm.map((result, idx) => (
                          <div
                            key={idx}
                            className={`w-9 h-9 rounded flex items-center justify-center text-xs font-bold ${result === 'W' ? 'bg-green-100 text-green-700' :
                              result === 'D' ? 'bg-gray-100 text-gray-700' :
                                'bg-red-100 text-red-700'
                              }`}
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Record */}
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-1">Record</div>
                      <div className="text-sm font-medium text-gray-900">{record.homeAwayRecord}</div>
                    </div>

                    {/* Goals */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-xs font-semibold text-gray-600 mb-1">Goals Scored</div>
                        <div className="text-2xl font-bold text-green-600">{record.goalsScored}</div>
                      </div>
                      <div className="bg-red-50 rounded-lg p-3">
                        <div className="text-xs font-semibold text-gray-600 mb-1">Goals Conceded</div>
                        <div className="text-2xl font-bold text-red-600">{record.goalsConceded}</div>
                      </div>
                    </div>

                    {/* Key Players */}
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-2">Key Players</div>
                      <div className="flex flex-wrap gap-2">
                        {record.keyPlayers.map((player, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                            {player}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Injuries & Suspensions */}
                    {(record.injuries.length > 0 || record.suspensions.length > 0) && (
                      <div className="pt-3 border-t border-gray-200 space-y-2">
                        {record.injuries.length > 0 && (
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <AlertTriangle className="w-4 h-4 text-orange-500" />
                              <div className="text-xs font-semibold text-gray-600">Injuries</div>
                            </div>
                            <div className="text-sm text-orange-700">{record.injuries.join(', ')}</div>
                          </div>
                        )}
                        {record.suspensions.length > 0 && (
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                              <div className="text-xs font-semibold text-gray-600">Suspensions</div>
                            </div>
                            <div className="text-sm text-red-700">{record.suspensions.join(', ')}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Prediction Reasons */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why This Prediction?</h2>

              <div className="space-y-4">
                {predictionReasons.map((reason, idx) => (
                  <div
                    key={reason.id}
                    className={`border-2 rounded-xl p-4 animate-fade-in ${reason.favors === 'home' ? 'border-blue-200 bg-blue-50' :
                      reason.favors === 'away' ? 'border-red-200 bg-red-50' :
                        'border-gray-200 bg-gray-50'
                      }`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-lg ${reason.favors === 'home' ? 'bg-blue-200' :
                          reason.favors === 'away' ? 'bg-red-200' :
                            'bg-gray-200'
                          }`}>
                          <TrendingUp className="w-5 h-5 text-gray-700" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{reason.title}</h3>
                          <p className="text-sm text-gray-700">{reason.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1 ml-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${reason.impact === 'high' ? 'bg-red-100 text-red-700' :
                          reason.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                          {reason.impact.toUpperCase()}
                        </span>
                        {reason.favors !== 'neutral' && (
                          <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
                            Favors: {reason.favors === 'home' ? match.homeTeam : match.awayTeam}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Section 3 - Comments (Fixed/Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 sticky top-6 max-h-[calc(100vh-120px)] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-[#1ebc8d]" />
                  <span>Community Insights</span>
                </h2>
                {loadingComments && (
                  <Loader2 className="w-5 h-5 text-[#1ebc8d] animate-spin" />
                )}
              </div>

              {loadingComments ? (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-600">Loading comments...</p>
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No comments yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {comments.map((comment, idx) => (
                    <div
                      key={comment.id}
                      className="border-2 border-gray-200 rounded-xl p-3 hover:border-[#1ebc8d] transition-all hover:shadow-sm animate-fade-in"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1ebc8d] to-[#17a179] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                            {comment.author.charAt(1).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 text-xs block">{comment.author}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.timestamp).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${comment.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                          comment.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                          {comment.sentiment}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2 leading-relaxed">{comment.text}</p>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <span>❤️</span>
                        <span className="font-medium">{comment.likes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}