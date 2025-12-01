import axiosClient from "./axiosClient";

const taskApi = {
  addTask: (data) => axiosClient.post("/tasks", data),
  getTasks: () => axiosClient.get("/tasks"),
  getTask: (id) => axiosClient.get(`/tasks/${id}`),
  updateTask: (id, data) => axiosClient.put(`/tasks/${id}`, data),
  deleteTask: (id) => axiosClient.delete(`/tasks/${id}`),
};

export default taskApi;
