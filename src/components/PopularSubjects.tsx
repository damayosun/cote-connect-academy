
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const subjects = [
  {
    id: 1,
    name: "Computer Science",
    topics: ["Programming", "Data Structures", "Algorithms"],
    icon: "💻",
  },
  {
    id: 2,
    name: "Electrical Engineering",
    topics: ["Circuit Design", "Electronics", "Power Systems"],
    icon: "⚡",
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    topics: ["Mechanics", "Thermodynamics", "Fluid Dynamics"],
    icon: "⚙️",
  },
  {
    id: 4,
    name: "Mathematics",
    topics: ["Calculus", "Linear Algebra", "Statistics"],
    icon: "🧮",
  },
  {
    id: 5,
    name: "Physics",
    topics: ["Mechanics", "Electromagnetism", "Quantum Physics"],
    icon: "🔭",
  },
  {
    id: 6,
    name: "Chemical Engineering",
    topics: ["Thermodynamics", "Reaction Kinetics", "Process Design"],
    icon: "🧪",
  },
];

const PopularSubjects: React.FC = () => {
  return (
    <div className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Popular Subjects</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
          Browse through our most sought-after subjects and find expert tutors 
          specializing in your area of interest.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <NavLink key={subject.id} to={`/find-tutors?subject=${encodeURIComponent(subject.name)}`}>
              <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <span className="text-4xl mr-4">{subject.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{subject.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.map((topic, index) => (
                          <span 
                            key={index} 
                            className="bg-cote-light dark:bg-slate-800 text-cote-primary dark:text-cote-light text-xs px-2 py-1 rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularSubjects;
