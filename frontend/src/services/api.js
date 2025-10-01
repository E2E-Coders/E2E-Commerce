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
// Token refresh handling
let isRefreshing = false
let pendingRequests = []

const processQueue = (error, token = null) => {
  pendingRequests.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  pendingRequests = []
}

realApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')

      if (!refreshToken) {
        localStorage.removeItem('token')
        delete realApi.defaults.headers.common['Authorization']
        window.location.href = '/login'
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject })
        })
          .then((newToken) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + newToken
            return realApi(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true
      try {
        const refreshResponse = USE_MOCK_API
          ? await mockApi.post('/auth/refresh', { refreshToken })
          : await realApi.post('/auth/refresh', { refreshToken })
        const newToken = refreshResponse.data.data?.token || refreshResponse.data.token
        if (newToken) {
          localStorage.setItem('token', newToken)
          realApi.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
          processQueue(null, newToken)
          originalRequest.headers['Authorization'] = 'Bearer ' + newToken
          return realApi(originalRequest)
        }
        throw new Error('No token in refresh response')
      } catch (refreshError) {
        processQueue(refreshError, null)
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        delete realApi.defaults.headers.common['Authorization']
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
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
