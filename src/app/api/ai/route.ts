import { NextRequest, NextResponse } from 'next/server'
import { generateRecommendations } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    // Read request body
    const body = await request.json()
    const { userData } = body

    // Validate required fields
    if (!userData) {
      return NextResponse.json(
        { error: 'User data is required' },
        { status: 400 }
      )
    }

    // Generate AI recommendations
    const recommendations = await generateRecommendations(userData)

    // Return successful response
    return NextResponse.json({
      success: true,
      data: recommendations
    })

  } catch (error) {
    console.error('AI API Error:', error)
    
    // Return error response
    return NextResponse.json(
      { 
        error: 'Failed to generate recommendations',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
