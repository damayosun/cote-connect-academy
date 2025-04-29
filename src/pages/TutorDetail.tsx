
import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, CheckCircle, Star } from 'lucide-react';

// Mock tutor data
const tutorData = {
  id: 1,
  name: "Dr. Alex Chen",
  subjects: ["Computer Science", "Data Science", "Machine Learning", "Python Programming"],
  rating: 4.9,
  reviewCount: 127,
  image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  price: 60,
  experience: 8,
  education: "PhD in Computer Science, Stanford University",
  description: "I'm a Computer Science professor with 8+ years of teaching experience. My research focuses on machine learning and AI applications. I believe in making complex concepts simple and helping students build a strong foundation in computer science principles.",
  achievements: [
    "Published 15+ research papers in top CS journals",
    "Developed an online learning platform used by 10,000+ students",
    "Winner of Excellence in Teaching Award 2022",
    "Industry experience at major tech companies"
  ],
  availability: [
    { day: "Monday", slots: ["9:00 AM - 11:00 AM", "2:00 PM - 5:00 PM"] },
    { day: "Wednesday", slots: ["10:00 AM - 12:00 PM", "3:00 PM - 6:00 PM"] },
    { day: "Friday", slots: ["9:00 AM - 1:00 PM"] },
    { day: "Saturday", slots: ["11:00 AM - 3:00 PM"] }
  ],
  reviews: [
    { 
      id: 1, 
      studentName: "Jamie Smith", 
      rating: 5, 
      date: "March 15, 2024", 
      comment: "Dr. Chen is an exceptional tutor. He explained complex machine learning concepts in an easy-to-understand way. Highly recommend!" 
    },
    { 
      id: 2, 
      studentName: "Taylor Rodriguez", 
      rating: 5, 
      date: "February 28, 2024", 
      comment: "Amazing teacher! I was struggling with my data structures class, and after just a few sessions with Dr. Chen, I aced my midterm." 
    },
    { 
      id: 3, 
      studentName: "Jordan Lee", 
      rating: 4, 
      date: "January 10, 2024", 
      comment: "Very knowledgeable and patient. Explains concepts clearly and is always well-prepared for sessions." 
    }
  ]
};

const TutorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // In a real app, you would fetch the tutor data based on the ID
  const tutor = tutorData; // Simplified for this example
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow py-8 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <NavLink 
              to="/find-tutors" 
              className="text-cote-primary hover:underline flex items-center"
            >
              ← Back to Tutors
            </NavLink>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tutor Info Card */}
            <Card className="lg:col-span-1">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img 
                      src={tutor.image} 
                      alt={tutor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{tutor.name}</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-2">{tutor.education}</p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 rounded-full px-2 py-0.5 text-sm">
                      <Star className="h-4 w-4 mr-1 fill-current" /> {tutor.rating}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">
                      ({tutor.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
                      <span className="font-medium">Experience:</span>
                      <span>{tutor.experience} years</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
                      <span className="font-medium">Hourly Rate:</span>
                      <span className="text-cote-primary font-bold">${tutor.price}/hr</span>
                    </div>
                  </div>
                  
                  <div className="w-full mt-4">
                    <h3 className="font-bold mb-2">Subjects</h3>
                    <div className="flex flex-wrap gap-2">
                      {tutor.subjects.map((subject, index) => (
                        <span 
                          key={index} 
                          className="bg-cote-light dark:bg-slate-800 text-cote-primary dark:text-cote-light px-3 py-1 rounded-full text-sm"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6 bg-cote-primary hover:bg-cote-secondary" asChild>
                    <NavLink to={`/book-session/${tutor.id}`}>Book a Session</NavLink>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Tutor Details Tabs */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-400">
                        {tutor.description}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Achievements & Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {tutor.achievements.map((achievement, index) => (
                          <li key={index} className="flex">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                            <span className="text-slate-600 dark:text-slate-400">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="availability">
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Availability</CardTitle>
                      <CardDescription>
                        Regular hours when this tutor is typically available for sessions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {tutor.availability.map((day, dayIndex) => (
                          <div key={dayIndex} className="border-b border-gray-200 dark:border-gray-800 pb-4 last:border-0">
                            <h4 className="font-medium flex items-center mb-2">
                              <Calendar className="h-4 w-4 mr-2" />
                              {day.day}
                            </h4>
                            <div className="ml-6 space-y-2">
                              {day.slots.map((slot, slotIndex) => (
                                <div key={slotIndex} className="flex items-center">
                                  <Clock className="h-4 w-4 text-slate-400 mr-2" />
                                  <span className="text-sm">{slot}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Note: Availability may change. Book a session to confirm specific times.
                      </p>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Reviews</CardTitle>
                      <CardDescription>
                        Feedback from previous tutoring sessions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {tutor.reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0">
                            <div className="flex justify-between mb-2">
                              <h4 className="font-medium">{review.studentName}</h4>
                              <span className="text-sm text-slate-500 dark:text-slate-400">{review.date}</span>
                            </div>
                            <div className="flex items-center mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                                />
                              ))}
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                              {review.comment}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TutorDetail;
