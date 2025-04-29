
import React from 'react';
import DashboardNav from '@/components/DashboardNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Bell } from 'lucide-react';

// Mock data for upcoming sessions
const upcomingSessions = [
  {
    id: 1,
    tutorName: "Dr. Alex Chen",
    subject: "Computer Science",
    date: "April 30, 2025",
    time: "10:00 AM - 11:00 AM",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    tutorName: "Prof. Sarah Johnson",
    subject: "Electrical Engineering",
    date: "May 3, 2025",
    time: "2:00 PM - 3:30 PM",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  },
];

// Mock data for notifications
const notifications = [
  {
    id: 1,
    message: "Your session with Dr. Alex Chen has been confirmed.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    message: "Prof. Sarah Johnson accepted your session request.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 3,
    message: "Don't forget to leave feedback for your completed session.",
    time: "2 days ago",
    read: true,
  },
];

// Mock data for recommended tutors
const recommendedTutors = [
  {
    id: 3,
    name: "Dr. Michael Taylor",
    subjects: ["Mathematics", "Statistics"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    price: 50,
  },
  {
    id: 5,
    name: "Dr. James Wilson",
    subjects: ["Mechanical Engineering", "Physics"],
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    price: 52,
  },
];

const StudentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-900 shadow-sm py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-cote-primary to-cote-secondary inline-block text-transparent bg-clip-text">
              COTE-Tutorials
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-sm font-medium">
                JS
              </div>
              <span className="ml-2 font-medium text-sm hidden md:inline-block">John Smith</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-col md:flex-row container mx-auto px-4 py-6 flex-grow">
        <aside className="md:w-64 mb-6 md:mb-0 md:mr-6">
          <DashboardNav userType="student" />
        </aside>
        
        <main className="flex-grow">
          <h1 className="text-2xl font-bold mb-6">Welcome, John!</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Sessions */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Upcoming Sessions
                  </CardTitle>
                </CardHeader>
                {upcomingSessions.length > 0 ? (
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div 
                          key={session.id} 
                          className="flex items-center p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                        >
                          <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                            <img 
                              src={session.image} 
                              alt={session.tutorName} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium">{session.tutorName}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {session.subject}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{session.date}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center justify-end">
                              <Clock className="h-3 w-3 mr-1" />
                              {session.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" className="text-cote-primary">
                        View All Sessions
                      </Button>
                    </div>
                  </CardContent>
                ) : (
                  <CardContent>
                    <div className="text-center py-6">
                      <p className="text-slate-600 dark:text-slate-400">
                        No upcoming sessions. Book a tutor to get started!
                      </p>
                      <Button className="mt-4 bg-cote-primary hover:bg-cote-secondary">
                        Find a Tutor
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
              
              {/* Recommended Tutors */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Tutors</CardTitle>
                  <CardDescription>Based on your subjects of interest</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {recommendedTutors.map((tutor) => (
                      <div 
                        key={tutor.id} 
                        className="flex p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                      >
                        <div className="h-14 w-14 rounded-full overflow-hidden mr-4 shrink-0">
                          <img 
                            src={tutor.image} 
                            alt={tutor.name} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{tutor.name}</h3>
                          <div className="flex items-center text-xs text-yellow-500 mb-1">
                            ★ {tutor.rating}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {tutor.subjects.map((subject, index) => (
                              <span 
                                key={index} 
                                className="bg-cote-light dark:bg-slate-700 text-cote-primary dark:text-cote-light text-xs px-2 py-0.5 rounded-full"
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="text-cote-primary">
                      View More Tutors
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Notifications */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-3 rounded-lg ${notification.read 
                          ? 'bg-white dark:bg-slate-800' 
                          : 'bg-cote-light/50 dark:bg-slate-800/80 border-l-4 border-cote-primary'}`}
                      >
                        <p className="text-sm mb-1">{notification.message}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="text-cote-primary" size="sm">
                      View All Notifications
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
