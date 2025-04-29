
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const tutors = [
  {
    id: 1,
    name: "Dr. Alex Chen",
    subjects: ["Computer Science", "Data Science"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    price: 60,
  },
  {
    id: 2,
    name: "Prof. Sarah Johnson",
    subjects: ["Electrical Engineering", "Physics"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    price: 55,
  },
  {
    id: 3,
    name: "Dr. Michael Taylor",
    subjects: ["Mathematics", "Statistics"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    price: 50,
  },
  {
    id: 4,
    name: "Prof. Emily Rodriguez",
    subjects: ["Chemical Engineering", "Organic Chemistry"],
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    price: 58,
  },
];

const FeaturedTutors: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Featured Tutors</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
          Learn from our top-rated tutors with extensive experience and proven teaching methods.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.map((tutor) => (
            <Card key={tutor.id} className="tutor-card">
              <div className="relative pt-[100%]">
                <img 
                  src={tutor.image} 
                  alt={tutor.name} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4 flex flex-col flex-grow">
                <div className="mb-2 flex justify-between items-center">
                  <h3 className="font-bold">{tutor.name}</h3>
                  <div className="flex items-center bg-cote-primary/10 text-cote-primary rounded-full px-2 py-0.5 text-xs font-medium">
                    ★ {tutor.rating}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tutor.subjects.map((subject, index) => (
                    <span 
                      key={index} 
                      className="bg-cote-light dark:bg-slate-700 text-cote-primary dark:text-cote-light text-xs px-2 py-1 rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-cote-primary">${tutor.price}/hr</span>
                  <Button variant="outline" size="sm" asChild>
                    <NavLink to={`/tutors/${tutor.id}`}>View Profile</NavLink>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Button className="bg-cote-primary hover:bg-cote-secondary" size="lg" asChild>
            <NavLink to="/find-tutors">View All Tutors</NavLink>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTutors;
