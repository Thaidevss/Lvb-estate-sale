import { defineStore } from "pinia";
import axios from "axios";
import {
  setToken,
  setUser,
  getToken,
  getUser,
  removeAuth,
} from "../services/tokenService";

const API_URL = import.meta.env.VITE_BASE_API_URL;

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,
    errorCode: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userInfo: (state) => state.user,
    lastError: (state) => ({
      message: state.error,
      code: state.errorCode,
    }),
  },

  actions: {
    async login(username, password) {
      this.isLoading = true;
      this.error = null;
      this.errorCode = null;

      try {
        // Input validation
        if (!username || !password) {
          throw {
            name: "ValidationError",
            message: "Username and password are required",
          };
        }

        const response = await axios.post(
          `${API_URL}/login`,
          {
            USER_NAME: username,
            PASSWORD: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            validateStatus: (status) => {
              // Consider status codes < 500 as successful to handle business logic errors
              return status < 500;
            },
          }
        );

        console.log("API Response:", response); // Debug log

        // Handle business logic errors (status 2xx but error in response)
        if (response.data.error === "0") {
          //   this.token = response.data.data.TOKEN
          //   this.user = response.data.data.DATA
          this.token = `LVB ${response.data.data.TOKEN}`;
          this.user = response.data.data.DATA;

          // Store in localStorage
          //   localStorage.setItem('token', this.token)
          //   localStorage.setItem('user', JSON.stringify(this.user))

          setToken(this.token);
          setUser(this.user);

          // Set default axios headers
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${this.token}`;

          return { success: true };
        } else {
          throw {
            name: "BusinessError",
            message: response.data.message || "Login failed",
            code: response.status,
            responseData: response.data,
          };
        }
      } catch (error) {
        console.error("Login error:", error);

        // Handle different error types
        if (error.name === "ValidationError") {
          this.error = error.message;
          this.errorCode = 400;
        } else if (error.name === "BusinessError") {
          this.error = error.message;
          this.errorCode = error.code || 400;
        } else if (error.response) {
          // Server responded with a status code outside 2xx
          this.errorCode = error.response.status;

          switch (error.response.status) {
            case 400:
              this.error = error.response.data?.message || "Bad request";
              break;
            case 401:
              this.error = "Invalid credentials";
              break;
            case 403:
              this.error = "Access denied";
              break;
            case 404:
              this.error = "Resource not found";
              break;
            case 422:
              this.error =
                "Validation failed: " +
                (error.response.data?.errors || error.response.data?.message);
              break;
            case 429:
              this.error = "Too many requests. Please try again later.";
              break;
            case 500:
              this.error = "Internal server error. Please try again later.";
              break;
            case 502:
            case 503:
            case 504:
              this.error = "Service unavailable. Please try again later.";
              break;
            default:
              this.error =
                error.response.data?.message ||
                error.response.statusText ||
                "Login failed";
          }

          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        } else if (error.request) {
          // Request was made but no response received
          this.error = "No response from server. Please check your network.";
          this.errorCode = "NETWORK_ERROR";
          console.error("Request:", error.request);
        } else {
          // Something happened in setting up the request
          this.error = error.message;
          this.errorCode = "CLIENT_ERROR";
        }

        return {
          success: false,
          error: this.error,
          code: this.errorCode,
        };
      } finally {
        this.isLoading = false;
      }
    },

    initializeAuth() {
      const token = getToken();
      const user = getUser();

      if (token) {
        this.token = token;

        if (user && typeof user === "object") {
          this.user = user;
        } else if (user) {
          try {
            this.user = JSON.parse(user);
          } catch (e) {
            console.error("Failed to parse user data:", e);
            this.user = null;
          }
        } else {
          this.user = null;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      removeAuth();
      delete axios.defaults.headers.common["Authorization"];
    },

    isTokenExpired(token) {
      if (!token) return true;

      try {
        // ตัวอย่างการ decode token (ถ้าเป็น JWT)
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp < Date.now() / 1000;
      } catch {
        return true;
      }
    },

    checkAuth() {
      if (!this.token || this.isTokenExpired(this.token)) {
        this.logout();
        return false;
      }
      return true;
    },

    // Helper method to clear errors
    clearError() {
      this.error = null;
      this.errorCode = null;
    },

    // ... rest of your store methods
  },
});
