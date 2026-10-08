import axios from "axios";

// Base URL: use environment variable if provided, otherwise default to relative path (Vite proxy) or localhost
const BASE_URL = import.meta.env.VITE_API_URL || "";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auto-attach JWT token if present in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("portfolio_auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling 401 unauth
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if expired or unauthorized
      if (window.location.pathname.startsWith("/admin")) {
        localStorage.removeItem("portfolio_auth_token");
        localStorage.removeItem("portfolio_user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Portfolio Endpoints
export const portfolioApi = {
  get: async () => {
    const res = await api.get("/api/portfolio");
    return res.data;
  },
  update: async (data) => {
    const res = await api.put("/api/portfolio", data);
    return res.data;
  },
  updateSection: async (section, data) => {
    const res = await api.put(`/api/portfolio/${section}`, data);
    return res.data;
  },
  reset: async () => {
    const res = await api.post("/api/portfolio/reset");
    return res.data;
  },
  addService: async (serviceData) => {
    const res = await api.post("/api/portfolio/services", serviceData);
    return res.data;
  },
  deleteService: async (id) => {
    const res = await api.delete(`/api/portfolio/services/${id}`);
    return res.data;
  },
  updateSkills: async (skills) => {
    const res = await api.put("/api/portfolio/skills", { skills });
    return res.data;
  },
  updateExperience: async (experience) => {
    const res = await api.put("/api/portfolio/experience", { experience });
    return res.data;
  },
  addProject: async (projectData) => {
    const res = await api.post("/api/portfolio/projects", projectData);
    return res.data;
  },
  deleteProject: async (id) => {
    const res = await api.delete(`/api/portfolio/projects/${id}`);
    return res.data;
  },
  toggleProjects: async (enabled) => {
    const res = await api.patch("/api/portfolio/projects/toggle", { enabled });
    return res.data;
  },
};

// Auth Endpoints
export const authApi = {
  login: async (username, password) => {
    const res = await api.post("/api/auth/login", { username, password });
    return res.data;
  },
  getMe: async () => {
    const res = await api.get("/api/auth/me");
    return res.data;
  },
  changePassword: async (currentPassword, newPassword) => {
    const res = await api.post("/api/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return res.data;
  },
};

// Contact & Inquiries Endpoints
export const contactApi = {
  send: async (data) => {
    const res = await api.post("/api/contact", data);
    return res.data;
  },
  getMessages: async () => {
    const res = await api.get("/api/contact/messages");
    return res.data;
  },
  markRead: async (id, isRead = true) => {
    const res = await api.patch(`/api/contact/messages/${id}/read`, { isRead });
    return res.data;
  },
  deleteMessage: async (id) => {
    const res = await api.delete(`/api/contact/messages/${id}`);
    return res.data;
  },
};
