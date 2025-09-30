import { handleMockApiCall } from './mockApi.js'

// Mock API implementation
const api = {
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

export { api }
