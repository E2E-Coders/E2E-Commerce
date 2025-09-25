import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { User, Mail, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import InputField from '../components/InputField'
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator'
import '../styles/auth.css'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  
  const { register, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [user, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Validações
  const validateName = (name) => {
    return {
      isValid: name.length >= 2,
      message: name.length >= 2 ? '' : 'Nome deve ter pelo menos 2 caracteres'
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return {
      isValid: emailRegex.test(email),
      message: emailRegex.test(email) ? '' : 'Email inválido'
    }
  }

  const validatePassword = (password) => {
    const hasLength = password.length >= 10
    const hasLetter = /[A-Za-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    
    const isValid = hasLength && hasLetter && hasNumber && hasSymbol
    let message = ''
    
    if (!hasLength) message = 'Senha deve ter pelo menos 10 caracteres'
    else if (!hasLetter) message = 'Senha deve conter pelo menos uma letra'
    else if (!hasNumber) message = 'Senha deve conter pelo menos um número'
    else if (!hasSymbol) message = 'Senha deve conter pelo menos um símbolo (!@#$%^&*...)'
    
    return { isValid, message }
  }

  const validateConfirmPassword = (confirmPassword) => {
    return {
      isValid: confirmPassword === formData.password && confirmPassword.length > 0,
      message: confirmPassword === formData.password ? '' : 'Senhas não coincidem'
    }
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem')
      return false
    }
    
    if (formData.password.length < 10) {
      toast.error('A senha deve ter pelo menos 10 caracteres')
      return false
    }
    
    if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(formData.password)) {
      toast.error('A senha deve conter pelo menos uma letra, um número e um símbolo')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)

    const result = await register(formData.name, formData.email, formData.password)
    
    if (result.success) {
      toast.success('Cadastro realizado com sucesso!')
      navigate('/', { replace: true })
    } else {
      toast.error(result.error)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Criar Conta</h1>
          <p className="auth-subtitle">Cadastre-se para começar a comprar</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
            label="Nome Completo"
            icon={User}
            required
            validation={validateName}
          />

          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu email"
            label="Endereço de Email"
            icon={Mail}
            required
            validation={validateEmail}
          />

          <InputField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Crie uma senha"
            label="Senha"
            icon={Lock}
            required
            validation={validatePassword}
            showPasswordToggle
          />

          {/* Indicador de força da senha */}
          {formData.password && (
            <PasswordStrengthIndicator password={formData.password} />
          )}

          <InputField
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirme sua senha"
            label="Confirmar Senha"
            icon={Lock}
            required
            validation={validateConfirmPassword}
            showPasswordToggle
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`auth-btn ${isLoading ? 'auth-btn-loading' : ''}`}
          >
            {isLoading ? 'Criando Conta...' : 'Criar Conta'}
          </button>
        </form>

        <div className="auth-link-container">
          <p className="text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="auth-link">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
