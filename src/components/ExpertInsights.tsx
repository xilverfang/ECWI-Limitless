'use client'

import { X, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

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

interface ExpertInsightsProps {
  market: Market
  onClose: () => void
}

export default function ExpertInsights({ market, onClose }: ExpertInsightsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {market.teams.home} vs {market.teams.away}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{market.league}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Confidence Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-gray-600">Crowd Confidence</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {market.crowdConfidence}%
              </div>
              <div className="text-sm text-gray-600">
                Direction: <span className="font-semibold">{market.crowdDirection}</span>
              </div>
            </div>
            <div className="bg-[#1ebc8d]/10 rounded-xl p-4 border-2 border-[#1ebc8d]">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-[#1ebc8d]">EWCI</span>
              </div>
              <div className="text-3xl font-bold text-[#1ebc8d] mb-1">
                {market.ewci}%
              </div>
              <div className="text-sm text-gray-600">
                Direction: <span className="font-semibold">{market.ewciDirection}</span>
              </div>
            </div>
          </div>

          {/* Team Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Home Team */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-5 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                {market.teams.home}
              </h3>

              {/* Strengths */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <h4 className="text-sm font-semibold text-gray-900">Strengths</h4>
                </div>
                <ul className="space-y-1">
                  {market.insights.home.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <h4 className="text-sm font-semibold text-gray-900">Weaknesses</h4>
                </div>
                <ul className="space-y-1">
                  {market.insights.home.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Injuries */}
              {market.insights.home.injuries.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <h4 className="text-sm font-semibold text-red-900">Injury Report</h4>
                  </div>
                  <ul className="space-y-1">
                    {market.insights.home.injuries.map((injury, idx) => (
                      <li key={idx} className="text-sm text-red-800">
                        {injury}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-5 border border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                {market.teams.away}
              </h3>

              {/* Strengths */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <h4 className="text-sm font-semibold text-gray-900">Strengths</h4>
                </div>
                <ul className="space-y-1">
                  {market.insights.away.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <h4 className="text-sm font-semibold text-gray-900">Weaknesses</h4>
                </div>
                <ul className="space-y-1">
                  {market.insights.away.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Injuries */}
              {market.insights.away.injuries.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <h4 className="text-sm font-semibold text-red-900">Injury Report</h4>
                  </div>
                  <ul className="space-y-1">
                    {market.insights.away.injuries.map((injury, idx) => (
                      <li key={idx} className="text-sm text-red-800">
                        {injury}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Expert Analysis Summary */}
          <div className="bg-gradient-to-r from-[#1ebc8d]/10 to-[#1ebc8d]/5 rounded-xl p-5 border border-[#1ebc8d]/20">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 text-[#1ebc8d] mr-2" />
              Expert Analysis Summary
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Based on weighted analysis from top predictors in the {market.league} category, 
              the EWCI suggests a {market.ewciDirection} outcome with {market.ewci}% confidence. 
              This differs from the crowd sentiment ({market.crowdConfidence}% {market.crowdDirection}), 
              indicating that experts see factors the general public may be overlooking.
            </p>
            {(market.insights.home.injuries.length > 0 || market.insights.away.injuries.length > 0) && (
              <div className="mt-3 pt-3 border-t border-[#1ebc8d]/20">
                <p className="text-xs text-gray-600">
                  <strong>Note:</strong> Injury reports may significantly impact the outcome. 
                  Expert weighting accounts for historical impact of similar injury patterns.
                </p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full bg-[#1ebc8d] hover:bg-[#17a078] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  )
}

