
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, CalendarCheck, Activity } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock stats data
  const stats = [
    { id: 1, title: 'Total Students', value: '456', icon: <Users className="h-5 w-5 text-blue-500" />, change: '+5.2%', trend: 'up' },
    { id: 2, title: 'Active Tutors', value: '128', icon: <GraduationCap className="h-5 w-5 text-purple-500" />, change: '+12.3%', trend: 'up' },
    { id: 3, title: 'Sessions Booked', value: '1,024', icon: <CalendarCheck className="h-5 w-5 text-green-500" />, change: '+18.6%', trend: 'up' },
    { id: 4, title: 'Verification Pending', value: '24', icon: <Activity className="h-5 w-5 text-yellow-500" />, change: '-3.4%', trend: 'down' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of platform statistics and activities</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Tutor Applications</CardTitle>
            <CardDescription>Tutors awaiting verification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Dr. Richard Wilson</p>
                    <p className="text-sm text-muted-foreground">Ph.D in Computer Science</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="text-xs bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full">Pending</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest session bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Advanced Algorithms</p>
                    <p className="text-sm text-muted-foreground">Jessica Chen with Dr. Smith</p>
                  </div>
                  <div className="text-xs bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full">
                    Scheduled
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
