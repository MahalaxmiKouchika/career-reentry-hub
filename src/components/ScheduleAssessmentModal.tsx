'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Clock, X, CheckCircle } from 'lucide-react'

interface ScheduledAssessment {
  id: string
  userEmail: string
  scheduledDate: string
  assessmentType: string
  notes: string
  status: string
  createdAt: string
  reminderSent: boolean
}

interface ScheduleAssessmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSchedule: (assessment: ScheduledAssessment) => void
  userEmail: string
}

const assessmentTypes = [
  { value: 'career_reentry', label: 'Career Re-Entry Assessment' },
  { value: 'skills_evaluation', label: 'Skills Evaluation' },
  { value: 'career_path', label: 'Career Path Planning' },
  { value: 'mock_interview', label: 'Mock Interview' }
]

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
]

export default function ScheduleAssessmentModal({ 
  isOpen, 
  onClose, 
  onSchedule, 
  userEmail 
}: ScheduleAssessmentModalProps) {
  const [formData, setFormData] = useState({
    assessmentType: 'career_reentry',
    date: '',
    timeSlot: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isScheduled, setIsScheduled] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.date || !formData.timeSlot) {
      alert('Please select both date and time slot')
      return
    }

    setIsSubmitting(true)

    try {
      // Combine date and time to create full datetime
      const scheduledDateTime = new Date(`${formData.date} ${formData.timeSlot}`)
      
      // Create scheduled assessment object
      const scheduledAssessment: ScheduledAssessment = {
        id: `assessment_${Date.now()}`,
        userEmail,
        scheduledDate: scheduledDateTime.toISOString(),
        assessmentType: formData.assessmentType,
        notes: formData.notes,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
        reminderSent: false
      }

      // Call API (in production)
      const response = await fetch('/api/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          scheduledDate: scheduledDateTime.toISOString(),
          assessmentType: formData.assessmentType,
          notes: formData.notes
        }),
      })

      if (response.ok) {
        // Store in localStorage for frontend management
        const existingAssessments = JSON.parse(localStorage.getItem(`scheduledAssessments_${userEmail}`) || '[]')
        existingAssessments.push(scheduledAssessment)
        localStorage.setItem(`scheduledAssessments_${userEmail}`, JSON.stringify(existingAssessments))

        onSchedule(scheduledAssessment)
        setIsScheduled(true)
        
        // Reset form after 2 seconds and close modal
        setTimeout(() => {
          setIsScheduled(false)
          onClose()
          setFormData({
            assessmentType: 'career_reentry',
            date: '',
            timeSlot: '',
            notes: ''
          })
        }, 2000)
      } else {
        throw new Error('Failed to schedule assessment')
      }
    } catch (error) {
      console.error('Error scheduling assessment:', error)
      alert('Failed to schedule assessment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  // Get maximum date (3 months from now)
  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 3)
    return maxDate.toISOString().split('T')[0]
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Schedule Assessment
              </CardTitle>
              <CardDescription>
                Choose a convenient time for your career assessment
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isScheduled ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Assessment Scheduled!
              </h3>
              <p className="text-green-700">
                Your assessment has been scheduled for {formData.date} at {formData.timeSlot}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assessmentType">Assessment Type</Label>
                <Select 
                  value={formData.assessmentType} 
                  onValueChange={(value) => handleInputChange('assessmentType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select assessment type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {assessmentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={getMinDate()}
                  max={getMaxDate()}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeSlot">Preferred Time</Label>
                <Select 
                  value={formData.timeSlot} 
                  onValueChange={(value) => handleInputChange('timeSlot', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot..." />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(slot => (
                      <SelectItem key={slot} value={slot}>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {slot}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any specific topics you'd like to focus on..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !formData.date || !formData.timeSlot}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  {isSubmitting ? 'Scheduling...' : 'Schedule Assessment'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
