'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      console.log('Login attempt:', { email, password })
      
      // Set login state in localStorage and redirect
      if (email && password) {
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', email)
        
        // Check if user has completed career gap assessment
        const hasCompletedAssessment = localStorage.getItem(`careerAssessment_${email}`)
        
        if (hasCompletedAssessment) {
          // Existing user - redirect to main dashboard
          window.location.href = '/dashboard'
        } else {
          // New user - redirect to onboarding
          window.location.href = '/onboarding'
        }
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header Space */}
      <div className="h-16"></div>
      
      {/* Login Form with 40px gap from header */}
      <div className="flex-1 flex items-start justify-center px-4 pt-[40px] pb-8">
        <div className="w-full max-w-2xl">
          <Card className="shadow-2xl">
            <CardHeader className="space-y-2 text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900">Welcome Back</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Sign in to your account to continue your career journey
              </CardDescription>
            </CardHeader>
            <CardContent className="px-10 pb-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base font-medium text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 text-lg"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-base font-medium text-gray-700">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-14 text-lg"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" className="rounded border-gray-300 w-4 h-4" />
                    <Label htmlFor="remember" className="text-base text-gray-600">Remember me</Label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-base text-blue-600 hover:text-blue-700 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-10">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-base">
                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button variant="outline" className="w-full h-14 border-gray-300 hover:border-gray-400 text-base">
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </Button>
                </div>
              </div>

              <div className="mt-10 text-center">
                <p className="text-base text-gray-600">
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
