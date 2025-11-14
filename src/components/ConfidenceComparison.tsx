'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Users, TrendingUp, AlertCircle } from 'lucide-react'

export default function ConfidenceComparison() {
  const data = [
    {
      name: 'Crowd',
      confidence: 85,
      direction: 'NO',
      color: '#94a3b8'
    },
    {
      name: 'EWCI',
      confidence: 62,
      direction: 'YES',
      color: '#1ebc8d'
    }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Confidence Comparison
          </h2>
          <p className="text-gray-600">
            See how expert-weighted predictions differ from crowd sentiment
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-gray-400"></div>
            <span className="text-sm text-gray-600">Crowd</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-[#1ebc8d]"></div>
            <span className="text-sm text-gray-600">EWCI</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Crowd Confidence Card */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Crowd's Confidence
              </h3>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              85%
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-700">NO</span>
              <span className="text-sm text-gray-500">(1,000 users)</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            General public sentiment based on all bets
          </p>
        </div>

        {/* EWCI Card */}
        <div className="bg-gradient-to-br from-[#1ebc8d]/10 to-[#1ebc8d]/5 rounded-xl p-6 border-2 border-[#1ebc8d]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#1ebc8d]" />
              <h3 className="text-lg font-semibold text-gray-900">
                Expert-Weighted CI
              </h3>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-5xl font-bold text-[#1ebc8d] mb-2">
              62%
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-700">YES</span>
              <span className="text-sm text-gray-500">(Top 50 experts)</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Weighted by historical accuracy & category expertise
          </p>
        </div>
      </div>

      {/* Visual Comparison */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Visual Comparison
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fill: '#64748b' }} />
            <YAxis tick={{ fill: '#64748b' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="confidence" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Insight Alert */}
      <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-900">
            Key Insight
          </p>
          <p className="text-sm text-amber-800 mt-1">
            The crowd says NO (85%), but experts weighted by accuracy say YES (62%). 
            This significant divergence suggests following the smart money might be the wiser choice.
          </p>
        </div>
      </div>
    </div>
  )
}

