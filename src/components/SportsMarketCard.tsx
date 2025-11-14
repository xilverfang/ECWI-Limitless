'use client'

import { Calendar, TrendingUp, Users, ArrowRight, AlertTriangle } from 'lucide-react'

interface Market {
  id: string
  teams: { home: string; away: string }
  league: string
  date: string
  crowdConfidence: number
  ewci: number
  crowdDirection: string
  ewciDirection: string
  insights: {
    home: {
      strengths: string[]
      weaknesses: string[]
      injuries: string[]
    }
    away: {
      strengths: string[]
      weaknesses: string[]
      injuries: string[]
    }
  }
}

interface SportsMarketCardProps {
  market: Market
  onClick: () => void
}

export default function SportsMarketCard({ market, onClick }: SportsMarketCardProps) {
  const hasDivergence = market.crowdDirection !== market.ewciDirection
  const hasInjuries = market.insights.home.injuries.length > 0 || 
                      market.insights.away.injuries.length > 0

  return (
    <div 
      className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group animate-fade-in"
      onClick={onClick}
    >
      {/* League Badge */}
      <div className="bg-gradient-to-r from-[#1ebc8d] to-[#17a078] px-4 py-2">
        <span className="text-white text-sm font-semibold">{market.league}</span>
      </div>

      <div className="p-6">
        {/* Teams */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">{market.teams.home}</h3>
            <span className="text-gray-400">vs</span>
            <h3 className="text-xl font-bold text-gray-900">{market.teams.away}</h3>
          </div>
          <div className="flex items-center text-gray-500 text-sm mt-2">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(market.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>
        </div>

        {/* Confidence Comparison */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-1 mb-1">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-600">Crowd</span>
            </div>
            <div className="text-2xl font-bold text-gray-700">
              {market.crowdConfidence}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {market.crowdDirection}
            </div>
          </div>
          <div className="bg-[#1ebc8d]/10 rounded-lg p-3 border border-[#1ebc8d]/20">
            <div className="flex items-center space-x-1 mb-1">
              <TrendingUp className="w-4 h-4 text-[#1ebc8d]" />
              <span className="text-xs text-[#1ebc8d] font-medium">EWCI</span>
            </div>
            <div className="text-2xl font-bold text-[#1ebc8d]">
              {market.ewci}%
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {market.ewciDirection}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-2">
          {hasDivergence && (
            <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-medium">
                Divergence: Crowd and Experts disagree
              </span>
            </div>
          )}
          {hasInjuries && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 rounded-lg px-3 py-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-medium">
                Injury concerns detected
              </span>
            </div>
          )}
        </div>

        {/* Quick Insights Preview */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Key Factors</p>
              <div className="flex flex-wrap gap-1">
                {market.insights.home.strengths.slice(0, 1).map((strength, idx) => (
                  <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {strength}
                  </span>
                ))}
                {market.insights.away.strengths.slice(0, 1).map((strength, idx) => (
                  <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {strength}
                  </span>
                ))}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#1ebc8d] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  )
}

