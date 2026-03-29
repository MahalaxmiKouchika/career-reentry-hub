import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password } = await request.json()

    // TODO: Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // TODO: Check if user already exists
    // TODO: Hash password and create user in database
    // TODO: Send verification email

    // Mock response for now
    const hashedPassword = await bcrypt.hash(password, 12)

    return NextResponse.json({
      message: 'User registered successfully',
      user: {
        id: 'mock-user-id',
        email,
        fullName
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
