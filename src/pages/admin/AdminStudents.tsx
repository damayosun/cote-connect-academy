
import React, { useState } from 'react';
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
import { Search, MoreVertical, Filter, UserPlus } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  },
  {
    id: 6,
    name: "Riley Thompson",
    email: "riley.t@example.com",
    sessions: 2,
    status: "Active",
    joined: "May 18, 2023"
  },
  {
    id: 7,
    name: "Taylor Martin",
    email: "taylor.m@example.com",
    sessions: 0,
    status: "New",
    joined: "Jul 07, 2023"
  }
];

const AdminStudents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const { toast } = useToast();

  // Filter students based on search term and status filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const openViewModal = (student: typeof students[0]) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleStatusChange = (student: typeof students[0], newStatus: string) => {
    // In a real app, this would call an API to update the student status
    toast({
      title: "Status updated",
      description: `${student.name}'s status changed to ${newStatus}.`,
    });
  };

  const handleDelete = (student: typeof students[0]) => {
    // In a real app, this would call an API to delete the student
    toast({
      title: "Student deleted",
      description: `${student.name} has been removed from the system.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students Management</h1>
          <p className="text-muted-foreground">Manage student accounts and activities</p>
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Add New Student</span>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search students..."
            className="pl-10 max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <Select 
            defaultValue={statusFilter} 
            onValueChange={setStatusFilter}
          >
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
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No students found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
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
                        <DropdownMenuItem onClick={() => openViewModal(student)}>View Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openViewModal(student)}>View Sessions</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        {student.status !== "Active" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(student, "Active")}>Mark as Active</DropdownMenuItem>
                        )}
                        {student.status !== "Inactive" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(student, "Inactive")}>Mark as Inactive</DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => handleDelete(student)}
                        >
                          Delete Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Student Profile Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
            <DialogDescription>
              View detailed information about this student.
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name:</p>
                  <p>{selectedStudent.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email:</p>
                  <p>{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status:</p>
                  <Badge 
                    variant={selectedStudent.status === "Active" ? "default" : 
                            selectedStudent.status === "New" ? "secondary" : 
                            "outline"}
                    className={selectedStudent.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                              selectedStudent.status === "New" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
                              "bg-gray-100 text-gray-800 hover:bg-gray-100"}
                  >
                    {selectedStudent.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Joined:</p>
                  <p>{selectedStudent.joined}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Sessions History</h3>
                {selectedStudent.sessions > 0 ? (
                  <div className="border rounded-md p-3 bg-slate-50 dark:bg-slate-900">
                    <p className="text-sm mb-2">{selectedStudent.sessions} total sessions completed</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Advanced Algorithms with Dr. Smith</span>
                        <span className="text-muted-foreground">May 12, 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Structures with Prof. Johnson</span>
                        <span className="text-muted-foreground">Apr 28, 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Computer Networks with Dr. Chen</span>
                        <span className="text-muted-foreground">Apr 15, 2023</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No sessions completed yet.</p>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Close</Button>
            <Button>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStudents;
