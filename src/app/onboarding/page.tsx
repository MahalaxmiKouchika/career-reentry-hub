'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, ArrowRight, X, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface FormData {
  name: string
  education: string
  experience_years: string
  career_gap: string
  previous_role: string
  skills: string[]
  interests: string[]
  target_role: string
  preferred_location: string
  learning_goal: string
}

const experienceLevels = [
  '0-1 years',
  '1-3 years',
  '3-5 years',
  '5-10 years',
  '10+ years'
]

const careerGapOptions = [
  'No gap - currently employed',
  'Less than 6 months',
  '6 months - 1 year',
  '1-2 years',
  '2-3 years',
  '3-5 years',
  '5+ years'
]

const commonSkills = [
  'JavaScript', 'React', 'TypeScript', 'Node.js', 'Python', 'Java', 'SQL',
  'HTML/CSS', 'Git', 'AWS', 'Docker', 'Figma', 'Excel', 'PowerPoint',
  'Project Management', 'Data Analysis', 'Machine Learning', 'UI/UX Design'
]

const commonInterests = [
  'Frontend Development', 'Backend Development', 'Full Stack Development',
  'Mobile Development', 'Cloud Computing', 'AI/Machine Learning',
  'Data Science', 'DevOps', 'Product Management', 'UI/UX Design',
  'Digital Marketing', 'Content Writing', 'Business Analysis'
]

const learningGoals = [
  'Get a job within 3 months',
  'Switch to a new career field',
  'Upgrade current skills',
  'Start freelancing',
  'Build a startup',
  'Learn for personal growth'
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3
  const progressPercentage = (currentStep / totalSteps) * 100

  const [formData, setFormData] = useState<FormData>({
    name: '',
    education: '',
    experience_years: '',
    career_gap: '',
    previous_role: '',
    skills: [],
    interests: [],
    target_role: '',
    preferred_location: '',
    learning_goal: ''
  })

  const [skillInput, setSkillInput] = useState('')
  const [interestInput, setInterestInput] = useState('')

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }))
    }
    setSkillInput('')
  }

  const removeSkill = (skill: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))
  }

  const addInterest = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      setFormData(prev => ({ ...prev, interests: [...prev.interests, interest] }))
    }
    setInterestInput('')
  }

  const removeInterest = (interest: string) => {
    setFormData(prev => ({ ...prev, interests: prev.interests.filter(i => i !== interest) }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    const userEmail = localStorage.getItem('userEmail') || 'user@example.com'
    localStorage.setItem(`careerAssessment_${userEmail}`, JSON.stringify(formData))
    localStorage.setItem('onboardingComplete', 'true')
    
    // Initialize user progress tracking for new users
    const initialProgress = {
      dailyStreak: 1, // Start with day 1 after completing onboarding
      totalXP: 50, // Award XP for completing onboarding
      jobApplications: 0,
      lastActiveDate: new Date().toISOString(),
      completedSkills: formData.skills.length || 0
    }
    localStorage.setItem(`userProgress_${userEmail}`, JSON.stringify(initialProgress))
    
    window.location.href = '/dashboard'
  }

  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal & Professional Background</h2>
            <p className="text-gray-600">Tell us about yourself to get personalized career guidance.</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="education">Highest Education *</Label>
              <Input
                id="education"
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                placeholder="e.g., Bachelor's in Computer Science"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience_years">Years of Experience *</Label>
              <Select value={formData.experience_years} onValueChange={(value) => handleInputChange('experience_years', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select years of experience..." />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="career_gap">Career Gap Duration *</Label>
              <Select value={formData.career_gap} onValueChange={(value) => handleInputChange('career_gap', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select career gap..." />
                </SelectTrigger>
                <SelectContent>
                  {careerGapOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="previous_role">Previous Job Role *</Label>
              <Input
                id="previous_role"
                value={formData.previous_role}
                onChange={(e) => handleInputChange('previous_role', e.target.value)}
                placeholder="Enter your previous job role"
              />
            </div>
          </div>
        </div>
      )
    }

    if (currentStep === 2) {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills & Interests</h2>
            <p className="text-gray-600">Help us understand what you know and what excites you.</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Your Skills *</Label>
              <p className="text-sm text-gray-500">Select from common skills or add your own</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {commonSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => addSkill(skill)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      formData.skills.includes(skill)
                        ? 'bg-purple-100 border-purple-300 text-purple-700'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add custom skill..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(skillInput))}
                />
                <Button type="button" variant="outline" onClick={() => addSkill(skillInput)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Your Interests *</Label>
              <p className="text-sm text-gray-500">What career areas interest you?</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {commonInterests.map(interest => (
                  <button
                    key={interest}
                    onClick={() => addInterest(interest)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      formData.interests.includes(interest)
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  placeholder="Add custom interest..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest(interestInput))}
                />
                <Button type="button" variant="outline" onClick={() => addInterest(interestInput)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.interests.map(interest => (
                  <Badge key={interest} variant="secondary" className="flex items-center gap-1 bg-blue-50">
                    {interest}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeInterest(interest)} />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (currentStep === 3) {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Career Goals</h2>
            <p className="text-gray-600">Tell us where you want to go in your career.</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="target_role">Target Job Role *</Label>
              <Input
                id="target_role"
                value={formData.target_role}
                onChange={(e) => handleInputChange('target_role', e.target.value)}
                placeholder="e.g., Senior Frontend Developer"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="preferred_location">Preferred Work Location *</Label>
              <Select value={formData.preferred_location} onValueChange={(value) => handleInputChange('preferred_location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred location..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remote Only</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="no_preference">No Preference</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="learning_goal">Primary Learning Goal *</Label>
              <Select value={formData.learning_goal} onValueChange={(value) => handleInputChange('learning_goal', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your learning goal..." />
                </SelectTrigger>
                <SelectContent>
                  {learningGoals.map(goal => (
                    <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Re-Entry Hub</h1>
          <p className="text-gray-600">Let's get to know you better to personalize your journey.</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-gray-200" />
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{renderStep()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              {currentStep === totalSteps ? (
                <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
                  Complete
                </Button>
              ) : (
                <Button 
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
