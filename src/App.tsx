
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import Index from "./pages/Index";
import LoginPage from "./pages/auth/LoginPage";
import OTPPage from "./pages/auth/OTPPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import TimetablePage from "./pages/TimetablePage";
import TakeAttendancePage from "./pages/TakeAttendancePage";
import UploadMarksPage from "./pages/UploadMarksPage";
import ApplyLeavePage from "./pages/ApplyLeavePage";
import AttendanceRecordsPage from "./pages/AttendanceRecordsPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import ProctorStudentsPage from "./pages/ProctorStudentsPage";
import ManageStudentLeavePage from "./pages/ManageStudentLeavePage";
import ScheduleMentoringPage from "./pages/ScheduleMentoringPage";
import GenerateStatisticsPage from "./pages/GenerateStatisticsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

console.log('App component loading...');

const App = () => {
  console.log('App component rendering...');
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/otp" element={<OTPPage />} />
              <Route path="/auth/forgot" element={<ForgotPasswordPage />} />
              <Route path="/auth/reset" element={<ResetPasswordPage />} />
              
              {/* Dashboard routes - protected by DashboardLayout */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                
                {/* Faculty routes */}
                <Route path="take-attendance" element={<TakeAttendancePage />} />
                <Route path="upload-marks" element={<UploadMarksPage />} />
                <Route path="apply-leave" element={<ApplyLeavePage />} />
                <Route path="attendance-records" element={<AttendanceRecordsPage />} />
                <Route path="announcements" element={<AnnouncementsPage />} />
                <Route path="proctor-students" element={<ProctorStudentsPage />} />
                <Route path="manage-student-leave" element={<ManageStudentLeavePage />} />
                <Route path="schedule-mentoring" element={<ScheduleMentoringPage />} />
                <Route path="generate-statistics" element={<GenerateStatisticsPage />} />
                <Route path="timetable" element={<TimetablePage />} />
                <Route path="chat" element={<ChatPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              
              {/* Catch all 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
