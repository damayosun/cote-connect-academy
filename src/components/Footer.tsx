
import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4 bg-gradient-to-r from-cote-primary to-cote-secondary inline-block text-transparent bg-clip-text">
              COTE-Tutorials
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Connecting students with expert tutors in college, technology, and engineering fields.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">For Students</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/find-tutors" className="text-slate-600 dark:text-slate-400 hover:text-cote-primary dark:hover:text-cote-primary">
                  Find Tutors
                </NavLink>
              </li>
              <li>
                <NavLink to="/how-it-works" className="text-slate-600 dark:text-slate-400 hover:text-cote-primary dark:hover:text-cote-primary">
                  How It Works
                </NavLink>
              </li>
              <li>
                <NavLink to="/subjects" className="text-slate-600 dark:text-slate-400 hover:text-cote-primary dark:hover:text-cote-primary">
                  Browse Subjects
                </NavLink>
              </li>
              <li>
                <NavLink to="/student-resources" className="text-slate-600 dark:text-slate-400 hover:text-cote-primary dark:hover:text-cote-primary">
                  Resources
                </NavLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">For Tutors</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/become-tutor" className="text-slate-600 dark:text-slate-400 hover:text-cote-primary dark:hover:text-cote-primary">
                  Become a Tutor
                </NavLink>
              </li>
              <li>
                <NavLink to="/tutor-requirements" className="text-slate-600 dark:text-slate-400 hover:text-cote-primary dark:hover:text-cote-primary">
                  Requirements
                </NavLink>
              </li>
              <li>
                <NavLink to="/tutor-faqs" className="text-slate-600 dark:text-slate-400 hover:text-cote-primary dark:hover:text-cote-primary">
                  FAQs for Tutors
                </NavLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/about" className="text-slate-600 dark:text-slate-400 hover:text-cote-primary dark:hover:text-cote-primary">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-cote-primary dark:hover:text-cote-primary">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/privacy" className="text-slate-600 dark:text-slate-400 hover:text-cote-primary dark:hover:text-cote-primary">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms" className="text-slate-600 dark:text-slate-400 hover:text-cote-primary dark:hover:text-cote-primary">
                  Terms of Service
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6">
          <p className="text-center text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} COTE-Tutorials. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
