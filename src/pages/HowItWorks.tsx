
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar, Book, Star, MessageCircle, Shield } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const steps = [
  {
    id: 1,
    title: "Find Your Tutor",
    description: "Browse through our extensive list of qualified tutors and find the perfect match for your subject.",
    icon: <Search className="w-8 h-8 text-cote-primary" />,
    details: [
      "Use filters to narrow down tutors by subject, price range, and availability",
      "View detailed tutor profiles, credentials, and student reviews",
      "Compare tutors side by side to find your ideal match"
    ]
  },
  {
    id: 2,
    title: "Book a Session",
    description: "Select a convenient time slot and book your session with just a few clicks.",
    icon: <Calendar className="w-8 h-8 text-cote-primary" />,
    details: [
      "Check tutor availability in real-time",
      "Choose between one-time sessions or recurring appointments",
      "Select your preferred lesson format (online or in-person)"
    ]
  },
  {
    id: 3,
    title: "Learn & Improve",
    description: "Join your personalized tutoring session and enhance your knowledge in the subject.",
    icon: <Book className="w-8 h-8 text-cote-primary" />,
    details: [
      "Access your virtual classroom with integrated tools",
      "Share documents, screens, and educational resources",
      "Get personalized guidance tailored to your learning style"
    ]
  },
  {
    id: 4,
    title: "Rate & Review",
    description: "Share your experience and help other students find the best tutors for their needs.",
    icon: <Star className="w-8 h-8 text-cote-primary" />,
    details: [
      "Provide detailed feedback about your tutoring experience",
      "Rate tutors on knowledge, communication, and teaching style",
      "Help build our community of quality education"
    ]
  },
];

const features = [
  {
    title: "Verified Tutors",
    description: "All tutors undergo thorough verification of their credentials and expertise.",
    icon: <Shield className="w-12 h-12 text-cote-primary" />
  },
  {
    title: "Instant Messaging",
    description: "Communicate with tutors before booking to discuss your learning needs.",
    icon: <MessageCircle className="w-12 h-12 text-cote-primary" />
  },
  {
    title: "Flexible Scheduling",
    description: "Find sessions that work with your busy schedule, any time of day.",
    icon: <Calendar className="w-12 h-12 text-cote-primary" />
  },
];

const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-cote-primary to-cote-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How COTE-Tutorials Works</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Our platform makes it easy to connect with expert tutors in college, technology, and engineering subjects. 
              Follow these simple steps to start your learning journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline" className="bg-white text-cote-primary hover:bg-gray-100 hover:text-cote-secondary">
                <NavLink to="/find-tutors">Find a Tutor</NavLink>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white hover:bg-white/10">
                <NavLink to="/register">Create Account</NavLink>
              </Button>
            </div>
          </div>
        </section>

        {/* Step-by-Step Process */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center text-3xl font-bold mb-4">Getting Started is Easy</h2>
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
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {step.description}
                  </p>
                  <ul className="text-left text-sm space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-cote-primary mr-2">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild className="bg-cote-primary hover:bg-cote-secondary">
                <NavLink to="/find-tutors">Get Started Now</NavLink>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Platform Features</h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              Discover all the tools and features designed to make your tutoring experience seamless.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              Get answers to common questions about our tutoring platform.
            </p>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How much do tutoring sessions cost?",
                  answer: "Tutoring rates vary by tutor, subject, and session length. Tutors set their own rates, which are clearly displayed on their profiles. You can filter tutors by price range to find options that fit your budget."
                },
                {
                  question: "How are tutors verified?",
                  answer: "All tutors undergo a thorough verification process that includes credential verification, background checks, and teaching demonstrations. We verify educational qualifications and teaching experience to ensure high-quality instruction."
                },
                {
                  question: "Can I cancel or reschedule a session?",
                  answer: "Yes, you can cancel or reschedule sessions through your account. Please note that cancellation policies vary by tutor, and some may require notice at least 24 hours before the scheduled session."
                },
                {
                  question: "What subjects are offered?",
                  answer: "We offer tutoring across a wide range of college, technology, and engineering subjects, including mathematics, computer science, physics, electrical engineering, mechanical engineering, and many more specialized fields."
                },
                {
                  question: "How do online sessions work?",
                  answer: "Online sessions take place in our integrated virtual classroom that includes video conferencing, screen sharing, a digital whiteboard, and document sharing. You'll receive a link to join your session at the scheduled time."
                }
              ].map((item, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 className="text-xl font-medium mb-2">{item.question}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Still have questions? We're here to help!
              </p>
              <Button asChild variant="outline">
                <NavLink to="/contact">Contact Support</NavLink>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-cote-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join thousands of students who are already improving their skills with COTE-Tutorials.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline" className="bg-white text-cote-primary hover:bg-gray-100">
                <NavLink to="/find-tutors">Find a Tutor</NavLink>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white hover:bg-white/10 border-white">
                <NavLink to="/become-tutor">Become a Tutor</NavLink>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
