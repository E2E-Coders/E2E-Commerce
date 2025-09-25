import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { User, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import InputField from '../components/InputField'
import '../styles/auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true })
    }
  }, [user, navigate, from])

  // Validações
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return {
      isValid: emailRegex.test(email),
      message: emailRegex.test(email) ? '' : 'Email inválido'
    }
  }

  const validatePassword = (password) => {
    return {
      isValid: password.length >= 10,
      message: password.length >= 10 ? '' : 'Senha deve ter pelo menos 10 caracteres'
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await login(email, password)
    
    if (result.success) {
      toast.success('Login realizado com sucesso!')
      navigate(from, { replace: true })
    } else {
      toast.error(result.error)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Bem-vindo de Volta</h1>
          <p className="auth-subtitle">Entre na sua conta para continuar</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            label="Endereço de Email"
            icon={User}
            required
            validation={validateEmail}
          />

          <InputField
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            label="Senha"
            icon={Lock}
            required
            validation={validatePassword}
            showPasswordToggle
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`auth-btn ${isLoading ? 'auth-btn-loading' : ''}`}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="auth-link-container">
          <p className="text-gray-600">
            Não tem uma conta?{' '}
            <Link to="/register" className="auth-link">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>

      {/* Contas de Teste */}
      <div className="test-accounts-card">
        <h3 className="test-accounts-title">Contas de Teste</h3>
        <div className="space-y-2">
          <div className="test-account-item">
            <span className="test-account-role">Admin</span>
            <span className="test-account-credentials">admin@marketplace.com / password123</span>
          </div>
          <div className="test-account-item">
            <span className="test-account-role">Seller</span>
            <span className="test-account-credentials">seller1@marketplace.com / password123</span>
          </div>
          <div className="test-account-item">
            <span className="test-account-role">Buyer</span>
            <span className="test-account-credentials">buyer1@marketplace.com / password123</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
