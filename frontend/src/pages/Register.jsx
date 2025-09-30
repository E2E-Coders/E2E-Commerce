import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, User, Mail, Lock, UserCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { USER_ROLES, USER_ROLE_LABELS } from '../constants/userRoles'
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator'
import { validatePasswordStrength } from '../utils/passwordValidator'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: USER_ROLES.CLIENTE
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { register, user } = useAuth()
  const navigate = useNavigate()

  // Redirecionar usuário já logado para a página inicial
  useEffect(() => {
    if (user) {
      const redirectPath = getRedirectPath(user.role)
      navigate(redirectPath, { replace: true })
    }
  }, [user, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor, insira um email válido')
      return false
    }

    // Validação de nome
    if (formData.name.trim().length < 2) {
      toast.error('Nome deve ter pelo menos 2 caracteres')
      return false
    }

    // Validação de senha forte
    const passwordValidation = validatePasswordStrength(formData.password)
    if (!passwordValidation.isValid) {
      toast.error('Senha não atende aos critérios de segurança')
      return false
    }

    // Confirmação de senha
    if (formData.password !== formData.confirmPassword) {
      toast.error('Senhas não coincidem')
      return false
    }
    
    return true
  }

  // Função para determinar redirecionamento baseado no tipo de usuário
  const getRedirectPath = (userRole) => {
    switch (userRole) {
      case USER_ROLES.ADMIN:
        return '/admin'
      case USER_ROLES.VENDEDOR:
        return '/seller'
      case USER_ROLES.CLIENTE:
      default:
        return '/'
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)

    const result = await register(formData.name, formData.email, formData.password, formData.role)
    
    if (result.success) {
      toast.success('Registration successful!')
      
      // Redirecionar baseado no tipo de usuário
      const redirectPath = getRedirectPath(result.user?.role || formData.role)
      navigate(redirectPath, { replace: true })
    } else {
      toast.error(result.error)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="container">
      <div className="max-w-md mx-auto mt-12">
        <div className="card">
          <div className="card-header text-center">
            <h1 className="text-2xl font-bold">Criar Conta</h1>
            <p className="text-gray-600 mt-2">Cadastre-se para começar a comprar</p>
          </div>
          
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    className="form-input pl-10"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Endereço de Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    className="form-input pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Digite seu email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tipo de Usuário</label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    name="role"
                    className="form-input pl-10 appearance-none bg-white"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    {Object.entries(USER_ROLE_LABELS).map(([roleKey, roleLabel]) => (
                      <option key={roleKey} value={roleKey}>
                        {roleLabel}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.role === USER_ROLES.CLIENTE && "Navegue, compre e acompanhe seus pedidos"}
                  {formData.role === USER_ROLES.VENDEDOR && "Consulte pedidos e atenda clientes"}
                  {formData.role === USER_ROLES.ADMIN && "Acesso completo ao sistema"}
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="form-input pl-10 pr-10"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Crie uma senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <PasswordStrengthIndicator password={formData.password} />
              </div>

              <div className="form-group">
                <label className="form-label">Confirmar Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className="form-input pl-10 pr-10"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirme sua senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? 'Criando Conta...' : 'Criar Conta'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700">
                  Entrar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
