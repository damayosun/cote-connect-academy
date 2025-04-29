
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, User, Book, Calendar, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <NavLink to="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-cote-primary to-cote-secondary inline-block text-transparent bg-clip-text">
                COTE-Tutorials
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/find-tutors" 
              className={({ isActive }) => 
                cn("text-sm font-medium transition-colors hover:text-cote-primary", 
                isActive ? "text-cote-primary" : "text-slate-600 dark:text-slate-300")
              }
            >
              Find Tutors
            </NavLink>
            <NavLink 
              to="/how-it-works" 
              className={({ isActive }) => 
                cn("text-sm font-medium transition-colors hover:text-cote-primary", 
                isActive ? "text-cote-primary" : "text-slate-600 dark:text-slate-300")
              }
            >
              How it Works
            </NavLink>
            <NavLink 
              to="/become-tutor" 
              className={({ isActive }) => 
                cn("text-sm font-medium transition-colors hover:text-cote-primary", 
                isActive ? "text-cote-primary" : "text-slate-600 dark:text-slate-300")
              }
            >
              Become a Tutor
            </NavLink>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <NavLink to="/login">Sign In</NavLink>
              </Button>
              <Button className="bg-cote-primary hover:bg-cote-secondary" asChild>
                <NavLink to="/register">Sign Up</NavLink>
              </Button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-200 dark:border-gray-800">
            <nav className="flex flex-col space-y-3">
              <NavLink 
                to="/find-tutors" 
                className="px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Tutors
              </NavLink>
              <NavLink 
                to="/how-it-works" 
                className="px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </NavLink>
              <NavLink 
                to="/become-tutor" 
                className="px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Become a Tutor
              </NavLink>
              <div className="flex flex-col space-y-3 pt-2">
                <Button variant="outline" className="justify-center" asChild>
                  <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </NavLink>
                </Button>
                <Button className="justify-center bg-cote-primary hover:bg-cote-secondary" asChild>
                  <NavLink to="/register" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </NavLink>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
