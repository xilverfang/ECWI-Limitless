'use client'

import { TrendingUp, Users, Brain } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-[#1ebc8d] p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                Sports betting confidence index. Follow the experts, beat the crowd.
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Crowd</span>
            </div>
            <div className="flex items-center space-x-2 text-[#1ebc8d]">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">Experts</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

