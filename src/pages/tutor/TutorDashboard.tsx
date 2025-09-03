import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Users, BookOpen, Settings, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TutorApplication {
  id: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  bio: string;
  subjects: string[];
  rates: any;
  availability: any;
  submitted_at: string;
}

interface SessionRequest {
  id: string;
  student_id: string;
  subject: string;
  date_time: string;
  price: number;
  status: string;
  student_profile: any;
}

const TutorDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const [application, setApplication] = useState<TutorApplication | null>(null);
  const [sessionRequests, setSessionRequests] = useState<SessionRequest[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutorData();
  }, [userProfile?.id]);

  const fetchTutorData = async () => {
    if (!userProfile?.id) return;

    try {
      // Fetch tutor application
      const { data: appData, error: appError } = await supabase
        .from('tutor_applications')
        .select('*')
        .eq('user_id', userProfile.id)
        .single();

      if (appData) setApplication(appData);

      // Fetch session requests (pending sessions)
      const { data: requestsData, error: requestsError } = await supabase
        .from('sessions')
        .select(`
          *,
          student_profile:users!student_id(profile_data)
        `)
        .eq('tutor_id', userProfile.id)
        .eq('status', 'scheduled')
        .gte('date_time', new Date().toISOString());

      if (requestsData) setSessionRequests(requestsData);

      // Fetch upcoming sessions
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('sessions')
        .select(`
          *,
          student_profile:users!student_id(profile_data)
        `)
        .eq('tutor_id', userProfile.id)
        .in('status', ['scheduled'])
        .gte('date_time', new Date().toISOString())
        .order('date_time', { ascending: true });

      if (sessionsData) setUpcomingSessions(sessionsData);

    } catch (error) {
      console.error('Error fetching tutor data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard data"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSessionAction = async (sessionId: string, action: 'accept' | 'decline') => {
    try {
      const { error } = await supabase
        .from('sessions')
        .update({ 
          status: action === 'accept' ? 'scheduled' : 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId);

      if (error) throw error;

      toast({
        title: `Session ${action === 'accept' ? 'Accepted' : 'Declined'}`,
        description: `You have ${action}ed the session request.`
      });

      // Refresh data
      fetchTutorData();
    } catch (error) {
      console.error('Error updating session:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update session"
      });
    }
  };

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'under_review': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tutor Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {userProfile?.profile_data?.firstName || 'Tutor'}
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Application Status Card */}
        {application && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Application Status
                <Badge className={`${getApplicationStatusColor(application.status)} text-white`}>
                  {application.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {application.status === 'pending' && (
                <p className="text-muted-foreground">
                  Your application is being reviewed. We'll notify you once it's approved.
                </p>
              )}
              {application.status === 'approved' && (
                <p className="text-green-600">
                  Congratulations! Your application has been approved. You can now accept session requests.
                </p>
              )}
              {application.status === 'rejected' && (
                <div className="text-red-600">
                  <p>Your application was rejected. Please contact support for more information.</p>
                  <Button variant="outline" className="mt-2">
                    Resubmit Application
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Session Requests</CardTitle>
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sessionRequests.length}</div>
                  <p className="text-xs text-muted-foreground">Pending approval</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingSessions.length}</div>
                  <p className="text-xs text-muted-foreground">Next 7 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Active students</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <h3 className="text-lg font-semibold">Session Requests</h3>
            {sessionRequests.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">No pending session requests</p>
                </CardContent>
              </Card>
            ) : (
              sessionRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{request.subject}</h4>
                        <p className="text-sm text-muted-foreground">
                          Student: {request.student_profile?.profile_data?.firstName || 'Unknown'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {new Date(request.date_time).toLocaleString()}
                        </p>
                        <p className="text-sm font-medium">
                          ${request.price}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSessionAction(request.id, 'decline')}
                        >
                          Decline
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSessionAction(request.id, 'accept')}
                        >
                          Accept
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <h3 className="text-lg font-semibold">Upcoming Sessions</h3>
            {upcomingSessions.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">No upcoming sessions</p>
                </CardContent>
              </Card>
            ) : (
              upcomingSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{session.subject}</h4>
                        <p className="text-sm text-muted-foreground">
                          Student: {session.student_profile?.profile_data?.firstName || 'Unknown'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {new Date(session.date_time).toLocaleString()}
                        </p>
                      </div>
                      <Button size="sm">
                        Start Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Profile editing functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TutorDashboard;