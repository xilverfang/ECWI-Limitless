'use client'

import { Calendar, MapPin, TrendingUp, ArrowRight } from 'lucide-react'

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
  dateDisplay?: string
}

interface MatchCardProps {
  match: Match
  leagueId: string
  onClick: () => void
}

export default function MatchCard({ match, onClick }: MatchCardProps) {
  const getPredictionColor = () => {
    if (!match.confidence) return 'bg-gray-100 text-gray-700'
    if (match.confidence >= 70) return 'bg-green-100 text-green-700'
    if (match.confidence >= 55) return 'bg-yellow-100 text-yellow-700'
    return 'bg-orange-100 text-orange-700'
  }

  const getPredictionText = () => {
    if (!match.predictedWinner) return 'No prediction'
    if (match.predictedWinner === 'home') return match.homeTeam
    if (match.predictedWinner === 'away') return match.awayTeam
    return 'Draw'
  }

  return (
    <div
      onClick={onClick}
      className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#1ebc8d] transition-all duration-300 cursor-pointer group hover:shadow-xl transform hover:scale-[1.02] animate-fade-in"
    >
      {/* Teams */}
      <div className="mb-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          <h3 className="text-lg font-bold text-gray-900 flex-1 text-right truncate pr-2">{match.homeTeam}</h3>
          <span className="text-gray-400 text-sm flex-shrink-0">vs</span>
          <h3 className="text-lg font-bold text-gray-900 flex-1 text-left truncate pl-2">{match.awayTeam}</h3>
        </div>
      </div>

      {/* Match Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {(() => {
              const dateStr = match.dateDisplay || match.date
              // Extract day and month from "Saturday, December 13, 2025" -> "13 December"
              const dateMatch = dateStr.match(/(\w+), (\w+) (\d+), (\d+)/)
              if (dateMatch) {
                const [, , month, day] = dateMatch
                return `${day} ${month} ${match.time}`
              }
              // Fallback: try to parse YYYY-MM-DD format
              const isoMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/)
              if (isoMatch) {
                const [, year, monthNum, day] = isoMatch
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                const month = monthNames[parseInt(monthNum) - 1]
                return `${day} ${month} ${match.time}`
              }
              return `${dateStr} ${match.time}`
            })()}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{match.venue}</span>
        </div>
      </div>

      {/* Prediction */}
      {match.predictedWinner && match.confidence && (
        <div className="mb-4 p-3 bg-gradient-to-r from-[#1ebc8d]/10 to-[#1ebc8d]/5 rounded-lg border border-[#1ebc8d]/20">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-[#1ebc8d]" />
              <span className="text-sm font-semibold text-gray-900">Prediction</span>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded ${getPredictionColor()}`}>
              {match.confidence}%
            </span>
          </div>
          <p className="text-sm text-gray-700 font-medium">{getPredictionText()}</p>
          {match.keyFactors && match.keyFactors.length > 0 && (
            <p className="text-xs text-gray-600 mt-1">
              {match.keyFactors[0]}
            </p>
          )}
        </div>
      )}

      {/* View Details */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-sm font-medium text-[#1ebc8d]">View Analysis</span>
        <ArrowRight className="w-4 h-4 text-[#1ebc8d] group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  )
}

