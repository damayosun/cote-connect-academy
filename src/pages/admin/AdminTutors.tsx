
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

const tutors = [
  {
    id: 1,
    name: "Dr. John Smith",
    email: "john.smith@example.com",
    subjects: ["Mathematics", "Physics"],
    status: "Verified",
    joined: "Apr 23, 2023"
  },
  {
    id: 2,
    name: "Prof. Sarah Johnson",
    email: "sarah.j@example.com",
    subjects: ["Computer Science", "Data Structures"],
    status: "Pending",
    joined: "May 12, 2023"
  },
  {
    id: 3,
    name: "Dr. Michael Wong",
    email: "michael.w@example.com",
    subjects: ["Chemistry", "Biology"],
    status: "Verified",
    joined: "Mar 05, 2023"
  },
  {
    id: 4,
    name: "Prof. Emily Davis",
    email: "emily.d@example.com",
    subjects: ["Literature", "History"],
    status: "Suspended",
    joined: "Jan 17, 2023"
  },
  {
    id: 5,
    name: "Dr. Robert Chen",
    email: "robert.c@example.com",
    subjects: ["Electrical Engineering", "Physics"],
    status: "Pending",
    joined: "Jun 09, 2023"
  }
];

const AdminTutors: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tutors Management</h1>
          <p className="text-muted-foreground">Manage and verify tutor accounts</p>
        </div>
        <Button>Add New Tutor</Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tutors..."
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
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
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
              <TableHead>Subjects</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tutors.map((tutor) => (
              <TableRow key={tutor.id}>
                <TableCell className="font-medium">{tutor.name}</TableCell>
                <TableCell>{tutor.email}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {tutor.subjects.map((subject, i) => (
                      <Badge key={i} variant="outline" className="bg-slate-100 dark:bg-slate-800">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={tutor.status === "Verified" ? "default" : 
                             tutor.status === "Pending" ? "secondary" : 
                             "destructive"}
                    className={tutor.status === "Verified" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                              tutor.status === "Pending" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : 
                              "bg-red-100 text-red-800 hover:bg-red-100"}
                  >
                    {tutor.status}
                  </Badge>
                </TableCell>
                <TableCell>{tutor.joined}</TableCell>
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
                      <DropdownMenuItem>Verify Account</DropdownMenuItem>
                      <DropdownMenuItem>Suspend Account</DropdownMenuItem>
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

export default AdminTutors;
