import { defineStore } from "pinia";
import api from "../api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async register(userData) {
      const response = await api.post("/api/auth/register", userData);
      this.setAuth(response.data);
    },
    async login(userData) {
      const response = await api.post("/api/auth/login", userData);
      this.setAuth(response.data);
    },
    setAuth(data) {
      this.token = data.token;
      this.user = data; // In a real app, you might decode the token or fetch profile immediately
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload(); // Simple way to reset state
    },
  },
});
