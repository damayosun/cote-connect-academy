
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useRoleBasedRedirect } from '@/hooks/useRoleBasedRedirect';

const Login: React.FC = () => {
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    subjects: ''
  });
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // Will be handled by AuthProvider's role-based redirect
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(formData.email, formData.password);
    
    if (!error) {
      // Role-based redirect will be handled by auth context
      navigate('/');
    }
    
    setLoading(false);
  };

  const handleRegistration = async (e: React.FormEvent, userType: 'student' | 'tutor') => {
    e.preventDefault();
    setLoading(true);
    
    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      ...(userType === 'tutor' && { 
        subjects: formData.subjects.split(',').map(s => s.trim()) 
      })
    };

    const { error } = await signUp(formData.email, formData.password, userType, profileData);
    
    if (!error) {
      // User will need to verify email before redirect
      navigate('/login');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow py-12 bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
                  <CardDescription className="text-center">
                    Sign in to your COTE-Tutorials account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          placeholder="your@email.com" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <NavLink 
                            to="/forgot-password" 
                            className="text-xs text-cote-primary hover:underline"
                          >
                            Forgot Password?
                          </NavLink>
                        </div>
                        <Input 
                          id="password" 
                          name="password"
                          type="password" 
                          value={formData.password}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <Button type="submit" className="w-full bg-cote-primary hover:bg-cote-secondary" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <div className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <NavLink to="/register" className="text-cote-primary hover:underline">
                      Sign up
                    </NavLink>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
                  <CardDescription className="text-center">
                    Join COTE-Tutorials as a student or tutor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="student" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="student">Student</TabsTrigger>
                      <TabsTrigger value="tutor">Tutor</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="student">
                      <form onSubmit={(e) => handleRegistration(e, "student")}>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input 
                                id="firstName" 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required 
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input 
                                id="lastName" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required 
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="studentEmail">Email</Label>
                            <Input 
                              id="studentEmail" 
                              name="email"
                              type="email" 
                              placeholder="your@email.com" 
                              value={formData.email}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="studentPassword">Password</Label>
                            <Input 
                              id="studentPassword" 
                              name="password"
                              type="password" 
                              value={formData.password}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                          <Button type="submit" className="w-full bg-cote-primary hover:bg-cote-secondary" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create Student Account'}
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="tutor">
                      <form onSubmit={(e) => handleRegistration(e, "tutor")}>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="tutorFirstName">First Name</Label>
                              <Input 
                                id="tutorFirstName" 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required 
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="tutorLastName">Last Name</Label>
                              <Input 
                                id="tutorLastName" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required 
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tutorEmail">Email</Label>
                            <Input 
                              id="tutorEmail" 
                              name="email"
                              type="email" 
                              placeholder="your@email.com" 
                              value={formData.email}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tutorPassword">Password</Label>
                            <Input 
                              id="tutorPassword" 
                              name="password"
                              type="password" 
                              value={formData.password}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tutorSubjects">Subjects (comma separated)</Label>
                            <Input 
                              id="tutorSubjects" 
                              name="subjects"
                              placeholder="Computer Science, Data Science, etc."
                              value={formData.subjects}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                          <Button type="submit" className="w-full bg-cote-primary hover:bg-cote-secondary" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create Tutor Account'}
                          </Button>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            By registering as a tutor, you agree to our credential verification process.
                            You'll need to upload your qualifications in the next step.
                          </p>
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <NavLink to="/login" className="text-cote-primary hover:underline">
                      Sign in
                    </NavLink>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
