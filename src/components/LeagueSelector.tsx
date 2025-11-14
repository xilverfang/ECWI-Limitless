'use client'

import { useRouter } from 'next/navigation'
import { Trophy, ArrowRight } from 'lucide-react'
import Header from './Header'

const LEAGUES = [
  {
    id: 'premier-league',
    name: 'Premier League',
    country: 'England',
    color: 'from-purple-500 to-purple-700',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    country: 'Spain',
    color: 'from-red-500 to-red-700',
    icon: '🇪🇸',
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    country: 'Germany',
    color: 'from-yellow-500 to-yellow-700',
    icon: '🇩🇪',
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    country: 'Italy',
    color: 'from-green-500 to-green-700',
    icon: '🇮🇹',
  },
  {
    id: 'ucl',
    name: 'UEFA Champions League',
    country: 'Europe',
    color: 'from-blue-500 to-blue-700',
    icon: '🏆',
  },
]

export default function LeagueSelector() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Select a League
          </h1>
          <p className="text-lg text-gray-600">
            Get expert insights and predictions for upcoming matches
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {LEAGUES.map((league) => (
            <button
              key={league.id}
              onClick={() => router.push(`/leagues/${league.id}`)}
              className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#1ebc8d] transition-all duration-300 hover:shadow-xl transform hover:scale-105 animate-fade-in"
            >
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${league.color} opacity-10 rounded-bl-3xl`} />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{league.icon}</div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#1ebc8d] group-hover:translate-x-1 transition-all" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {league.name}
                </h3>
                <p className="text-sm text-gray-600">{league.country}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Trophy className="w-4 h-4" />
                    <span>View Upcoming Matches</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-[#1ebc8d]/10 px-6 py-3 rounded-full">
            <span className="text-sm font-medium text-[#1ebc8d]">
              Powered by Expert-Weighted Confidence Index
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

