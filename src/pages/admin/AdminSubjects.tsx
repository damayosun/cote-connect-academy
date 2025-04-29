
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
import { Badge } from '@/components/ui/badge';
import { Search, MoreVertical, PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock subject data
const subjects = [
  { id: 1, name: "Mathematics", category: "Science", tutorsCount: 15, studentsCount: 87 },
  { id: 2, name: "Physics", category: "Science", tutorsCount: 12, studentsCount: 64 },
  { id: 3, name: "Computer Science", category: "Technology", tutorsCount: 18, studentsCount: 112 },
  { id: 4, name: "Data Structures", category: "Technology", tutorsCount: 8, studentsCount: 76 },
  { id: 5, name: "Literature", category: "Humanities", tutorsCount: 6, studentsCount: 43 },
  { id: 6, name: "History", category: "Humanities", tutorsCount: 5, studentsCount: 38 },
  { id: 7, name: "Chemistry", category: "Science", tutorsCount: 9, studentsCount: 51 },
  { id: 8, name: "Electrical Engineering", category: "Engineering", tutorsCount: 7, studentsCount: 42 }
];

const AdminSubjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<typeof subjects[0] | null>(null);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectCategory, setNewSubjectCategory] = useState('');
  const { toast } = useToast();

  // Filter subjects based on search term
  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    subject.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubject = () => {
    // In a real app, this would call an API to add the subject
    toast({
      title: "Subject added",
      description: `${newSubjectName} has been added successfully.`,
    });
    setNewSubjectName('');
    setNewSubjectCategory('');
    setIsAddModalOpen(false);
  };

  const handleEditSubject = () => {
    // In a real app, this would call an API to edit the subject
    toast({
      title: "Subject updated",
      description: `Subject has been updated successfully.`,
    });
    setIsEditModalOpen(false);
  };

  const handleDelete = (subject: typeof subjects[0]) => {
    // In a real app, this would call an API to delete the subject
    toast({
      title: "Subject deleted",
      description: `${subject.name} has been removed from the system.`,
      variant: "destructive",
    });
  };

  const openEditModal = (subject: typeof subjects[0]) => {
    setSelectedSubject(subject);
    setNewSubjectName(subject.name);
    setNewSubjectCategory(subject.category);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Subjects Management</h1>
          <p className="text-muted-foreground">Manage academic subjects and categories</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Add New Subject</span>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search subjects..."
            className="pl-10 max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Tutors</TableHead>
              <TableHead>Students</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No subjects found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredSubjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell className="font-medium">{subject.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800">
                      {subject.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{subject.tutorsCount}</TableCell>
                  <TableCell>{subject.studentsCount}</TableCell>
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
                        <DropdownMenuItem onClick={() => openEditModal(subject)}>
                          Edit Subject
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View Tutors
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(subject)}
                        >
                          Delete Subject
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

      {/* Add Subject Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
            <DialogDescription>
              Create a new subject for tutors to teach and students to learn.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="subject-name">Subject Name</Label>
              <Input
                id="subject-name"
                placeholder="e.g., Calculus"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject-category">Category</Label>
              <Input
                id="subject-category"
                placeholder="e.g., Mathematics"
                value={newSubjectCategory}
                onChange={(e) => setNewSubjectCategory(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddSubject}
              disabled={!newSubjectName || !newSubjectCategory}
            >
              Add Subject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Subject Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
            <DialogDescription>
              Update the subject details.
            </DialogDescription>
          </DialogHeader>
          {selectedSubject && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-subject-name">Subject Name</Label>
                <Input
                  id="edit-subject-name"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-subject-category">Category</Label>
                <Input
                  id="edit-subject-category"
                  value={newSubjectCategory}
                  onChange={(e) => setNewSubjectCategory(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tutors:</p>
                  <p>{selectedSubject.tutorsCount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Students:</p>
                  <p>{selectedSubject.studentsCount}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEditSubject}
              disabled={!newSubjectName || !newSubjectCategory}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSubjects;
