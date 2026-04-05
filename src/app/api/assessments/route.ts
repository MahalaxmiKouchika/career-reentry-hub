import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Read request body
    const body = await request.json()
    const { userEmail, scheduledDate, assessmentType, notes } = body

    // Validate required fields
    if (!userEmail || !scheduledDate) {
      return NextResponse.json(
        { error: 'User email and scheduled date are required' },
        { status: 400 }
      )
    }

    // Create scheduled assessment object
    const scheduledAssessment = {
      id: `assessment_${Date.now()}`,
      userEmail,
      scheduledDate,
      assessmentType: assessmentType || 'career_reentry',
      notes: notes || '',
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      reminderSent: false
    }

    // In a real app, you would save this to a database
    // For now, we'll just return the scheduled assessment
    // The frontend will store it in localStorage

    return NextResponse.json({
      success: true,
      data: scheduledAssessment,
      message: 'Assessment scheduled successfully'
    })

  } catch (error) {
    console.error('Schedule Assessment API Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to schedule assessment',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Get scheduled assessments for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userEmail = searchParams.get('userEmail')

    if (!userEmail) {
      return NextResponse.json(
        { error: 'User email is required' },
        { status: 400 }
      )
    }

    // In a real app, you would fetch from database
    // For now, return empty array - frontend will handle localStorage
    return NextResponse.json({
      success: true,
      data: []
    })

  } catch (error) {
    console.error('Get Scheduled Assessments API Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to get scheduled assessments',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Update assessment status (e.g., cancel, complete)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { assessmentId, status, notes } = body

    if (!assessmentId || !status) {
      return NextResponse.json(
        { error: 'Assessment ID and status are required' },
        { status: 400 }
      )
    }

    // In a real app, you would update in database
    return NextResponse.json({
      success: true,
      message: `Assessment ${status} successfully`
    })

  } catch (error) {
    console.error('Update Assessment API Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to update assessment',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Delete/cancel assessment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const assessmentId = searchParams.get('assessmentId')

    if (!assessmentId) {
      return NextResponse.json(
        { error: 'Assessment ID is required' },
        { status: 400 }
      )
    }

    // In a real app, you would delete from database
    return NextResponse.json({
      success: true,
      message: 'Assessment cancelled successfully'
    })

  } catch (error) {
    console.error('Delete Assessment API Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to cancel assessment',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
