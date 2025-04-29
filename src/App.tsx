
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AdminLayout from "./pages/admin/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="tutors" element={<AdminTutors />} />
            <Route path="students" element={<AdminStudents />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
