
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Download,
  MoreVertical,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Define session interface
interface Session {
  id: number;
  subject: string;
  tutor: string;
  student: string;
  date: string;
  time: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  duration: string;
}

// Mock data for sessions
const mockSessions: Session[] = [
  {
    id: 1,
    subject: "Advanced Mathematics",
    tutor: "Dr. Richard Wilson",
    student: "Jessica Chen",
    date: "2025-05-05",
    time: "14:00",
    status: "Scheduled",
    duration: "60 min"
  },
  {
    id: 2,
    subject: "Computer Science",
    tutor: "Prof. Sarah Johnson",
    student: "Michael Brown",
    date: "2025-05-06",
    time: "10:30",
    status: "Scheduled",
    duration: "90 min"
  },
  {
    id: 3,
    subject: "Physics",
    tutor: "Dr. David Smith",
    student: "Emily Wilson",
    date: "2025-04-28",
    time: "16:00",
    status: "Completed",
    duration: "60 min"
  },
  {
    id: 4,
    subject: "English Literature",
    tutor: "Prof. Laura Adams",
    student: "James Taylor",
    date: "2025-04-27",
    time: "11:00",
    status: "Cancelled",
    duration: "45 min"
  },
  {
    id: 5,
    subject: "Biology",
    tutor: "Dr. Maria Garcia",
    student: "Anna Johnson",
    date: "2025-05-07",
    time: "13:30",
    status: "Scheduled",
    duration: "60 min"
  },
  {
    id: 6,
    subject: "Chemistry",
    tutor: "Prof. John Miller",
    student: "Robert Wilson",
    date: "2025-04-26",
    time: "09:00",
    status: "Completed",
    duration: "120 min"
  }
];

const AdminSessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Filter sessions based on search term
  const filteredSessions = sessions.filter(session => 
    session.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.tutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle session cancellation
  const handleCancelSession = (id: number) => {
    setSessions(sessions.map(session => 
      session.id === id ? { ...session, status: "Cancelled" } : session
    ));
    toast({
      title: "Session cancelled",
      description: `Session #${id} has been cancelled.`,
    });
  };

  // Handle session export (mock functionality)
  const handleExportSessions = () => {
    toast({
      title: "Export initiated",
      description: "Sessions data is being exported to CSV.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sessions Management</h1>
          <p className="text-muted-foreground">Manage and monitor all tutoring sessions</p>
        </div>
        <Button onClick={handleExportSessions} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Sessions
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Input
            placeholder="Search by subject, tutor, or student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-3"
          />
        </div>
      </div>

      <Table>
        <TableCaption>List of all tutoring sessions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Tutor</TableHead>
            <TableHead>Student</TableHead>
            <TableHead className="hidden md:table-cell">Date & Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">{session.subject}</TableCell>
              <TableCell>{session.tutor}</TableCell>
              <TableCell>{session.student}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3 w-3" /> {session.date}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" /> {session.time}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    session.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                    session.status === "Scheduled" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }
                >
                  {session.status}
                </Badge>
              </TableCell>
              <TableCell>{session.duration}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white dark:bg-slate-900">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      View details
                    </DropdownMenuItem>
                    {session.status === "Scheduled" && (
                      <DropdownMenuItem 
                        className="flex items-center gap-2 text-red-600 dark:text-red-400"
                        onClick={() => handleCancelSession(session.id)}
                      >
                        <Calendar className="h-4 w-4" />
                        Cancel session
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminSessions;
