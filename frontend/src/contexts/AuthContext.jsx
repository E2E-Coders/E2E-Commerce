import { createContext, useContext, useState, useEffect } from 'react'
import { api, realApi } from '../services/api'
import { setupTokenRefresh, refreshTokenIfNeeded } from '../services/refreshToken'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [inactivityTimer, setInactivityTimer] = useState(null)
  const [refreshInterval, setRefreshInterval] = useState(null)

  // Função para resetar o timer de inatividade
  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
    }
    
    if (user) {
      const timer = setTimeout(() => {
        logout()
        toast.error('Sessão expirada por inatividade. Faça login novamente.')
      }, 30 * 60 * 1000) // 30 minutos
      
      setInactivityTimer(timer)
    }
  }

  // Eventos para detectar atividade do usuário
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    
    const resetTimer = () => {
      if (user) {
        resetInactivityTimer()
      }
    }
    
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true)
    })
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true)
      })
      if (inactivityTimer) {
        clearTimeout(inactivityTimer)
      }
      if (refreshInterval) {
        clearInterval(refreshInterval)
      }
    }
  }, [user, inactivityTimer])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Verificar se o token ainda é válido antes de usar
      refreshTokenIfNeeded().then((isValid) => {
        if (isValid) {
          const currentToken = localStorage.getItem('token')
          
          // Set authorization header for real API
          if (realApi.defaults) {
            realApi.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`
          }
          
          // Try to get user info from token
          try {
            const payload = JSON.parse(atob(currentToken.split('.')[1]))
            setUser({
              id: payload.userId,
              name: payload.name,
              email: payload.sub,
              role: payload.role
            })
            
            // Iniciar timer de inatividade se usuário já estava logado
            resetInactivityTimer()
            
            // Configurar renovação automática do token
            const interval = setupTokenRefresh()
            setRefreshInterval(interval)
          } catch (error) {
            console.error('Invalid token:', error)
            localStorage.removeItem('token')
            if (realApi.defaults) {
              delete realApi.defaults.headers.common['Authorization']
            }
          }
        } else {
          // Token inválido ou expirado
          localStorage.removeItem('token')
          if (realApi.defaults) {
            delete realApi.defaults.headers.common['Authorization']
          }
        }
      })
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
      
      // Iniciar timer de inatividade após login
      resetInactivityTimer()
      
      // Configurar renovação automática do token
      const interval = setupTokenRefresh()
      setRefreshInterval(interval)
      
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
      
      // Iniciar timer de inatividade após registro
      resetInactivityTimer()
      
      // Configurar renovação automática do token
      const interval = setupTokenRefresh()
      setRefreshInterval(interval)
      
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
    
    // Limpar timer de inatividade
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
      setInactivityTimer(null)
    }
    
    // Limpar intervalo de refresh token
    if (refreshInterval) {
      clearInterval(refreshInterval)
      setRefreshInterval(null)
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
