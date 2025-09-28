import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react'
import toast from 'react-hot-toast'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  
  const { register, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [user, navigate])

  const validate = (draft = formData) => {
    const errs = {}
    if (!draft.name || draft.name.trim().split(' ').length < 2) errs.name = 'Informe nome completo'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(draft.email)) errs.email = 'Email inválido'
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
    if (!pwdRegex.test(draft.password)) errs.password = 'Senha fraca (8+, maiúsc, minúsc, número, símbolo)'
    if (draft.password !== draft.confirmPassword) errs.confirmPassword = 'Senhas não coincidem'
    setErrors(errs)
    setIsValid(Object.keys(errs).length === 0)
  }

  useEffect(() => { validate(formData) }, [])

  const handleChange = (e) => {
    const next = { ...formData, [e.target.name]: e.target.value }
    setFormData(next)
    validate(next)
  }

  const validateForm = () => isValid

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)

    const result = await register(formData.name, formData.email, formData.password)
    
    if (result.success) {
      toast.success('Registration successful!')
      navigate('/', { replace: true })
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
                {errors.name && <p className="form-error">{errors.name}</p>}
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
                {errors.email && <p className="form-error">{errors.email}</p>}
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
                <p className="text-sm text-gray-600 mt-1">A senha deve ter 8+ caracteres incluindo maiúscula, minúscula, número e símbolo.</p>
                {errors.password && <p className="form-error">{errors.password}</p>}
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
                {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
              </div>

              <button type="submit" disabled={isLoading || !isValid} className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">{isLoading ? 'Criando Conta...' : 'Criar Conta'}</button>
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
