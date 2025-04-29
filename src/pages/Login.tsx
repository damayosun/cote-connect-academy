
import React from 'react';
import { NavLink } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login Successful",
      description: "Welcome back to COTE-Tutorials!",
    });
    // In a real app, you would handle authentication here
  };

  const handleRegistration = (e: React.FormEvent, userType: string) => {
    e.preventDefault();
    toast({
      title: "Registration Successful",
      description: `Your ${userType} account has been created.`,
    });
    // In a real app, you would handle registration here
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
                        <Input id="email" type="email" placeholder="your@email.com" required />
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
                        <Input id="password" type="password" required />
                      </div>
                      <Button type="submit" className="w-full bg-cote-primary hover:bg-cote-secondary">
                        Sign In
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
                              <Input id="firstName" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input id="lastName" required />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="studentEmail">Email</Label>
                            <Input id="studentEmail" type="email" placeholder="your@email.com" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="studentPassword">Password</Label>
                            <Input id="studentPassword" type="password" required />
                          </div>
                          <Button type="submit" className="w-full bg-cote-primary hover:bg-cote-secondary">
                            Create Student Account
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
                              <Input id="tutorFirstName" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="tutorLastName">Last Name</Label>
                              <Input id="tutorLastName" required />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tutorEmail">Email</Label>
                            <Input id="tutorEmail" type="email" placeholder="your@email.com" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tutorPassword">Password</Label>
                            <Input id="tutorPassword" type="password" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tutorSubjects">Subjects (comma separated)</Label>
                            <Input 
                              id="tutorSubjects" 
                              placeholder="Computer Science, Data Science, etc."
                              required 
                            />
                          </div>
                          <Button type="submit" className="w-full bg-cote-primary hover:bg-cote-secondary">
                            Create Tutor Account
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
