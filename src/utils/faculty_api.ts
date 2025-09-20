import { getApiBaseUrl } from "./config";
import { fetchWithTokenRefresh } from "./authService";

// Type definitions for request and response data
interface DashboardOverviewResponse {
  success: boolean;
  message?: string;
  data?: {
    today_classes: Array<{
      subject: string;
      section: string;
      start_time: string;
      end_time: string;
      room: string;
    }>;
    attendance_snapshot: number;
    quick_actions: string[];
  };
}

export interface TakeAttendanceRequest {
  branch_id: string;
  subject_id: string;
  section_id: string;
  semester_id: string;
  method: "manual" | "ai";
  class_images?: File[];
  attendance?: Array<{ student_id: string; status: boolean }>;
}

interface TakeAttendanceResponse {
  success: boolean;
  message?: string;
}

export interface UploadMarksRequest {
  branch_id: string;
  semester_id: string;
  section_id: string;
  subject_id: string;
  test_number: number;
  marks?: Array<{ student_id: string; mark: number }>;
  file?: File;
}

interface UploadMarksResponse {
  success: boolean;
  message?: string;
}

export interface ApplyLeaveRequest {
  branch_ids: string[];
  start_date: string;
  end_date: string;
  reason: string;
}

interface ApplyLeaveResponse {
  success: boolean;
  message?: string;
  data?: Array<{ id: string; branch: string }>;
}

interface ViewAttendanceRecordsResponse {
  success: boolean;
  message?: string;
  data?: Array<{
    student: string;
    usn: string;
    total_sessions: number;
    present: number;
    percentage: number;
  }>;
}

export interface CreateAnnouncementRequest {
  branch_id: string;
  semester_id: string;
  section_id: string;
  title: string;
  content: string;
  target?: "student" | "faculty" | "both";
  student_usns?: string[];
}

interface CreateAnnouncementResponse {
  success: boolean;
  message?: string;
}

// Update the ProctorStudent interface to match the new backend response
export interface ProctorStudent {
  name: string;
  usn: string;
  branch: string | null;
  branch_id: number | null;
  semester: number | null;
  semester_id: number | null;
  section: string | null;
  section_id: number | null;
  attendance: number | string;
  marks: Array<{
    subject: string;
    subject_code: string | null;
    test_number: number;
    mark: number;
    max_mark: number;
  }>;
  certificates: Array<{
    title: string;
    file: string | null;
    uploaded_at: string;
  }>;
  latest_leave_request: {
    id: string;
    start_date: string;
    end_date: string;
    reason: string;
    status: string;
  } | null;
  user_info: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    mobile_number: string | null;
    address: string | null;
    bio: string | null;
  } | null;
  face_encodings: unknown;
  proctor: {
    id: number | null;
    name: string | null;
    email: string | null;
  } | null;
  leave_requests?: LeaveRow[];
}

export interface GetProctorStudentsResponse {
  success: boolean;
  message?: string;
  data?: ProctorStudent[];
}

export interface TimetableEntry {
  day: string;
  start_time: string;
  end_time: string;
  subject: string;
  section: string;
  semester: number;
  branch: string;
  faculty_name: string;
  room: string;
}

export interface FacultyAssignment {
  subject_name: string;
  subject_code: string;
  subject_id: number;
  section: string;
  section_id: number;
  semester: number;
  semester_id: number;
  branch: string;
  branch_id: number;
  has_timetable: boolean;
}

interface GetFacultyAssignmentsResponse {
  success: boolean;
  message?: string;
  data?: FacultyAssignment[];
}

interface GetFacultyDashboardBootstrapResponse {
  success: boolean;
  message?: string;
  data?: {
    assignments: FacultyAssignment[];
    proctor_students: ProctorStudent[];
  };
}

interface AttendanceRecordSummary {
  id: number;
  date: string;
  subject: string | null;
  section: string | null;
  semester: number | null;
  branch: string | null;
  file_path: string | null;
  status: string;
  branch_id: number | null;
  section_id: number | null;
  subject_id: number | null;
  semester_id: number | null;
  summary: {
    present_count: number;
    absent_count: number;
    total_count: number;
    present_percentage: number;
  };
}

interface GetAttendanceRecordsWithSummaryResponse {
  success: boolean;
  message?: string;
  data?: AttendanceRecordSummary[];
}

interface GetApplyLeaveBootstrapResponse {
  success: boolean;
  message?: string;
  data?: {
    assignments: FacultyAssignment[];
    leave_requests: FacultyLeaveRequest[];
    branches: { id: number; name: string }[];
  };
}

interface GetTimetableResponse {
  success: boolean;
  message?: string;
  data?: TimetableEntry[];
}

interface ChatChannel {
  id: string;
  type: string;
  subject: string | null;
  section: string | null;
  participants: string[];
}

interface ManageChatResponse {
  success: boolean;
  message?: string;
  data?: ChatChannel[];
}

interface SendChatMessageRequest {
  channel_id?: string;
  message: string;
  type?: "subject" | "proctor" | "faculty";
  branch_id?: string;
  semester_id?: string;
  subject_id?: string;
  section_id?: string;
}

export interface ManageProfileRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  profile_picture?: File;
}

interface ManageProfileResponse {
  success: boolean;
  message?: string;
  data?: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_picture: string | null;
  };
}

interface ScheduleMentoringRequest {
  student_id: string;
  date: string;
  purpose: string;
}

interface ScheduleMentoringResponse {
  success: boolean;
  message?: string;
}

interface GenerateStatisticsResponse {
  success: boolean;
  message?: string;
  data?: {
    pdf_url: string;
    stats: Array<{ student__name: string; percentage: number }>;
  };
}

interface DownloadPDFResponse {
  success: boolean;
  message?: string;
  file_url?: string;
}

export interface ClassStudent {
  id: number;
  name: string;
  usn: string;
}

export interface InternalMarkStudent {
  id: number;
  name: string;
  usn: string;
  mark: number | '';
  max_mark: number;
}

export interface FacultyLeaveRequest {
  id: string;
  branch: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
  applied_on: string;
  reviewed_by?: string | null;
}



// Faculty-specific API functions
export const getDashboardOverview = async (): Promise<DashboardOverviewResponse> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/dashboard/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Get Dashboard Overview Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const takeAttendance = async (
  data: TakeAttendanceRequest
): Promise<TakeAttendanceResponse> => {
  try {
    const formData = new FormData();
    formData.append("branch_id", data.branch_id);
    formData.append("subject_id", data.subject_id);
    formData.append("section_id", data.section_id);
    formData.append("semester_id", data.semester_id);
    formData.append("method", data.method);
    if (data.method === "ai" && data.class_images) {
      data.class_images.forEach((file, index) => {
        formData.append(`class_images[${index}]`, file);
      });
    }
    if (data.method === "manual" && data.attendance) {
      formData.append("attendance", JSON.stringify(data.attendance));
    }
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/take-attendance/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Take Attendance Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const uploadInternalMarks = async (
  data: UploadMarksRequest
): Promise<UploadMarksResponse> => {
  try {
    const formData = new FormData();
    formData.append("branch_id", data.branch_id);
    formData.append("semester_id", data.semester_id);
    formData.append("section_id", data.section_id);
    formData.append("subject_id", data.subject_id);
    formData.append("test_number", data.test_number.toString());
    if (data.marks) {
      formData.append("marks", JSON.stringify(data.marks));
    }
    if (data.file) {
      formData.append("file", data.file);
    }
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/upload-marks/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Upload Internal Marks Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const applyLeave = async (
  data: ApplyLeaveRequest
): Promise<ApplyLeaveResponse> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/apply-leave/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Apply Leave Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const viewAttendanceRecords = async (
  params: { branch_id: string; semester_id: string; section_id: string; subject_id: string }
): Promise<ViewAttendanceRecordsResponse> => {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/attendance-records/?${query}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("View Attendance Records Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const createAnnouncement = async (
  data: CreateAnnouncementRequest
): Promise<CreateAnnouncementResponse> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/announcements/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Create Announcement Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const getProctorStudents = async (): Promise<GetProctorStudentsResponse> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/proctor-students/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Get Proctor Students Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const getFacultyAssignments = async (): Promise<GetFacultyAssignmentsResponse> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/assignments/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Get Faculty Assignments Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const getFacultyDashboardBootstrap = async (): Promise<GetFacultyDashboardBootstrapResponse> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/dashboard/bootstrap/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Get Faculty Dashboard Bootstrap Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const getAttendanceRecordsWithSummary = async (): Promise<GetAttendanceRecordsWithSummaryResponse> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/attendance-records/summary/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Get Attendance Records With Summary Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const getApplyLeaveBootstrap = async (): Promise<GetApplyLeaveBootstrapResponse> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/apply-leave/bootstrap/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Get Apply Leave Bootstrap Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const getTimetable = async (): Promise<GetTimetableResponse> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/timetable/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Get Timetable Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const manageChat = async (
  data: SendChatMessageRequest,
  method: "GET" | "POST" = "GET"
): Promise<ManageChatResponse> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/chat/`, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: method === "POST" ? JSON.stringify(data) : undefined,
    });
    return await response.json();
  } catch (error) {
    console.error("Manage Chat Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const manageProfile = async (
  data: ManageProfileRequest
): Promise<ManageProfileResponse> => {
  try {
    // Use JSON for profile updates instead of FormData since we're not uploading files
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/profile/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email
      }),
    });
    
    const result = await response.json();
    console.log('Profile update API response:', result);
    return result;
  } catch (error) {
    console.error("Manage Profile Error:", error);
    return { success: false, message: "Network error occurred while updating profile" };
  }
};

export const scheduleMentoring = async (
  data: ScheduleMentoringRequest
): Promise<ScheduleMentoringResponse> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/schedule-mentoring/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Schedule Mentoring Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const generateStatistics = async (
  params: { file_id: string }
): Promise<GenerateStatisticsResponse> => {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/generate-statistics/?${query}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Generate Statistics Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const downloadPDF = async (
  filename: string
): Promise<DownloadPDFResponse> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/download-pdf/${filename}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      return { success: true, file_url: url };
    }
    return await response.json();
  } catch (error) {
    console.error("Download PDF Error:", error);
    return { success: false, message: "Network error" };
  }
};

interface AttendanceTrendResponse {
  success: boolean;
  message?: string;
  data?: Array<{
    month: string;
    attendance: number;
  }>;
}

interface GradeDistributionResponse {
  success: boolean;
  message?: string;
  data?: Array<{
    grade: string;
    count: number;
    color?: string;
  }>;
}

export const getAttendanceTrend = async (): Promise<AttendanceTrendResponse> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/attendance-trend/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Get Attendance Trend Error:", error);
    return { success: false, message: "Network error" };
  }
};

export const getGradeDistribution = async (): Promise<GradeDistributionResponse> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/grade-distribution/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Get Grade Distribution Error:", error);
    return { success: false, message: "Network error" };
  }
};

export async function getStudentsForClass(
  branch_id: number,
  semester_id: number,
  section_id: number,
  subject_id: number
): Promise<ClassStudent[]> {
  const params = new URLSearchParams({
    branch_id: branch_id.toString(),
    semester_id: semester_id.toString(),
    section_id: section_id.toString(),
    subject_id: subject_id.toString(),
  });
  const res = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/students/?${params.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
    credentials: 'include',
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to fetch students');
  return data.data;
}

export const getInternalMarksForClass = async (
  branch_id: number,
  semester_id: number,
  section_id: number,
  subject_id: number,
  test_number: number
): Promise<InternalMarkStudent[]> => {
  const params = new URLSearchParams({
    branch_id: branch_id.toString(),
    semester_id: semester_id.toString(),
    section_id: section_id.toString(),
    subject_id: subject_id.toString(),
    test_number: test_number.toString(),
  });
  const res = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/internal-marks/?${params.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
    credentials: 'include',
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to fetch internal marks');
  return data.data;
};

export const getFacultyLeaveRequests = async (): Promise<FacultyLeaveRequest[]> => {
  const res = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/leave-requests/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
    credentials: 'include',
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to fetch leave requests');
  return data.data;
};

export const getFacultyProfile = async () => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/profile/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Get Faculty Profile Error:", error);
    return { success: false, message: "Network error" };
  }
};

export async function getFacultyNotifications() {
  const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/notifications/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function getFacultySentNotifications() {
  const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/notifications/sent/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function getAttendanceRecordsList() {
  const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/attendance-records/list/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function getAttendanceRecordDetails(recordId: number) {
  const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/attendance-records/${recordId}/details/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function manageStudentLeave({ leave_id, action }: { leave_id: string; action: 'APPROVE' | 'REJECT' }) {
  const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/manage-student-leave/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ leave_id, action }),
  });
  return await response.json();
}

export interface LeaveRow {
  id: string;
  student_name: string;
  usn: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}



