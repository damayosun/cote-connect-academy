
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Search, MoreVertical, Filter } from 'lucide-react';

const students = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.j@example.com",
    sessions: 12,
    status: "Active",
    joined: "Feb 15, 2023"
  },
  {
    id: 2,
    name: "Madison Lee",
    email: "madison.l@example.com",
    sessions: 8,
    status: "Active",
    joined: "Mar 22, 2023"
  },
  {
    id: 3,
    name: "Tyler Williams",
    email: "tyler.w@example.com",
    sessions: 0,
    status: "New",
    joined: "Apr 10, 2023"
  },
  {
    id: 4,
    name: "Jordan Smith",
    email: "jordan.s@example.com",
    sessions: 3,
    status: "Active",
    joined: "Jan 05, 2023"
  },
  {
    id: 5,
    name: "Casey Miller",
    email: "casey.m@example.com",
    sessions: 5,
    status: "Inactive",
    joined: "Nov 29, 2022"
  }
];

const AdminStudents: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students Management</h1>
          <p className="text-muted-foreground">Manage student accounts and activities</p>
        </div>
        <Button>Add New Student</Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search students..."
            className="pl-10 max-w-xs"
          />
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Sessions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.sessions}</TableCell>
                <TableCell>
                  <Badge 
                    variant={student.status === "Active" ? "default" : 
                             student.status === "New" ? "secondary" : 
                             "outline"}
                    className={student.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                              student.status === "New" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
                              "bg-gray-100 text-gray-800 hover:bg-gray-100"}
                  >
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell>{student.joined}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>View Sessions</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete Account</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminStudents;
