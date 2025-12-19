import axios from 'axios';

// Replace with your GoDaddy backend URL
const API_BASE_URL = 'https://tradeinusdt.com/mail-dashboard/vercel-backend/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Test connection
export const testConnection = async () => {
  try {
    const response = await api.get('/test');
    return response.data;
  } catch (error) {
    console.error('Connection test failed:', error);
    throw error;
  }
};

// Send email
export const sendEmail = async (emailData) => {
  try {
    const response = await api.post('/send-email', emailData);
    return response.data;
  } catch (error) {
    console.error('Send email failed:', error);
    throw error.response?.data || { error: 'Network error' };
  }
};

// Get emails
export const getEmails = async (page = 1, limit = 20) => {
  try {
    const response = await api.get(`/get-emails?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Get emails failed:', error);
    throw error;
  }
};

export default api;