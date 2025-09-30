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
      <div className="max-w-md mx-auto mt-8 mb-8">
        <div className="card">
          <div className="card-header">
            <h1>Criar sua conta</h1>
            <p>É rápido e fácil.</p>
          </div>
          
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Seu nome</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    name="name"
                    className="form-input pl-10"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nome e sobrenome"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    name="email"
                    className="form-input pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="exemplo@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tipo de conta</label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
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

                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formData.role === USER_ROLES.CLIENTE && "Compre produtos e acompanhe pedidos"}
                  {formData.role === USER_ROLES.VENDEDOR && "Venda produtos e gerencie pedidos"}
                  {formData.role === USER_ROLES.ADMIN && "Administre todo o sistema"}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="form-input pl-10 pr-10"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Pelo menos 6 caracteres"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <PasswordStrengthIndicator password={formData.password} />
              </div>

              <div className="form-group">
                <label className="form-label">Confirme a senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className="form-input pl-10 pr-10"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Digite a senha novamente"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full mt-4"
              >
                {isLoading ? 'Criando sua conta...' : 'Criar sua conta'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <div className="text-xs text-gray-600 mb-4">
                Ao criar uma conta, você concorda com as{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Condições de Uso
                </a>{' '}
                e{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Política de Privacidade
                </a>
                .
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                    Fazer login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
