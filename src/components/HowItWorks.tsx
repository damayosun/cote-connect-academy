
import React from 'react';
import { Search, Calendar, Star, Book } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Find Your Tutor",
    description: "Browse through our extensive list of qualified tutors and find the perfect match for your subject.",
    icon: <Search className="w-8 h-8 text-cote-primary" />,
  },
  {
    id: 2,
    title: "Book a Session",
    description: "Select a convenient time slot and book your session with just a few clicks.",
    icon: <Calendar className="w-8 h-8 text-cote-primary" />,
  },
  {
    id: 3,
    title: "Learn & Improve",
    description: "Join your personalized tutoring session and enhance your knowledge in the subject.",
    icon: <Book className="w-8 h-8 text-cote-primary" />,
  },
  {
    id: 4,
    title: "Rate & Review",
    description: "Share your experience and help other students find the best tutors for their needs.",
    icon: <Star className="w-8 h-8 text-cote-primary" />,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <div className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">How It Works</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
          COTE-Tutorials makes it easy to connect with expert tutors and enhance your learning journey.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-cote-light dark:bg-slate-800 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <div className="relative mb-4">
                <span className="absolute -top-10 -left-2 text-6xl font-bold text-gray-100 dark:text-gray-800 z-0">
                  {step.id}
                </span>
                <h3 className="text-xl font-bold relative z-10">{step.title}</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
