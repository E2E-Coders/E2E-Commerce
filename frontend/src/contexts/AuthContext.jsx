import { createContext, useContext, useState, useEffect } from 'react'
import { api, realApi } from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Set authorization header for real API
      if (realApi.defaults) {
        realApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
      
      // Try to get user info from token
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({
          id: payload.userId,
          name: payload.name,
          email: payload.sub,
          role: payload.role
        })
      } catch (error) {
        console.error('Invalid token:', error)
        localStorage.removeItem('token')
        if (realApi.defaults) {
          delete realApi.defaults.headers.common['Authorization']
        }
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token, user: userData } = response.data.data
      
      localStorage.setItem('token', token)
      
      // Set authorization header for real API only
      if (realApi.defaults) {
        realApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
      
      setUser(userData)
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      }
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password })
      const { token, user: userData } = response.data.data
      
      localStorage.setItem('token', token)
      
      // Set authorization header for real API only
      if (realApi.defaults) {
        realApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
      
      setUser(userData)
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    
    // Remove authorization header from real API only
    if (realApi.defaults) {
      delete realApi.defaults.headers.common['Authorization']
    }
    
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
