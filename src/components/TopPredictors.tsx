'use client'

import { Trophy, TrendingUp, Award, Star } from 'lucide-react'

export default function TopPredictors() {
  const predictors = [
    {
      rank: 1,
      name: 'SportsAnalystPro',
      accuracy: 87.3,
      category: 'NBA',
      totalBets: 1247,
      winRate: 89.2,
      badge: 'All-Time Top 10'
    },
    {
      rank: 2,
      name: 'FootballOracle',
      accuracy: 85.1,
      category: 'Premier League',
      totalBets: 892,
      winRate: 86.5,
      badge: 'Category Expert'
    },
    {
      rank: 3,
      name: 'NFLInsider',
      accuracy: 83.7,
      category: 'NFL',
      totalBets: 1103,
      winRate: 84.9,
      badge: 'Top Predictor'
    },
    {
      rank: 4,
      name: 'BasketballGuru',
      accuracy: 82.9,
      category: 'NBA',
      totalBets: 756,
      winRate: 83.1,
      badge: 'Rising Star'
    },
    {
      rank: 5,
      name: 'SoccerSavant',
      accuracy: 81.5,
      category: 'Premier League',
      totalBets: 634,
      winRate: 82.3,
      badge: 'Expert'
    }
  ]

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'All-Time Top 10':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
      case 'Category Expert':
        return 'bg-gradient-to-r from-[#1ebc8d] to-[#17a078] text-white'
      case 'Top Predictor':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
      case 'Rising Star':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }

  return (
    <div className="mt-12 animate-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <Trophy className="w-6 h-6 text-[#1ebc8d]" />
        <h2 className="text-3xl font-bold text-gray-900">
          Top Predictors
        </h2>
        <span className="text-sm text-gray-500">(Weighted by EWCI)</span>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Predictor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Accuracy
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Win Rate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Bets
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Badge
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {predictors.map((predictor, idx) => (
                <tr 
                  key={predictor.rank}
                  className="hover:bg-gray-50 transition-colors animate-slide-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {predictor.rank <= 3 ? (
                        <Trophy className={`w-5 h-5 ${
                          predictor.rank === 1 ? 'text-yellow-500' :
                          predictor.rank === 2 ? 'text-gray-400' :
                          'text-amber-600'
                        }`} />
                      ) : (
                        <span className="text-lg font-bold text-gray-400">
                          #{predictor.rank}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#1ebc8d] to-[#17a078] rounded-full flex items-center justify-center text-white font-bold">
                        {predictor.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-900">
                        {predictor.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {predictor.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-[#1ebc8d]" />
                      <span className="text-lg font-bold text-[#1ebc8d]">
                        {predictor.accuracy}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-700">
                      {predictor.winRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {predictor.totalBets.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getBadgeColor(predictor.badge)}`}>
                      {predictor.badge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <strong>How it works:</strong> These predictors are weighted more heavily in the EWCI calculation 
            based on their historical accuracy, category expertise, and financial stake. Their predictions 
            carry more influence than the general crowd.
          </p>
        </div>
      </div>
    </div>
  )
}

