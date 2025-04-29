
import React from 'react';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-cote-light to-white dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cote-primary to-cote-secondary inline-block text-transparent bg-clip-text">
                Connect
              </span> with Expert Tutors in STEM Fields
            </h1>
            <p className="text-lg mb-8 text-slate-700 dark:text-slate-300 max-w-lg">
              Find qualified tutors specializing in college, technology, and engineering subjects. Learn from experts and excel in your studies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-cote-primary hover:bg-cote-secondary text-lg py-6" size="lg" asChild>
                <NavLink to="/find-tutors">Find a Tutor</NavLink>
              </Button>
              <Button variant="outline" size="lg" className="text-lg py-6" asChild>
                <NavLink to="/become-tutor">Become a Tutor</NavLink>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute top-4 -left-4 w-72 h-72 bg-cote-primary rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-light"></div>
              <div className="absolute bottom-4 -right-4 w-72 h-72 bg-cote-secondary rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-light animation-delay-2000"></div>
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Students studying together" 
                  className="w-full h-auto object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Expert-led tutoring sessions</h3>
                  <p className="text-slate-600 dark:text-slate-400">Find the perfect tutor for your specific subject and learning style.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
