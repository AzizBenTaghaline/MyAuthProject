import {create} from 'zustand';
import axios from 'axios';
import { checkAuth, forgotPassword, login, logout, verifyEmail } from '../../../../backend/controllers/auth.controllers';

API_URL = 'http://localhost:5000/api/auth';
axios.defaults.withCredentials= true;
const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message:null,
signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, { email, password, name });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Signup failed', isLoading: false });
      throw error;
    }
  },

login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed', isLoading: false });
      throw error;
    }},

logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Logout failed', isLoading: false });
      throw error;
    }
  },
verifyEmail: async (code) => {
    set ({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Verification failed', isLoading: false });
      throw error;
    }
},

checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      set({ isAuthenticated: false, error:null, isCheckingAuth: false });}
},
forgotPassword: async (email) => {
    set({ isLoading: true, error: null, message: null });
    try {
        const response = await axios.post(`${API_URL}/forgot-password`, { email });
        set({ message: response.data.message, isLoading: false });
    } catch (error) {
        set({ 
            isLoading: false,
            error: error.response?.data?.message || 'Forgot password failed',
        })}
        throw error;
    },
resetPassword: async (token,password) => {
    set({isLoading: true, error: null });
    try {
        const response= await axios.post(`${API_URL}/reset-password/${token}`, { password });
        set({ message: response.data.message, isLoading: false });
    } catch (error) {
        set({ 
            isLoading: false,
            error: error.response?.data?.message || 'Reset password failed',});
        throw error;}},

}));

