import { getApiBaseUrl } from "./config";
import { fetchWithTokenRefresh } from "./authService";

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

export interface LeaveRow {
  id: string;
  student_name: string;
  usn: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export const getProctorStudents = async (): Promise<GetProctorStudentsResponse> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/proctor-students/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
        'ngrok-skip-browser-warning': 'true',
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

export const getTimetable = async () => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/timetable/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    });
    return await response.json();
  } catch (e) {
    return { success: false, message: 'Network error' };
  }
};

export const getDashboardOverview = async () => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/dashboard/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (e) {
    return { success: false, message: 'Network error' };
  }
};

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

export const getFacultyLeaveRequests = async (): Promise<FacultyLeaveRequest[]> => {
  const res = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/leave-requests/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to fetch leave requests');
  return data.data;
};

export const manageStudentLeave = async ({ leave_id, action }: { leave_id: string; action: 'APPROVE' | 'REJECT' }) => {
  const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/manage-student-leave/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ leave_id, action }),
  });
  return await response.json();
};

export const applyLeave = async (data: { branch_ids: string[]; start_date: string; end_date: string; reason: string }) => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/apply-leave/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (e) {
    return { success: false, message: 'Network error' };
  }
};

export const getFacultyProfile = async () => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/profile/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (e) {
    return { success: false, message: 'Network error' };
  }
};

export const manageProfile = async (data: { first_name?: string; last_name?: string; email?: string; profile_picture?: File }) => {
  try {
    const form = new FormData();
    if (data.first_name) form.append('first_name', data.first_name);
    if (data.last_name) form.append('last_name', data.last_name);
    if (data.email) form.append('email', data.email);
    if (data.profile_picture) form.append('profile_picture', data.profile_picture);
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/profile/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`, 'ngrok-skip-browser-warning': 'true' },
      body: form,
    });
    return await response.json();
  } catch (e) {
    return { success: false, message: 'Network error' };
  }
};

export const generateStatistics = async (params?: { file_id?: string }) => {
  try {
    const query = params?.file_id ? `?file_id=${encodeURIComponent(params.file_id)}` : '';
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/generate-statistics/${query}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (e) {
    return { success: false, message: 'Network error' };
  }
};

export const downloadPDF = async (filename: string) => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/download-pdf/${encodeURIComponent(filename)}/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) return { success: false, message: 'Download failed' };
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return { success: true, file_url: url };
  } catch (e) {
    return { success: false, message: 'Network error' };
  }
};
export interface ClassStudent {
  id: number;
  name: string;
  usn: string;
}

export const getStudentsForClass = async (
  branch_id: number,
  semester_id: number,
  section_id: number,
  subject_id: number
): Promise<ClassStudent[]> => {
  const params = new URLSearchParams({
    branch_id: String(branch_id),
    semester_id: String(semester_id),
    section_id: String(section_id),
    subject_id: String(subject_id),
  });
  const res = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/students/?${params.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to fetch students');
  return data.data as ClassStudent[];
};

export const takeAttendance = async (data: {
  branch_id: string;
  subject_id: string;
  section_id: string;
  semester_id: string;
  method: "manual" | "ai";
  attendance?: Array<{ student_id: string; status: boolean }>;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/take-attendance/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: (() => {
        const formData = new FormData();
        formData.append("branch_id", data.branch_id);
        formData.append("subject_id", data.subject_id);
        formData.append("section_id", data.section_id);
        formData.append("semester_id", data.semester_id);
        formData.append("method", data.method);
        if (data.method === 'manual' && data.attendance) {
          formData.append('attendance', JSON.stringify(data.attendance));
        }
        return formData;
      })(),
    });
    return await response.json();
  } catch (e) {
    return { success: false, message: 'Network error' };
  }
};

export interface InternalMarkStudent {
  id: number;
  name: string;
  usn: string;
  mark: number | '';
  max_mark: number;
}

export const getInternalMarksForClass = async (
  branch_id: number,
  semester_id: number,
  section_id: number,
  subject_id: number,
  test_number: number
): Promise<InternalMarkStudent[]> => {
  const params = new URLSearchParams({
    branch_id: String(branch_id),
    semester_id: String(semester_id),
    section_id: String(section_id),
    subject_id: String(subject_id),
    test_number: String(test_number),
  });
  const res = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/internal-marks/?${params.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to fetch internal marks');
  return data.data as InternalMarkStudent[];
};

export const uploadInternalMarks = async (payload: {
  branch_id: string;
  semester_id: string;
  section_id: string;
  subject_id: string;
  test_number: number;
  marks?: Array<{ student_id: string; mark: number }>;
  file?: File;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const form = new FormData();
    form.append('branch_id', payload.branch_id);
    form.append('semester_id', payload.semester_id);
    form.append('section_id', payload.section_id);
    form.append('subject_id', payload.subject_id);
    form.append('test_number', String(payload.test_number));
    if (payload.marks) form.append('marks', JSON.stringify(payload.marks));
    if (payload.file) form.append('file', payload.file);
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/upload-marks/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      body: form,
    });
    return await response.json();
  } catch (e) {
    return { success: false, message: 'Network error' };
  }
};

export const viewAttendanceRecords = async (params: { branch_id: string; semester_id: string; section_id: string; subject_id: string }) => {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/attendance-records/?${query}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (e) {
    return { success: false, message: 'Network error' };
  }
};

export const getFacultyNotifications = async () => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/notifications/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (e) {
    return { success: false, message: 'Network error' };
  }
};

export const getFacultySentNotifications = async () => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/sent-notifications/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (e) {
    return { success: false, message: 'Network error' };
  }
};

export const createAnnouncement = async (data: { branch_id: string; semester_id: string; section_id: string; title: string; content: string; target?: 'student' | 'faculty' | 'both'; student_usns?: string[] }) => {
  try {
    const response = await fetchWithTokenRefresh(`${getApiBaseUrl()}/faculty/announcements/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (e) {
    return { success: false, message: 'Network error' };
  }
};



