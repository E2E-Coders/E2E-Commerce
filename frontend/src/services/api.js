import axios from 'axios'
import { handleMockApiCall } from './mockApi.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true' // Default to false

console.log('API Configuration:', {
  API_BASE_URL,
  USE_MOCK_API,
  VITE_USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API
})

// Create axios instance for real API calls
const realApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
realApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
realApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      delete realApi.defaults.headers.common['Authorization']
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Mock API implementation
const mockApi = {
  async get(url, config = {}) {
    const { params = {} } = config
    const path = url.replace('/api', '') // Remove /api prefix if present
    
    try {
      const result = await handleMockApiCall('GET', path, null, params)
      return { data: result }
    } catch (error) {
      const mockError = new Error(error.message)
      mockError.response = {
        status: 400,
        data: { error: error.message }
      }
      throw mockError
    }
  },

  async post(url, data = null, config = {}) {
    const path = url.replace('/api', '') // Remove /api prefix if present
    
    try {
      const result = await handleMockApiCall('POST', path, data)
      return { data: result }
    } catch (error) {
      const mockError = new Error(error.message)
      mockError.response = {
        status: error.message === 'Authentication required' ? 401 : 400,
        data: { error: error.message }
      }
      throw mockError
    }
  },

  async put(url, data = null, config = {}) {
    const path = url.replace('/api', '') // Remove /api prefix if present
    
    try {
      const result = await handleMockApiCall('PUT', path, data)
      return { data: result }
    } catch (error) {
      const mockError = new Error(error.message)
      mockError.response = {
        status: error.message === 'Authentication required' ? 401 : 400,
        data: { error: error.message }
      }
      throw mockError
    }
  },

  async delete(url, config = {}) {
    const path = url.replace('/api', '') // Remove /api prefix if present
    
    try {
      const result = await handleMockApiCall('DELETE', path)
      return { data: result }
    } catch (error) {
      const mockError = new Error(error.message)
      mockError.response = {
        status: error.message === 'Authentication required' ? 401 : 400,
        data: { error: error.message }
      }
      throw mockError
    }
  }
}

// Export the appropriate API based on environment
export const api = USE_MOCK_API ? mockApi : realApi

// Also export both for manual switching if needed
export { realApi, mockApi }
