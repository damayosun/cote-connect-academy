
import React from 'react';
import { useForm } from 'react-hook-form';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Upload, GraduationCap, DollarSign, Calendar } from 'lucide-react';

const benefits = [
  {
    title: "Flexible Schedule",
    description: "Set your own hours and work when it fits your schedule.",
    icon: <Calendar className="w-8 h-8 text-cote-primary" />,
  },
  {
    title: "Competitive Pay",
    description: "Set your own rates and earn competitive income for sharing your expertise.",
    icon: <DollarSign className="w-8 h-8 text-cote-primary" />,
  },
  {
    title: "Professional Growth",
    description: "Expand your teaching experience and build your professional portfolio.",
    icon: <GraduationCap className="w-8 h-8 text-cote-primary" />,
  },
];

const BecomeTutor: React.FC = () => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      experience: '',
      education: '',
      bio: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    toast({
      title: "Application Submitted",
      description: "We've received your tutor application. Our team will review it and contact you soon.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-cote-primary to-cote-secondary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Share Your Knowledge. Inspire Students.</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join our community of expert tutors and help students excel in college, technology, and engineering subjects.
            </p>
            <Button
              variant="outline"
              className="bg-white text-cote-primary hover:bg-gray-100 hover:text-cote-secondary text-lg py-6 px-8"
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Apply Now
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Why Become a COTE Tutor?</h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              Joining our platform offers you numerous benefits and opportunities to grow as an educator.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-cote-light dark:bg-slate-800 rounded-full">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16 bg-gray-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Requirements</h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              We maintain high standards for our tutors to ensure quality education for all students.
            </p>

            <div className="max-w-3xl mx-auto">
              <ul className="space-y-6">
                {[
                  "Bachelor's degree or higher in your field of expertise",
                  "At least 2 years of teaching or tutoring experience",
                  "Strong communication skills and passion for teaching",
                  "Verifiable credentials and references",
                  "Reliable internet connection for online sessions",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-cote-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="application-form" className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Apply to Become a Tutor</h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              Fill out the form below to start your journey as a COTE tutor.
            </p>

            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Computer Science, Engineering, Mathematics, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teaching Experience</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Describe your teaching or tutoring experience..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="education"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Educational Background</FormLabel>
                            <FormControl>
                              <Textarea placeholder="List your degrees, certifications, and relevant education..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Tell students about yourself and your teaching philosophy..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="border border-dashed border-gray-300 rounded-lg p-6">
                        <div className="flex flex-col items-center text-center">
                          <Upload className="w-10 h-10 text-gray-400 mb-2" />
                          <h3 className="font-medium mb-1">Upload Credentials</h3>
                          <p className="text-sm text-gray-500 mb-4">
                            Drag and drop your resume, certificates, and other credentials here
                          </p>
                          <Button variant="outline" className="bg-white">Browse Files</Button>
                          <p className="text-xs text-gray-500 mt-3">
                            PDF, JPG, or PNG files. Maximum size: 10MB each.
                          </p>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-cote-primary hover:bg-cote-secondary text-lg py-6"
                      >
                        Submit Application
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 bg-gray-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Application Process</h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              Here's what to expect after submitting your application
            </p>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 h-full w-0.5 bg-cote-primary hidden md:block"></div>
                
                <div className="space-y-12">
                  {[
                    {
                      step: 1,
                      title: "Submit Application",
                      description: "Fill out the form with your personal details, qualifications, and teaching experience."
                    },
                    {
                      step: 2,
                      title: "Application Review",
                      description: "Our team will review your application, credentials, and verify your information."
                    },
                    {
                      step: 3,
                      title: "Interview",
                      description: "Selected candidates will be invited for a virtual interview and teaching demonstration."
                    },
                    {
                      step: 4,
                      title: "Background Check",
                      description: "We'll verify your identity, credentials, and background for security purposes."
                    },
                    {
                      step: 5,
                      title: "Profile Activation",
                      description: "Once approved, you'll set up your tutor profile and start receiving booking requests!"
                    }
                  ].map((item) => (
                    <div key={item.step} className="flex">
                      <div className="flex-shrink-0 relative">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cote-primary text-white font-bold text-lg z-10 relative">
                          {item.step}
                        </div>
                      </div>
                      <div className="ml-8">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BecomeTutor;
