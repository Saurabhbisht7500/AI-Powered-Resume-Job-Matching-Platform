import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) =>
  api.post('/auth/login', { email, password });

export const register = (name, email, password) =>
  api.post('/auth/register', { name, email, password });

export const logout = () =>
  api.post('/auth/logout');

export const getCurrentUser = () =>
  api.get('/auth/me');

export const uploadResume = (file, jobDescription = "") => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);
  return api.post("/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getResumeHistory = () => api.get("/resume/history");
export const getResumeById = (id) => api.get(`/resume/${id}`);
export const getJobs = () => api.get("/jobs");
export const createJob = (job) => api.post("/jobs", job);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);
