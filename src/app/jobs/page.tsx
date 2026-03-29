'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, MapPin, Briefcase, Clock, ExternalLink } from 'lucide-react'

const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    experience: 'Senior',
    salary: '$120k - $160k',
    matchPercentage: 92,
    description: 'Looking for an experienced frontend developer...',
    postedAt: '2 days ago',
    missingSkills: ['GraphQL', 'AWS'],
    externalUrl: '#'
  },
  {
    id: 2,
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'Remote',
    experience: 'Mid',
    salary: '$100k - $140k',
    matchPercentage: 85,
    description: 'Join our growing team as a full stack engineer...',
    postedAt: '3 days ago',
    missingSkills: ['Python', 'Docker'],
    externalUrl: '#'
  },
  {
    id: 3,
    title: 'React Developer',
    company: 'Digital Agency',
    location: 'New York, NY',
    type: 'Full-time',
    experience: 'Mid',
    salary: '$90k - $120k',
    matchPercentage: 78,
    description: 'We are looking for a talented React developer...',
    postedAt: '1 week ago',
    missingSkills: ['TypeScript'],
    externalUrl: '#'
  }
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJob, setSelectedJob] = useState<typeof mockJobs[0] | null>(null)

  const filteredJobs = mockJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800'
    if (percentage >= 80) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Opportunities</h1>
          <p className="text-gray-600">Discover opportunities that match your skills and experience</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search jobs or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Job List */}
          <div className="md:col-span-2 space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className={`cursor-pointer transition-all hover:shadow-md ${selectedJob?.id === job.id ? 'ring-2 ring-purple-500' : ''}`}
                   onClick={() => setSelectedJob(job)}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription className="text-base font-medium text-gray-700">{job.company}</CardDescription>
                    </div>
                    <Badge className={getMatchColor(job.matchPercentage)}>
                      {job.matchPercentage}% Match
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Briefcase className="w-3 h-3" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3 h-3" />
                        {job.postedAt}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-600">{job.salary}</span>
                      <Button size="sm" onClick={(e) => { e.stopPropagation(); window.open(job.externalUrl, '_blank'); }}>
                        Apply <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Job Details Sidebar */}
          <div className="md:col-span-1">
            {selectedJob ? (
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">{selectedJob.title}</CardTitle>
                  <CardDescription className="text-base font-medium text-gray-700">{selectedJob.company}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Match Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Overall Match</span>
                        <Badge className={getMatchColor(selectedJob.matchPercentage)}>
                          {selectedJob.matchPercentage}%
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {selectedJob.missingSkills.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Missing Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedJob.missingSkills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-2">Job Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type</span>
                        <span>{selectedJob.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experience</span>
                        <span>{selectedJob.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location</span>
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salary</span>
                        <span className="font-semibold text-green-600">{selectedJob.salary}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" onClick={() => window.open(selectedJob.externalUrl, '_blank')}>
                    Apply Now <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">Select a Job</h3>
                  <p className="text-sm text-gray-600">Click on a job to see detailed information</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
