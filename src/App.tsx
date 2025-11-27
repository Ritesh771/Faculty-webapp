
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { NoInternetCard } from "@/components/ui/NoInternetCard";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import LoginPage from "./pages/auth/LoginPage";
import OTPPage from "./pages/auth/OTPPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import Dashboard from "./pages/Dashboard";
import AttendancePage from "./pages/AttendancePage";
import NotFound from "./pages/NotFound";
import RankPage from "./pages/RankPage";
import MaterialsPage from "./pages/MaterialsPage";
import ChatPage from "./pages/ChatPage";
import GradesPage from "./pages/GradesPage";
import SettingsPage from "./pages/SettingsPage";
import UsersPage from "./pages/UsersPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import FacultyPage from "./pages/FacultyPage";
import StudentsPage from "./pages/StudentsPage";
import CoursesPage from "./pages/CoursesPage";
import EnrollUserPage from "./pages/EnrollUserPage";
import BulkUploadPage from "./pages/BulkUploadPage";
import BranchesPage from "./pages/BranchesPage";
import NotificationsPage from "./pages/NotificationsPage";
import HODLeavesPage from "./pages/HODLeavesPage";
import ProfilePage from "./pages/ProfilePage";
import LowAttendancePage from "./pages/LowAttendancePage";
import AcademicStructurePage from "./pages/AcademicStructurePage";
import FacultyAssignmentsPage from "./pages/FacultyAssignmentsPage";
import TimetablePage from "./pages/TimetablePage";
import NoticesPage from "./pages/NoticesPage";
import ProctorsPage from "./pages/ProctorsPage";
import PerformancePage from "./pages/PerformancePage";
import TakeAttendancePage from "./pages/TakeAttendancePage";
import UploadMarksPage from "./pages/UploadMarksPage";
import ApplyLeavePage from "./pages/ApplyLeavePage";
import AttendanceRecordsPage from "./pages/AttendanceRecordsPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import ProctorStudentsPage from "./pages/ProctorStudentsPage";
import ManageStudentLeavePage from "./pages/ManageStudentLeavePage";
import ScheduleMentoringPage from "./pages/ScheduleMentoringPage";
import GenerateStatisticsPage from "./pages/GenerateStatisticsPage";
import WeeklySchedulePage from "./pages/WeeklySchedulePage";
import InternalMarksPage from "./pages/InternalMarksPage";
import LeaveRequestPage from "./pages/LeaveRequestPage";
import LeaveStatusPage from "./pages/LeaveStatusPage";
import CertificatesPage from "./pages/CertificatesPage";
import FaceRecognitionPage from "./pages/FaceRecognitionPage";
import StudentInfoScanner from "./pages/StudentInfoScanner";

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
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <ScrollToTop />
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
                    <Route path="student-info-scanner" element={<StudentInfoScanner />} />
                  </Route>
                  
                  {/* Catch all 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <NoInternetCard />
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
  );
};

export default App;
