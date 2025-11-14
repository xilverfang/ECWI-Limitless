import { NextResponse } from 'next/server'
import { testTwitterConnection } from '@/lib/twitter/client'

export async function GET() {
  try {
    const result = await testTwitterConnection()
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message || 'Twitter API connection successful',
        testResults: result.testResults,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Twitter API connection failed',
          error: result.error,
          details: result.details,
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error testing Twitter connection',
        error: error.message,
      },
      { status: 500 }
    )
  }
}

