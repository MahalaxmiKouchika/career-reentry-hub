'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  Award, 
  BookOpen, 
  Briefcase, 
  Target, 
  Flame,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  BarChart3,
  Brain,
  Loader2,
  ExternalLink,
  Zap,
  Trophy
} from 'lucide-react'

interface UserData {
  skills: string[]
  [key: string]: any
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [userStats, setUserStats] = useState({
    careerReadinessScore: 75,
    dailyStreak: 12,
    totalXP: 2450,
    completedSkills: 8,
    jobApplications: 15
  })
  const [aiRecommendations, setAiRecommendations] = useState<any>(null)
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userEmail = localStorage.getItem('userEmail')
      if (userEmail) {
        const assessmentData = localStorage.getItem(`careerAssessment_${userEmail}`)
        if (assessmentData) {
          const data = JSON.parse(assessmentData)
          setUserData(data)
          // Update user stats based on assessment data
          setUserStats(prev => ({
            ...prev,
            careerReadinessScore: Math.min(100, data.skills.length * 15 + 20),
            completedSkills: data.skills.length
          }))
        }
      }
    }
  }, [])

  const fetchAIRecommendations = async () => {
    if (!userData) return
    
    setIsLoadingAI(true)
    setAiError(null)
    
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userData }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success) {
        setAiRecommendations(result.data)
      } else {
        throw new Error(result.error || 'Failed to get recommendations')
      }
    } catch (error) {
      console.error('Error fetching AI recommendations:', error)
      setAiError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsLoadingAI(false)
    }
  }

  // Button click handlers
  const handleViewAllSkills = () => {
    console.log('View All Skills clicked')
    // Navigate to skills page or expand current view
    window.location.href = '/profile'
  }

  const handleSeeMoreSkills = () => {
    console.log('See More Skills clicked')
    // Navigate to learning resources
    window.location.href = '/dashboard/learning'
  }

  const handleScheduleAssessment = () => {
    console.log('Schedule Assessment clicked')
    // Navigate to assessment page
    window.location.href = '/onboarding'
  }

  const handleBrowseAllJobs = () => {
    console.log('Browse All Jobs clicked')
    // Navigate to jobs page
    window.location.href = '/jobs'
  }

  const handleViewAllAnalysis = () => {
    console.log('View All Analysis clicked')
    // Navigate to detailed analysis page
    window.location.href = '/dashboard/analysis'
  }

  const handleJobApply = (jobTitle: string) => {
    console.log(`Apply for ${jobTitle}`)
    // Navigate to job application or open modal
    alert(`Application process for ${jobTitle} would start here`)
  }

  const skillGaps = userData ? [
    // Show gaps based on user's actual skills and interests
    ...(userData.skills && userData.skills.length > 0 ? userData.skills.map((skill: string, index: number) => ({
      skill: skill,
      level: index === 0 ? 'Advanced' : index === 1 ? 'Intermediate' : 'Beginner',
      priority: index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low',
      progress: Math.max(20, 80 - (index * 15))
    })) : [
      { skill: 'No skills added yet', level: 'Beginner', priority: 'High', progress: 0 }
    ])
  ] : [
    { skill: 'Loading...', level: 'Beginner', priority: 'Medium', progress: 0 }
  ]

  const recommendedSkills = userData ? [
    // Recommend skills based on user's interests from onboarding
    ...(userData.interests && userData.interests.length > 0 ? userData.interests.map((interest: string, index: number) => {
      const skillMap: { [key: string]: { skill: string, relevance: number, difficulty: string, time: string } } = {
        'Frontend Development': { skill: 'React.js', relevance: 95, difficulty: 'Intermediate', time: '4 weeks' },
        'Backend Development': { skill: 'Node.js', relevance: 88, difficulty: 'Advanced', time: '6 weeks' },
        'Full Stack Development': { skill: 'TypeScript', relevance: 92, difficulty: 'Intermediate', time: '5 weeks' },
        'Mobile Development': { skill: 'React Native', relevance: 85, difficulty: 'Intermediate', time: '7 weeks' },
        'Cloud Computing': { skill: 'AWS', relevance: 90, difficulty: 'Advanced', time: '8 weeks' },
        'AI/Machine Learning': { skill: 'Python', relevance: 88, difficulty: 'Advanced', time: '10 weeks' },
        'Data Science': { skill: 'Python', relevance: 85, difficulty: 'Advanced', time: '12 weeks' },
        'DevOps': { skill: 'Docker', relevance: 87, difficulty: 'Advanced', time: '6 weeks' },
        'Product Management': { skill: 'Agile', relevance: 80, difficulty: 'Intermediate', time: '4 weeks' },
        'UI/UX Design': { skill: 'Figma', relevance: 92, difficulty: 'Beginner', time: '3 weeks' },
        'Digital Marketing': { skill: 'SEO', relevance: 78, difficulty: 'Beginner', time: '4 weeks' },
        'Content Writing': { skill: 'Technical Writing', relevance: 75, difficulty: 'Beginner', time: '3 weeks' },
        'Business Analysis': { skill: 'SQL', relevance: 82, difficulty: 'Intermediate', time: '5 weeks' }
      }
      return skillMap[interest] || { skill: 'JavaScript', relevance: 75, difficulty: 'Beginner', time: '4 weeks' }
    }) : [
      { skill: 'JavaScript', relevance: 95, difficulty: 'Beginner', time: '4 weeks' },
      { skill: 'React.js', relevance: 88, difficulty: 'Intermediate', time: '6 weeks' }
    ])
  ] : [
    { skill: 'Loading...', relevance: 0, difficulty: 'Beginner', time: '4 weeks' }
  ]

  const jobOpportunities = userData ? [
    // Generate jobs based on user's interests and target role from onboarding
    ...(userData.interests && userData.interests.length > 0 ? userData.interests.slice(0, 2).map((interest: string, index: number) => {
      const jobMap: { [key: string]: { title: string, company: string, salary: string, requiredSkills: string[] } } = {
        'Frontend Development': { 
          title: 'Frontend Developer', 
          company: 'Tech Solutions Inc', 
          salary: '$80k - $120k', 
          requiredSkills: ['JavaScript', 'React', 'CSS'] 
        },
        'Backend Development': { 
          title: 'Backend Developer', 
          company: 'Data Systems Corp', 
          salary: '$90k - $130k', 
          requiredSkills: ['Node.js', 'Python', 'SQL'] 
        },
        'Full Stack Development': { 
          title: 'Full Stack Developer', 
          company: 'Innovation Labs', 
          salary: '$100k - $150k', 
          requiredSkills: ['JavaScript', 'React', 'Node.js'] 
        },
        'Mobile Development': { 
          title: 'Mobile App Developer', 
          company: 'App Studio', 
          salary: '$85k - $125k', 
          requiredSkills: ['React Native', 'JavaScript', 'Mobile UI'] 
        },
        'Cloud Computing': { 
          title: 'Cloud Engineer', 
          company: 'CloudTech', 
          salary: '$95k - $140k', 
          requiredSkills: ['AWS', 'Docker', 'Kubernetes'] 
        },
        'AI/Machine Learning': { 
          title: 'ML Engineer', 
          company: 'AI Solutions', 
          salary: '$110k - $160k', 
          requiredSkills: ['Python', 'Machine Learning', 'TensorFlow'] 
        },
        'Data Science': { 
          title: 'Data Scientist', 
          company: 'Data Analytics Co', 
          salary: '$100k - $145k', 
          requiredSkills: ['Python', 'SQL', 'Statistics'] 
        },
        'DevOps': { 
          title: 'DevOps Engineer', 
          company: 'DevOps Pro', 
          salary: '$90k - $135k', 
          requiredSkills: ['Docker', 'AWS', 'CI/CD'] 
        },
        'Product Management': { 
          title: 'Product Manager', 
          company: 'Product Hub', 
          salary: '$95k - $140k', 
          requiredSkills: ['Agile', 'Analytics', 'Communication'] 
        },
        'UI/UX Design': { 
          title: 'UI/UX Designer', 
          company: 'Design Studio', 
          salary: '$75k - $115k', 
          requiredSkills: ['Figma', 'Design Systems', 'User Research'] 
        },
        'Digital Marketing': { 
          title: 'Digital Marketing Specialist', 
          company: 'Marketing Pro', 
          salary: '$65k - $95k', 
          requiredSkills: ['SEO', 'Analytics', 'Content Creation'] 
        },
        'Content Writing': { 
          title: 'Technical Writer', 
          company: 'Content Co', 
          salary: '$60k - $85k', 
          requiredSkills: ['Technical Writing', 'Documentation', 'Communication'] 
        },
        'Business Analysis': { 
          title: 'Business Analyst', 
          company: 'Business Solutions', 
          salary: '$80k - $120k', 
          requiredSkills: ['SQL', 'Analytics', 'Requirements Gathering'] 
        }
      }
      
      const job = jobMap[interest] || jobMap['Frontend Development']
      return {
        title: job.title,
        company: job.company,
        location: 'Remote',
        matchPercentage: Math.min(95, (userData.skills?.length || 0) * 15 + (index === 0 ? 25 : 20)),
        salary: job.salary,
        postedAt: index === 0 ? '1 week ago' : '3 days ago',
        requiredSkills: job.requiredSkills
      }
    }) : [
      {
        title: 'Software Developer',
        company: 'Tech Corp',
        location: 'Remote',
        matchPercentage: 75,
        salary: '$70k - $100k',
        postedAt: '1 week ago',
        requiredSkills: ['JavaScript', 'Problem Solving']
      }
    ]),
    // Add a target role specific job if available
    ...(userData.target_role ? [{
      title: userData.target_role,
      company: 'Dream Company',
      location: 'Remote',
      matchPercentage: Math.min(95, (userData.skills?.length || 0) * 20 + 35),
      salary: '$85k - $125k',
      postedAt: '2 days ago',
      requiredSkills: userData.skills?.slice(0, 3) || ['JavaScript', 'Problem Solving']
    }] : [])
  ].slice(0, 3) : [
    {
      title: 'Software Developer',
      company: 'Tech Corp',
      location: 'Remote',
      matchPercentage: 75,
      salary: '$70k - $100k',
      postedAt: '1 week ago',
      requiredSkills: ['JavaScript', 'Problem Solving']
    }
  ]

  const certifications = [
    { 
      name: 'AWS Certified Developer', 
      status: userData?.skills.includes('AWS') ? 'In Progress' : 'Recommended', 
      progress: userData?.skills.includes('AWS') ? 65 : 0, 
      deadline: '2024-03-15',
      relevantSkills: ['AWS', 'Node.js']
    },
    { 
      name: 'React Professional Certification', 
      status: userData?.skills.includes('React') ? 'In Progress' : 'Recommended', 
      progress: userData?.skills.includes('React') ? 35 : 0, 
      deadline: '2024-04-01',
      relevantSkills: ['React', 'JavaScript']
    },
    { 
      name: 'Full Stack Web Development', 
      status: userData?.skills.includes('Node.js') ? 'In Progress' : 'Recommended', 
      progress: userData?.skills.includes('Node.js') ? 45 : 0, 
      deadline: '2024-05-01',
      relevantSkills: ['JavaScript', 'Node.js', 'MongoDB']
    }
  ]

  const getReadinessColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back{userData?.name ? `, ${userData.name.split(' ')[0]}!` : '! 👋'}
            </h1>
              <p className="text-gray-600">Track your career re-entry progress and discover new opportunities</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2" onClick={handleScheduleAssessment}>
                <Calendar className="w-4 h-4" />
                Schedule Assessment
              </Button>
              <Button 
                className="flex items-center gap-2" 
                onClick={fetchAIRecommendations}
                disabled={isLoadingAI}
              >
                {isLoadingAI ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Brain className="w-4 h-4" />
                )}
                {isLoadingAI ? 'Getting AI Insights...' : 'Get AI Recommendations'}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <Badge className={getReadinessColor(userStats.careerReadinessScore)}>
                  {userStats.careerReadinessScore}%
                </Badge>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{userStats.careerReadinessScore}%</div>
              <p className="text-sm text-gray-600 mb-2">Career Readiness</p>
              <Progress value={userStats.careerReadinessScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                  <Flame className="w-6 h-6 text-orange-600" />
                </div>
                <Badge className="bg-orange-100 text-orange-800">
                  {userStats.dailyStreak} days
                </Badge>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">Daily Streak</div>
              <p className="text-sm text-gray-600 mt-2">You're on fire! 🔥</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-blue-600" />
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  {userStats.totalXP} XP
                </Badge>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">Total XP</div>
              <p className="text-sm text-gray-600 mt-2">Level 5 - 550 XP to next level</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {userStats.jobApplications}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">Applications</div>
              <p className="text-sm text-gray-600 mt-2">3 interviews this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skill Gaps */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      Skill Gap Analysis
                    </CardTitle>
                    <CardDescription>Focus on high-priority skills to boost your career readiness</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleViewAllSkills}>View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillGaps.map((skill, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{skill.skill}</h4>
                            <p className="text-sm text-gray-600">{skill.level}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(skill.priority)}>
                            {skill.priority}
                          </Badge>
                          <span className="text-sm font-medium text-gray-600">{skill.progress}%</span>
                        </div>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Skills */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    Recommended Skills
                  </CardTitle>
                  <CardDescription>High-demand skills for your career goals</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleSeeMoreSkills}>See More</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedSkills.map((skill, index) => (
                  <div key={index} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{skill.skill}</h4>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        {skill.relevance}% match
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" />
                        {skill.difficulty}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {skill.time}
                      </span>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-yellow-600 hover:bg-yellow-700">
                      Start Learning
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Opportunities */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  Job Opportunities
                </CardTitle>
                <CardDescription>Positions that match your skills and experience</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleBrowseAllJobs}>Browse All Jobs</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobOpportunities.map((job, index) => (
                <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-green-100 text-green-800">
                      {job.matchPercentage}% Match
                    </Badge>
                    <span className="text-sm text-gray-500">{job.postedAt}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{job.title}</h4>
                  <p className="text-gray-600 mb-3">{job.company}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {job.location}
                    </span>
                  </div>
                  <div className="text-green-600 font-semibold mb-4">{job.salary}</div>
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleJobApply(job.title)}>
                    Apply Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations Section */}
      {aiError && (
        <Card className="border-red-200 bg-red-50 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <div>
                <h3 className="font-medium">Error Loading AI Recommendations</h3>
                <p className="text-sm">{aiError}</p>
              </div>
            </div>
            <Button onClick={fetchAIRecommendations} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {aiRecommendations && (
        <div className="space-y-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AI-Powered Career Insights
              </CardTitle>
              <CardDescription>Personalized recommendations based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Skills to Learn */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Skills to Learn</h4>
                  <div className="space-y-3">
                    {aiRecommendations.skills_to_learn?.slice(0, 4).map((skill: any, index: number) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-blue-900">{skill.skill}</h5>
                            <p className="text-sm text-blue-700">{skill.reason}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Courses */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Recommended Courses</h4>
                  <div className="space-y-3">
                    {aiRecommendations.courses?.slice(0, 3).map((course: any, index: number) => (
                      <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h5 className="font-medium text-green-900">{course.name}</h5>
                            <p className="text-sm text-green-700">{course.platform}</p>
                          </div>
                          {course.link !== 'N/A' && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={course.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Career Roadmap */}
              <div className="mt-8">
                <h4 className="font-medium text-gray-900 mb-4">Your Career Roadmap</h4>
                <div className="space-y-3">
                  {aiRecommendations.career_roadmap?.map((step: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-purple-900">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Roles Match */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Recommended Job Roles
              </CardTitle>
              <CardDescription>Positions that match your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiRecommendations.job_roles?.map((job: any, index: number) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{job.role}</h5>
                      <Badge className="bg-green-100 text-green-800">
                        {job.match_percentage} Match
                      </Badge>
                    </div>
                    <Button className="w-full">View Opportunities</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Recommended Certifications
              </CardTitle>
              <CardDescription>Certifications to boost your career</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiRecommendations.certifications?.map((cert: any, index: number) => (
                  <div key={index} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h5 className="font-medium text-yellow-900">{cert.name}</h5>
                        <p className="text-sm text-yellow-700">{cert.provider}</p>
                      </div>
                      {cert.link !== 'N/A' && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={cert.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
