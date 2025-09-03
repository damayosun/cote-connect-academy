
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import FindTutors from "./pages/FindTutors";
import TutorDetail from "./pages/TutorDetail";
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import NotFound from "./pages/NotFound";
import BecomeTutor from "./pages/BecomeTutor";
import HowItWorks from "./pages/HowItWorks";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTutors from "./pages/admin/AdminTutors";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminSubjects from "./pages/admin/AdminSubjects";
import AdminSessions from "./pages/admin/AdminSessions";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminLayout from "./pages/admin/AdminLayout";
import TutorDashboard from "./pages/tutor/TutorDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/find-tutors" element={<FindTutors />} />
            <Route path="/tutors/:id" element={<TutorDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/become-tutor" element={<BecomeTutor />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            
            {/* Student Routes */}
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Tutor Routes */}
            <Route 
              path="/tutor/dashboard" 
              element={
                <ProtectedRoute requiredRole="tutor">
                  <TutorDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="tutors" element={<AdminTutors />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="subjects" element={<AdminSubjects />} />
              <Route path="sessions" element={<AdminSessions />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
