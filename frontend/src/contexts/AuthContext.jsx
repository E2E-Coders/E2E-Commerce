import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'
import { USER_ROLES, getRolePermissions } from '../constants/userRoles'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastActivity, setLastActivity] = useState(Date.now())

  // Logout automático por inatividade (30 minutos)
  useEffect(() => {
    const INACTIVITY_TIMEOUT = 30 * 60 * 1000 // 30 minutos

    const checkInactivity = () => {
      if (user && Date.now() - lastActivity > INACTIVITY_TIMEOUT) {
        logout('inactivity')
      }
    }

    const updateActivity = () => {
      setLastActivity(Date.now())
    }

    // Eventos que indicam atividade do usuário
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    if (user) {
      events.forEach(event => {
        document.addEventListener(event, updateActivity, true)
      })

      const inactivityTimer = setInterval(checkInactivity, 60000) // Verifica a cada minuto

      return () => {
        events.forEach(event => {
          document.removeEventListener(event, updateActivity, true)
        })
        clearInterval(inactivityTimer)
      }
    }
  }, [user, lastActivity])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Try to get user info from token
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({
          id: payload.userId,
          name: payload.name,
          email: payload.sub,
          role: payload.role || USER_ROLES.CLIENTE, // Role padrão se não especificado
          permissions: getRolePermissions(payload.role || USER_ROLES.CLIENTE)
        })
      } catch (error) {
        console.error('Invalid token:', error)
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token, user: userData } = response.data.data
      
      localStorage.setItem('token', token)
      
      // Adicionar permissões ao userData se não estiverem presentes
      const userWithPermissions = {
        ...userData,
        role: userData.role || USER_ROLES.CLIENTE,
        permissions: userData.permissions || getRolePermissions(userData.role || USER_ROLES.CLIENTE)
      }
      
      setUser(userWithPermissions)
      
      return { success: true, user: userWithPermissions }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      }
    }
  }

  const register = async (name, email, password, role = USER_ROLES.CLIENTE) => {
    try {
      const response = await api.post('/auth/register', { 
        name, 
        email, 
        password, 
        role 
      })
      const { token, user: userData } = response.data.data
      
      localStorage.setItem('token', token)
      
      // Adicionar permissões ao userData se não estiverem presentes
      const userWithPermissions = {
        ...userData,
        role: userData.role || role,
        permissions: userData.permissions || getRolePermissions(userData.role || role)
      }
      
      setUser(userWithPermissions)
      
      return { success: true, user: userWithPermissions }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      }
    }
  }
  const logout = (reason = 'manual') => {
    localStorage.removeItem('token')
    
    setUser(null)
    
    // Notificar o usuário sobre logout automático
    if (reason === 'inactivity') {
      // Importar toast dinamicamente para evitar problemas de dependência circular
      import('react-hot-toast').then(({ default: toast }) => {
        toast.error('Sessão expirada por inatividade. Faça login novamente.')
      })
    }
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
