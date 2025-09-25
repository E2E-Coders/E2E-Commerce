// Serviço para gerenciar refresh tokens
import toast from 'react-hot-toast'

// Função para verificar se o token está próximo do vencimento (5 minutos antes)
export const isTokenNearExpiry = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Math.floor(Date.now() / 1000)
    const timeUntilExpiry = payload.exp - currentTime
    
    // Retorna true se o token expira em menos de 5 minutos (300 segundos)
    return timeUntilExpiry < 300
  } catch {
    return true
  }
}

// Função para verificar se o token está expirado
export const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Math.floor(Date.now() / 1000)
    return payload.exp < currentTime
  } catch {
    return true
  }
}

// Função para renovar o token automaticamente
export const refreshTokenIfNeeded = async () => {
  const token = localStorage.getItem('token')
  
  if (!token) {
    return false
  }
  
  // Se o token está expirado, remove e retorna false
  if (isTokenExpired(token)) {
    localStorage.removeItem('token')
    return false
  }
  
  // Se o token está próximo do vencimento, tenta renovar
  if (isTokenNearExpiry(token)) {
    try {
      // Para o mock API, vamos gerar um novo token com base no atual
      const payload = JSON.parse(atob(token.split('.')[1]))
      
      // Simular renovação do token com nova expiração
      const newPayload = {
        ...payload,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2) // 2 horas
      }
      
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
      const payloadEncoded = btoa(JSON.stringify(newPayload))
      const signature = btoa('mock-signature')
      
      const newToken = `${header}.${payloadEncoded}.${signature}`
      
      localStorage.setItem('token', newToken)
      
      console.log('Token renovado automaticamente')
      return true
    } catch (error) {
      console.error('Erro ao renovar token:', error)
      localStorage.removeItem('token')
      return false
    }
  }
  
  return true
}

// Função para configurar renovação automática do token
export const setupTokenRefresh = () => {
  // Verificar e renovar token a cada 4 minutos
  const interval = setInterval(async () => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      clearInterval(interval)
      return
    }
    
    const renewed = await refreshTokenIfNeeded()
    
    if (!renewed) {
      clearInterval(interval)
      // Token expirado ou erro na renovação
      toast.error('Sua sessão expirou. Faça login novamente.')
      // Usar window.location.pathname para verificar se já não está na página de login
      if (window.location.pathname !== '/login') {
        window.location.href = '/E2E-Commerce/login'
      }
    }
  }, 4 * 60 * 1000) // 4 minutos
  
  return interval
}