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

  const validateFullName = (name) => {
    if (!name || !name.trim()) {
      return 'Nome completo é obrigatório'
    }
    
    // Remove espaços extras e normaliza
    const trimmedName = name.trim().replace(/\s+/g, ' ')
    const nameWords = trimmedName.split(' ').filter(word => word.length > 0)
    
    console.log('Validação frontend:', { 
      originalName: name, 
      trimmedName, 
      nameWords, 
      wordCount: nameWords.length 
    })
    
    if (nameWords.length < 2) {
      return 'Nome completo deve conter pelo menos nome e sobrenome'
    }
    
    // Verificar se cada palavra tem pelo menos 2 caracteres
    const hasShortWords = nameWords.some(word => word.length < 2)
    if (hasShortWords) {
      return 'Cada parte do nome deve ter pelo menos 2 caracteres'
    }
    
    return ''
  }

  const validate = (draft = formData) => {
    const errs = {}
    
    // Só valida se há dados para validar
    if (draft.name || draft.email || draft.password || draft.confirmPassword) {
      // Validação mais robusta do nome completo
      const nameError = validateFullName(draft.name)
      if (nameError) {
        errs.name = nameError
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (draft.email && !emailRegex.test(draft.email)) errs.email = 'Email inválido'
      const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/
      if (draft.password && !pwdRegex.test(draft.password)) errs.password = 'Senha fraca (10+, letra, número e símbolo)'
      if (draft.password && draft.confirmPassword && draft.password !== draft.confirmPassword) errs.confirmPassword = 'Senhas não coincidem'
    }
    
    setErrors(errs)
    setIsValid(Object.keys(errs).length === 0 && draft.name && draft.email && draft.password && draft.confirmPassword)
    
    // Retornar os erros para uso no handleSubmit
    return errs
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
    setIsLoading(true)
    
    // Validação final antes do envio
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setIsLoading(false)
      
      // Mostrar primeiro erro encontrado
      const firstError = Object.values(validationErrors)[0]
      toast.error(firstError)
      return
    }

    // Normalizar o nome antes de enviar
    const normalizedName = formData.name.trim().replace(/\s+/g, ' ')
    
    console.log('Enviando dados:', { 
      name: normalizedName, 
      email: formData.email 
    })

    const result = await register(normalizedName, formData.email, formData.password)
    
    if (result.success) {
      toast.success('Conta criada com sucesso!')
      navigate('/')
    } else {
      toast.error(result.error)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">Criar Conta</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Cadastre-se para começar a comprar</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nome Completo</label>
              <div className="relative group">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  required
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-100"
                />
              </div>
              {errors.name && <p className="text-xs text-red-600 dark:text-red-400">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="voce@exemplo.com"
                  required
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-100"
                />
              </div>
              {errors.email && <p className="text-xs text-red-600 dark:text-red-400">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Senha</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Crie uma senha"
                  required
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-10 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  aria-label="Mostrar ou ocultar senha"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Mínimo 10 caracteres, incluindo letra, número e símbolo.</p>
              {errors.password && <p className="text-xs text-red-600 dark:text-red-400">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Confirmar Senha</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repita a senha"
                  required
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-10 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  aria-label="Mostrar ou ocultar confirmação de senha"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-600 dark:text-red-400">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm py-2.5 shadow-sm transition-colors"
            >
              {isLoading ? 'Criando Conta...' : 'Criar Conta'}
            </button>
          </form>
          <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
