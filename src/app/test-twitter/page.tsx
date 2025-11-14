'use client'

import { useState } from 'react'
import { TestConnection, SearchTweets, TestAccounts } from '@/components/TwitterTest'

export default function TestTwitterPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Twitter API Test Page
        </h1>
        
        <div className="space-y-8">
          <TestConnection />
          <SearchTweets />
          <TestAccounts />
        </div>
      </div>
    </div>
  )
}

