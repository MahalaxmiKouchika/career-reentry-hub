'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Camera, Briefcase, Edit, Plus, Settings, LogOut, Upload } from 'lucide-react'

interface UserData {
  name: string
  email: string
  previous_role: string
  experience_years: string
  education: string
  skills: string[]
  interests: string[]
  target_role: string
  preferred_location: string
  learning_goal: string
  career_gap: string
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [profileData, setProfileData] = useState({
    fullName: 'Your Name',
    email: 'your.email@example.com',
    previousJobRole: 'Your Previous Role',
    yearsOfExperience: 'Your Experience Level',
    industry: 'Your Industry',
    highestEducation: "Your Education Background"
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get basic user info from signup
      const userName = localStorage.getItem('userName')
      const userEmail = localStorage.getItem('userEmail')
      
      // Get detailed user data from onboarding
      const userEmailStored = localStorage.getItem('userEmail')
      if (userEmailStored) {
        const assessmentData = localStorage.getItem(`careerAssessment_${userEmailStored}`)
        if (assessmentData) {
          const data = JSON.parse(assessmentData)
          setUserData(data)
          setProfileData({
            fullName: data.name || userName || 'Your Name',
            email: userEmail || 'your.email@example.com',
            previousJobRole: data.previous_role || 'Your Previous Role',
            yearsOfExperience: data.experience_years || 'Your Experience Level',
            industry: data.target_role || 'Your Industry',
            highestEducation: data.education || 'Your Education Background'
          })
        } else {
          setProfileData({
            fullName: userName || 'Your Name',
            email: userEmail || 'your.email@example.com',
            previousJobRole: 'Your Previous Role',
            yearsOfExperience: 'Your Experience Level',
            industry: 'Your Industry',
            highestEducation: 'Your Education Background'
          })
        }
      }
    }
  }, [])

  // Close profile menu when clicking outside
  useEffect(() => {
    console.log('showProfileMenu changed to:', showProfileMenu)
  }, [showProfileMenu])

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      // Check if click is outside the profile menu container
      const profileMenu = document.querySelector('.profile-menu-container')
      if (profileMenu && !profileMenu.contains(target)) {
        console.log('Closing menu due to outside click')
        setShowProfileMenu(false)
      }
    }
    
    if (typeof window !== 'undefined' && showProfileMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    }
  }, [showProfileMenu])

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFile(file)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfilePhoto(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Update localStorage with new profile data
    if (typeof window !== 'undefined') {
      localStorage.setItem('userName', profileData.fullName)
      localStorage.setItem('userEmail', profileData.email)
      
      // Update assessment data if it exists
      const userEmail = localStorage.getItem('userEmail')
      if (userEmail && userData) {
        const updatedUserData = {
          ...userData,
          name: profileData.fullName,
          previous_role: profileData.previousJobRole,
          experience_years: profileData.yearsOfExperience,
          education: profileData.highestEducation,
          target_role: profileData.industry
        }
        localStorage.setItem(`careerAssessment_${userEmail}`, JSON.stringify(updatedUserData))
        setUserData(updatedUserData)
      }
    }
    
    // TODO: Upload files to server
    setTimeout(() => {
      setIsLoading(false)
      alert('Profile updated successfully!')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Profile</h1>
          <p className="text-gray-600">Manage your personal information, photo, and resume</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden border-4 border-white shadow-lg">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-purple-600" />
                    )}
                  </div>
                  <div className="relative inline-block">
                    <button
                      onClick={() => {
                        console.log('Camera button clicked')
                        setShowProfileMenu(!showProfileMenu)
                      }}
                      className="absolute bottom-1 right-1 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 z-10"
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </button>

                    {/* Professional Profile Menu Dropdown */}
                    {showProfileMenu && (
                      <div className="profile-menu-container absolute right-0 top-10 w-56 bg-white rounded-lg shadow-lg border z-50 overflow-hidden">
                        <div className="py-2">
                          <label
                            htmlFor="photo-upload"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
                            onClick={() => {
                              console.log('Change Photo clicked')
                              setShowProfileMenu(false)
                            }}
                          >
                            <Camera className="w-4 h-4 mr-3 text-gray-500" />
                            <span>Change Photo</span>
                          </label>
                          <button
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
                            onClick={() => {
                              console.log('Edit Profile clicked')
                              setShowProfileMenu(false)
                              // Focus on name input
                              const nameInput = document.getElementById('fullName') as HTMLInputElement
                              if (nameInput) nameInput.focus()
                            }}
                          >
                            <Edit className="w-4 h-4 mr-3 text-gray-500" />
                            <span>Edit Profile</span>
                          </button>
                          <button
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
                            onClick={() => {
                              console.log('Add Resume clicked')
                              setShowProfileMenu(false)
                              // Scroll to resume section
                              const resumeSection = document.getElementById('resume-upload')
                              if (resumeSection) resumeSection.scrollIntoView({ behavior: 'smooth' })
                            }}
                          >
                            <Plus className="w-4 h-4 mr-3 text-gray-500" />
                            <span>Add Resume</span>
                          </button>
                          <button
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
                            onClick={() => {
                              console.log('Settings clicked')
                              setShowProfileMenu(false)
                              // Navigate to settings
                              window.location.href = '/profile'
                            }}
                          >
                            <Settings className="w-4 h-4 mr-3 text-gray-500" />
                            <span>Settings</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                </div>
                
                <CardTitle>{profileData.fullName}</CardTitle>
                <CardDescription>{profileData.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span>{profileData.previousJobRole}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{profileData.yearsOfExperience}</span>
                  </div>
                  
                  {/* Skills Section */}
                  {userData?.skills && userData.skills.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {userData.skills.slice(0, 6).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                        {userData.skills.length > 6 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{userData.skills.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Interests Section */}
                  {userData?.interests && userData.interests.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Interests</h4>
                      <div className="flex flex-wrap gap-1">
                        {userData.interests.slice(0, 3).map((interest, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {interest}
                          </span>
                        ))}
                        {userData.interests.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{userData.interests.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Career Goal Section */}
                  {userData?.target_role && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Career Goal</h4>
                      <p className="text-xs text-gray-600">{userData.target_role}</p>
                    </div>
                  )}
                  
                  {profilePhoto && (
                    <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                      ✓ Photo uploaded: {profilePhoto.name}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Edit Profile Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information and upload documents</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="previousJobRole">Previous Job Role</Label>
                      <Input
                        id="previousJobRole"
                        value={profileData.previousJobRole}
                        onChange={(e) => setProfileData(prev => ({ ...prev, previousJobRole: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                      <Input
                        id="yearsOfExperience"
                        value={profileData.yearsOfExperience}
                        onChange={(e) => setProfileData(prev => ({ ...prev, yearsOfExperience: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="industry">Target Industry/Role</Label>
                      <Input
                        id="industry"
                        value={profileData.industry}
                        onChange={(e) => setProfileData(prev => ({ ...prev, industry: e.target.value }))}
                        placeholder="e.g., Tech, Healthcare, Finance"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="highestEducation">Highest Education</Label>
                      <Input
                        id="highestEducation"
                        value={profileData.highestEducation}
                        onChange={(e) => setProfileData(prev => ({ ...prev, highestEducation: e.target.value }))}
                        placeholder="e.g., Bachelor's in Computer Science"
                      />
                    </div>
                  </div>

                  {/* Career Goal Display */}
                  {userData?.target_role && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Current Career Goal</h4>
                      <p className="text-sm text-gray-600">{userData.target_role}</p>
                      {userData?.learning_goal && (
                        <p className="text-xs text-gray-500 mt-1">Learning Goal: {userData.learning_goal}</p>
                      )}
                    </div>
                  )}

                  {/* Resume Upload Section */}
                  <div id="resume-upload" className="space-y-4">
                    <Label>Resume Upload</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                        id="resume-file-input"
                      />
                      <label htmlFor="resume-file-input" className="cursor-pointer">
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-sm text-gray-600 mb-2">
                            {resumeFile ? resumeFile.name : 'Click to upload or drag and drop'}
                          </p>
                          <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                        </div>
                      </label>
                    </div>
                    {resumeFile && (
                      <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                        ✓ Resume uploaded: {resumeFile.name}
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
