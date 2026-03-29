'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { User, LogOut, Settings, Briefcase } from 'lucide-react'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [currentPath, setCurrentPath] = useState('')
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const checkLoginState = () => {
      if (typeof window !== 'undefined') {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
        setIsLoggedIn(loggedIn)
        setCurrentPath(window.location.pathname)
        
        // Always get basic user info first
        const userName = localStorage.getItem('userName')
        const userEmail = localStorage.getItem('userEmail')
        
        console.log('Header useEffect - userName:', userName, 'userEmail:', userEmail, 'loggedIn:', loggedIn)
        
        // Fetch user's detailed data if logged in
        if (loggedIn && userEmail) {
          const assessmentData = localStorage.getItem(`careerAssessment_${userEmail}`)
          if (assessmentData) {
            const data = JSON.parse(assessmentData)
            console.log('Header - Found assessment data:', data)
            setUserData(data)
          } else if (userName) {
            // Set basic user data if no assessment data exists
            console.log('Header - Setting basic user data with name:', userName)
            setUserData({ name: userName, email: userEmail })
          }
        }
      }
    }
    
    checkLoginState()
    
    const handleStorageChange = () => {
      checkLoginState()
    }
    
    // Close profile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.profile-menu-container')) {
        setShowProfileMenu(false)
      }
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('click', handleClickOutside)
      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('click', handleClickOutside)
      }
    }
  }, [])

  const handleLogout = () => {
    console.log('Logout button clicked')
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userName')
      setIsLoggedIn(false)
      setShowProfileMenu(false)
      window.location.href = '/auth/login'
    }
  }

  const handleMenuNavigation = () => {
    console.log('Profile menu navigation')
    setShowProfileMenu(false)
  }

  const handleSwitchAccount = () => {
    setShowProfileMenu(false)
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login'
    }
  }

  // Pages where only website name should show (no nav, no auth buttons)
  const minimalHeaderPages = ['/', '/auth/login', '/auth/signup', '/onboarding']
  const isMinimalHeader = minimalHeaderPages.includes(currentPath)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Always show */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CR</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Career Re-Entry Hub</span>
          </Link>

          {/* Navigation - Only show when logged in and NOT on minimal pages */}
          {!isMinimalHeader && isLoggedIn && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                Dashboard
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900 transition-colors">
                Profile
              </Link>
              <Link href="/jobs" className="text-gray-600 hover:text-gray-900 transition-colors">
                Jobs
              </Link>
            </nav>
          )}

          {/* Auth Section - Show login/signup on homepage, hide profile on login/signup pages */}
          {currentPath === '/' ? (
            // Homepage: Always show login/signup buttons (even if logged in)
            <div className="flex items-center space-x-3">
              <Link href="/auth/login">
                <Button 
                  variant="outline" 
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 font-medium px-6 py-2"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-2 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : !isMinimalHeader && isLoggedIn ? (
            // Other pages (not minimal): Show profile menu if logged in
            <div className="relative profile-menu-container">
              <Button
                variant="ghost"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-2"
              >
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-purple-600" />
                </div>
                <span className="hidden sm:block text-sm font-medium">
                  {isLoggedIn ? (userData?.name || (typeof window !== 'undefined' ? localStorage.getItem('userName') : 'User')) : 'User'}
                </span>
              </Button>

              {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                      <Card>
                        <CardContent className="p-0">
                          <div className="p-4 border-b">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {userData?.name || (typeof window !== 'undefined' ? localStorage.getItem('userName') || 'User' : 'User')}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {typeof window !== 'undefined' ? (localStorage.getItem('userEmail') || 'your.email@example.com') : 'your.email@example.com'}
                                </p>
                                {userData?.skills && userData.skills.length > 0 && (
                                  <div className="mt-2 flex flex-wrap gap-1">
                                    {userData.skills.slice(0, 3).map((skill: string, index: number) => (
                                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                                        {skill}
                                      </span>
                                    ))}
                                    {userData.skills.length > 3 && (
                                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                        +{userData.skills.length - 3} more
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="py-2">
                            <Link
                              href="/profile"
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={handleMenuNavigation}
                            >
                              <Settings className="w-4 h-4" />
                              <span>Profile Settings</span>
                            </Link>
                            
                            <Link
                              href="/dashboard"
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={handleMenuNavigation}
                            >
                              <Briefcase className="w-4 h-4" />
                              <span>Dashboard</span>
                            </Link>
                            
                            <button
                              onClick={handleSwitchAccount}
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full text-left"
                            >
                              <User className="w-4 h-4" />
                              <span>Switch Account</span>
                            </button>
                            
                            <button
                              onClick={handleLogout}
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
