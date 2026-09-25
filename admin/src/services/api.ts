import axios from "axios";

const api = axios.create({ baseURL: "/api", timeout: 15000 });

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

export const blogApi = {
  getAll: (params?: Record<string, unknown>) => api.get("/blog/admin", { params }),
  getOne: (id: string) => api.get(`/blog/${id}`),
  create: (data: unknown) => api.post("/blog", data),
  update: (id: string, data: unknown) => api.patch(`/blog/${id}`, data),
  remove: (id: string) => api.delete(`/blog/${id}`),
};

export const testimonialsApi = {
  getAll: () => api.get("/testimonials"),
  create: (data: unknown) => api.post("/testimonials", data),
  update: (id: string, data: unknown) => api.patch(`/testimonials/${id}`, data),
  remove: (id: string) => api.delete(`/testimonials/${id}`),
  reorder: (ids: string[]) => api.post("/testimonials/reorder", { ids }),
};

export const integrationsApi = {
  getAll: () => api.get("/integrations"),
  create: (data: unknown) => api.post("/integrations", data),
  update: (id: string, data: unknown) => api.patch(`/integrations/${id}`, data),
  remove: (id: string) => api.delete(`/integrations/${id}`),
  reorder: (ids: string[]) => api.post("/integrations/reorder", { ids }),
};

export const featuresApi = {
  getAll: (params?: Record<string, unknown>) => api.get("/features", { params }),
  create: (data: unknown) => api.post("/features", data),
  update: (id: string, data: unknown) => api.patch(`/features/${id}`, data),
  remove: (id: string) => api.delete(`/features/${id}`),
  reorder: (ids: string[]) => api.post("/features/reorder", { ids }),
};

export const useCasesApi = {
  getAll: (params?: Record<string, unknown>) => api.get("/use-cases", { params }),
  create: (data: unknown) => api.post("/use-cases", data),
  update: (id: string, data: unknown) => api.patch(`/use-cases/${id}`, data),
  remove: (id: string) => api.delete(`/use-cases/${id}`),
  reorder: (ids: string[]) => api.post("/use-cases/reorder", { ids }),
};

export const contactsApi = {
  getAll: (params?: Record<string, unknown>) => api.get("/contact", { params }),
  updateStatus: (id: string, status: string) => api.patch(`/contact/${id}/status`, { status }),
};

export const newsletterApi = {
  getAll: (params?: Record<string, unknown>) => api.get("/newsletter", { params }),
};

export const healthCheckApi = {
  getAll: (params?: Record<string, unknown>) => api.get("/health-check", { params }),
  update: (id: string, data: unknown) => api.patch(`/health-check/${id}`, data),
};

export const usersApi = {
  getAll: () => api.get("/users"),
  create: (data: unknown) => api.post("/users", data),
  update: (id: string, data: unknown) => api.patch(`/users/${id}`, data),
  remove: (id: string) => api.delete(`/users/${id}`),
};

export const analyticsApi = {
  getOverview: () => api.get("/analytics/overview"),
  getBlogStats: () => api.get("/analytics/blogs"),
  getContactStats: () => api.get("/analytics/contacts"),
};

export const scalingApi = {
  getAll: () => api.get("/scaling"),
  create: (data: unknown) => api.post("/scaling", data),
  update: (id: string, data: unknown) => api.patch(`/scaling/${id}`, data),
  remove: (id: string) => api.delete(`/scaling/${id}`),
  reorder: (ids: string[]) => api.post("/scaling/reorder", { ids }),
};

export const industryROIApi = {
  getAll: () => api.get("/industry-roi/admin"),
  create: (data: unknown) => api.post("/industry-roi", data),
  update: (id: string, data: unknown) => api.patch(`/industry-roi/${id}`, data),
  remove: (id: string) => api.delete(`/industry-roi/${id}`),
};

export const authApi = {
  changePassword: (currentPassword: string, newPassword: string) =>
    api.patch("/auth/password", { currentPassword, newPassword }),
};

export const uploadApi = {
  upload: (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    return api.post<{ url: string; filename: string }>("/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export const pageContentApi = {
  getByPage: (page: string) => api.get(`/page-content/${page}`),
  getByPageAdmin: (page: string) => api.get(`/page-content/${page}/admin`),
  upsert: (data: { page: string; section: string; key: string; value: string; isActive?: boolean; order?: number }) =>
    api.post("/page-content", data),
  bulkUpsert: (items: Array<{ page: string; section: string; key: string; value: string; isActive?: boolean; order?: number }>) =>
    api.post("/page-content/bulk", { items }),
  reorder: (items: Array<{ id: string; order: number }>) =>
    api.post("/page-content/reorder", { items }),
  remove: (id: string) => api.delete(`/page-content/${id}`),
};
