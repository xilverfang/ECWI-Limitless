'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from './Header'
import ConfidenceComparison from './ConfidenceComparison'
import { Trophy, ArrowRight } from 'lucide-react'

const LEAGUES = [
  {
    id: 'premier-league',
    name: 'Premier League',
    country: 'England',
    color: 'from-purple-500 to-purple-700',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    country: 'Spain',
    color: 'from-red-500 to-red-700',
    icon: '🇪🇸',
    gradient: 'bg-gradient-to-br from-red-500 to-red-700',
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    country: 'Germany',
    color: 'from-yellow-500 to-yellow-700',
    icon: '🇩🇪',
    gradient: 'bg-gradient-to-br from-yellow-500 to-yellow-700',
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    country: 'Italy',
    color: 'from-green-500 to-green-700',
    icon: '🇮🇹',
    gradient: 'bg-gradient-to-br from-green-500 to-green-700',
  },
  {
    id: 'ucl',
    name: 'UEFA Champions League',
    country: 'Europe',
    color: 'from-blue-500 to-blue-700',
    icon: '🏆',
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
  },
]

export default function EWCIDashboard() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Comparison Section */}
        <ConfidenceComparison />

        {/* Football Leagues Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 bg-[#1ebc8d]/10 px-4 py-2 rounded-full mb-4">
              <Trophy className="w-5 h-5 text-[#1ebc8d]" />
              <span className="text-sm font-semibold text-[#1ebc8d]">Football Prediction Markets</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Select Your League
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get expert-weighted predictions and insights for upcoming matches across Europe's top football leagues
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {LEAGUES.map((league, idx) => (
              <div
                key={league.id}
                onClick={() => router.push(`/leagues/${league.id}`)}
                className="group relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#1ebc8d] transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-2xl transform hover:scale-[1.03] animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Gradient Background Effect */}
                <div className={`absolute top-0 right-0 w-40 h-40 ${league.gradient} opacity-5 rounded-bl-full group-hover:opacity-15 transition-opacity duration-500`} />
                <div className={`absolute bottom-0 left-0 w-32 h-32 ${league.gradient} opacity-5 rounded-tr-full group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-6xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {league.icon}
                    </div>
                    <div className={`p-3 rounded-full ${league.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#1ebc8d] transition-colors duration-300">
                    {league.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 font-medium">{league.country}</p>
                  
                  <div className="flex items-center space-x-2 text-sm font-semibold text-gray-500 group-hover:text-[#1ebc8d] transition-colors duration-300">
                    <Trophy className="w-4 h-4" />
                    <span>Explore Matches</span>
                  </div>
                </div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
