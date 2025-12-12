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

  useEffect(() => {
    fetchMatchData()
  }, [matchId])

  const fetchMatchData = async () => {
    setLoading(true)
    try {
      // Fetch match data from API
      const response = await fetch(`/api/matches/${matchId}`)
      const data = await response.json()

      if (data.success && data.match) {
        console.log('Match data received:', data.match) // Debug log
        
        // Transform API data to component format
        setMatch({
          id: data.match.id,
          homeTeam: data.match.homeTeam,
          awayTeam: data.match.awayTeam,
          date: data.match.date,
          time: data.match.time,
          venue: data.match.venue,
          stadium: data.match.venue,
          stadiumCapacity: data.match.capacity || 0,
          referee: data.match.referee || 'To be confirmed',
          league: data.match.league || 'Premier League',
          predictedWinner: data.match.predictedWinner,
          confidence: data.match.confidence,
        })
        
        // Use analysis data if available
        const analysis = data.match.analysis || data.analysis
        
        // Transform insights to PredictionReason format
        if (data.insights && data.insights.length > 0) {
          const reasons = data.insights.map((insight: any, index: number) => ({
            id: `insight-${index + 1}`,
            title: insight.title,
            description: insight.description,
            impact: insight.impact === 'positive' ? 'high' : insight.impact === 'negative' ? 'high' : 'medium' as 'high' | 'medium' | 'low',
            favors: insight.team === 'home' ? 'home' : insight.team === 'away' ? 'away' : 'neutral' as 'home' | 'away' | 'neutral',
          }))
          setPredictionReasons(reasons)
        } else {
          // If no insights, set empty array
          setPredictionReasons([])
        }
        
        // Generate team records from analysis data
        if (analysis) {
          // Parse form strings to arrays (e.g., "W-W-L-W-W (text)" -> ['W', 'W', 'L', 'W', 'W'])
          const parseForm = (formStr: string) => {
            if (!formStr) return []
            // Remove text in brackets first, then extract form
            const cleaned = formStr.replace(/\s*\([^)]+\)\s*$/, '').trim()
            const formMatch = cleaned.match(/^([WDL]-){4}[WDL]/)
            if (formMatch) {
              return cleaned.split('-').slice(0, 5)
            }
            return []
          }
          
          // Extract injuries for each team
          const getInjuriesForTeam = (teamName: string, injuries: string[]) => {
            return injuries
              .filter(injury => injury.startsWith(teamName))
              .map(injury => injury.replace(`${teamName}: `, ''))
          }
          
          // Extract key player name
          const getKeyPlayerName = (keyManStr: string) => {
            if (!keyManStr) return ''
            const match = keyManStr.match(/^([^(]+)/)
            return match ? match[0].trim() : ''
          }
          
          setTeamRecords([
            {
              team: 'home',
              teamName: data.match.homeTeam,
              recentForm: parseForm(analysis.home_form_last_5_PL || ''),
              homeAwayRecord: analysis.head_to_head_note_home || analysis.head_to_head_note || `Playing at ${data.match.venue}`,
              goalsScored: 0, // Not in analysis data
              goalsConceded: 0, // Not in analysis data
              keyPlayers: analysis.key_man_home ? [getKeyPlayerName(analysis.key_man_home)] : [],
              injuries: getInjuriesForTeam(data.match.homeTeam, analysis.injuries_affecting_outcome || []),
              suspensions: [],
            },
            {
              team: 'away',
              teamName: data.match.awayTeam,
              recentForm: parseForm(analysis.away_form_last_5_PL || ''),
              homeAwayRecord: analysis.head_to_head_note_away || analysis.head_to_head_note || `Away match`,
              goalsScored: 0, // Not in analysis data
              goalsConceded: 0, // Not in analysis data
              keyPlayers: analysis.key_man_away ? [getKeyPlayerName(analysis.key_man_away)] : [],
              injuries: getInjuriesForTeam(data.match.awayTeam, analysis.injuries_affecting_outcome || []),
              suspensions: [],
            },
          ])
        } else {
          // Fallback if no analysis data
          setTeamRecords([
            {
              team: 'home',
              teamName: data.match.homeTeam,
              recentForm: [],
              homeAwayRecord: `Playing at ${data.match.venue}${data.match.capacity ? ` (Capacity: ${data.match.capacity.toLocaleString()})` : ''}`,
              goalsScored: 0,
              goalsConceded: 0,
              keyPlayers: [],
              injuries: [],
              suspensions: [],
            },
            {
              team: 'away',
              teamName: data.match.awayTeam,
              recentForm: [],
              homeAwayRecord: `Away match`,
              goalsScored: 0,
              goalsConceded: 0,
              keyPlayers: [],
              injuries: [],
              suspensions: [],
            },
          ])
        }
        
        // Use generated comments from API
        if (data.comments && data.comments.length > 0) {
          setComments(data.comments)
        }
      } else {
        // No match data found - will show error state
        console.error('Match not found:', matchId)
      }

      // Comments are already loaded from API response
    } catch (error) {
      console.error('Error fetching match data:', error)
    } finally {
      setLoading(false)
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
                {/* Teams - Centered */}
                <div className="flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="flex items-center gap-4 mb-2">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{match.homeTeam}</div>
                        <div className="text-sm text-gray-500 font-medium">Home</div>
                      </div>
                      <span className="text-gray-400 font-bold text-xl">VS</span>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{match.awayTeam}</div>
                        <div className="text-sm text-gray-500 font-medium">Away</div>
                      </div>
                    </div>
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
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Team Analysis</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teamRecords.map((record) => (
                  <div key={record.team} className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-1xl font-bold text-gray-900">{record.teamName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${record.team === 'home' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {record.team === 'home' ? 'Home' : 'Away'}
                      </span>
                    </div>

                    {/* Recent Form */}
                    <div className="mb-6">
                      <div className="text-xs font-semibold text-gray-600 mb-3">Recent Form</div>
                      <div className="flex space-x-1 mb-4">
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
                      {/* Form Remark - extracted from homeAwayRecord */}
                      {(() => {
                        const remarkMatch = record.homeAwayRecord.match(/\(([^)]+)\)/)
                        return remarkMatch ? (
                          <div className="text-xs text-gray-600 italic mt-2 block">
                            {remarkMatch[1]}
                          </div>
                        ) : null
                      })()}
                    </div>

                    {/* Record */}
                    {record.homeAwayRecord && record.homeAwayRecord !== 'Playing at ' && record.homeAwayRecord !== 'Away match' && (
                      <div className="mb-6">
                        <div className="text-xs font-semibold text-gray-600 mb-3">Head-to-Head Record</div>
                        <div className="text-sm font-medium text-gray-900 leading-relaxed break-words">
                          {record.homeAwayRecord.replace(/\s*\([LWDL0-9,\s]+\)\s*/g, '').trim()}
                        </div>
                      </div>
                    )}

                    {/* Goals */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-xs font-semibold text-gray-600 mb-2">Goals Scored</div>
                        <div className="text-2xl font-bold text-green-600">{record.goalsScored}</div>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4">
                        <div className="text-xs font-semibold text-gray-600 mb-2">Goals Conceded</div>
                        <div className="text-2xl font-bold text-red-600">{record.goalsConceded}</div>
                      </div>
                    </div>

                    {/* Key Players */}
                    {record.keyPlayers.length > 0 && (
                      <div className="mb-6">
                        <div className="text-xs font-semibold text-gray-600 mb-3">Key Players</div>
                        <div className="flex flex-wrap gap-2">
                          {record.keyPlayers.map((player, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              {player}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Injuries & Suspensions */}
                    {(record.injuries.length > 0 || record.suspensions.length > 0) && (
                      <div className="pt-6 mt-6 border-t border-gray-200 space-y-4">
                        {record.injuries.length > 0 && (
                          <div>
                            <div className="flex items-center space-x-2 mb-3">
                              <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                              <div className="text-xs font-semibold text-gray-600">Injuries</div>
                            </div>
                            <div className="text-sm text-orange-700 leading-relaxed ml-6">{record.injuries.join(', ')}</div>
                          </div>
                        )}
                        {record.suspensions.length > 0 && (
                          <div>
                            <div className="flex items-center space-x-2 mb-3">
                              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                              <div className="text-xs font-semibold text-gray-600">Suspensions</div>
                            </div>
                            <div className="text-sm text-red-700 leading-relaxed ml-6">{record.suspensions.join(', ')}</div>
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
                {comments.length === 0 && (
                  <Loader2 className="w-5 h-5 text-[#1ebc8d] animate-spin" />
                )}
              </div>

              {comments.length === 0 ? (
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