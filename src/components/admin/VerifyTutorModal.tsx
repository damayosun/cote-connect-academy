
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface VerifyTutorModalProps {
  open: boolean;
  onClose: () => void;
  tutor: {
    id: number;
    name: string;
    email: string;
    subjects: string[];
    status: string;
    joined: string;
  } | null;
}

const VerifyTutorModal = ({ open, onClose, tutor }: VerifyTutorModalProps) => {
  const { toast } = useToast();
  
  const handleVerify = () => {
    // In a real app, this would call an API to verify the tutor
    toast({
      title: "Tutor verified",
      description: `${tutor?.name} has been successfully verified.`,
    });
    onClose();
  };
  
  const handleReject = () => {
    // In a real app, this would call an API to reject the tutor
    toast({
      title: "Tutor application rejected",
      description: `${tutor?.name}'s application has been rejected.`,
      variant: "destructive",
    });
    onClose();
  };

  if (!tutor) return null;
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Verify Tutor Application</DialogTitle>
          <DialogDescription>
            Review the tutor's credentials and information before approving or rejecting.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="grid gap-2">
            <h3 className="font-semibold">Tutor Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name:</p>
                <p>{tutor.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email:</p>
                <p>{tutor.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Status:</p>
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
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Joined:</p>
                <p>{tutor.joined}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Subjects</h3>
            <div className="flex flex-wrap gap-2">
              {tutor.subjects.map((subject, i) => (
                <Badge key={i} variant="outline" className="bg-slate-100 dark:bg-slate-800">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Credentials</h3>
            <div className="border p-4 rounded-md bg-slate-50 dark:bg-slate-900">
              <p className="text-sm text-muted-foreground">
                Placeholder for credential documents - In a production app, this would display
                uploaded certificates, degrees, and other verification documents.
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleReject}>Reject</Button>
          <Button onClick={handleVerify}>Approve</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyTutorModal;
