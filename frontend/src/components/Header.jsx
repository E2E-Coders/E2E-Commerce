import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ShoppingCart, User, LogOut, Search, Moon, Sun } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useState, useEffect } from 'react'
import CategoryBar from './CategoryBar'

function Header() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '')
  }, [location.search])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const submitSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(location.search)
    if (searchTerm) params.set('q', searchTerm); else params.delete('q')
    navigate({ pathname: '/', search: params.toString() })
  }

  // Category buttons moved to dedicated CategoryBar component (below header)

  return (
    <header className="relative z-50 shadow">
      {/* Top bar */}
      <div className="bg-slate-900 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 py-2">
          <Link to="/" className="text-xl font-bold tracking-tight text-indigo-400 hover:text-indigo-300 whitespace-nowrap">E2E-Commerce</Link>
          {/* Search desktop */}
          <form onSubmit={submitSearch} className="hidden md:flex flex-1">
            <div className="relative w-full">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar consoles, notebooks, periféricos..."
                className="w-full rounded-md bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 text-sm py-2 pl-9 pr-3 placeholder:text-slate-500"
              />
            </div>
          </form>
          <button onClick={toggleTheme} className="inline-flex items-center gap-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md px-3 py-1.5 transition" aria-label="Alternar tema">
            {theme === 'dark' ? <Sun size={14}/> : <Moon size={14}/>}
            <span className="hidden sm:inline">{theme==='dark' ? 'Light' : 'Dark'}</span>
          </button>
          {user ? (
            <div className="flex items-center gap-4 ml-auto text-xs md:text-sm">
              <Link to="/orders" className="hover:text-white">Pedidos</Link>
              {user.role === 'SELLER' && <Link to="/seller" className="hover:text-white">Vendedor</Link>}
              <Link to="/cart" className="relative inline-flex items-center gap-1 hover:text-white">
                <ShoppingCart size={18}/> <span className="hidden sm:inline">Carrinho</span>
              </Link>
              <div className="flex items-center gap-2 max-w-[140px]">
                <User size={16} className="text-indigo-300" />
                <span className="truncate" title={user.name}>{user.name}</span>
                <button onClick={handleLogout} className="text-slate-400 hover:text-red-400" title="Sair"><LogOut size={14}/></button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 ml-auto text-xs md:text-sm">
              <Link to="/login" className="hover:text-white">Entrar</Link>
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-3 py-1.5 rounded-md">Cadastrar</Link>
            </div>
          )}
        </div>
        {/* Mobile search */}
        <form onSubmit={submitSearch} className="md:hidden px-4 pb-3">
          <div className="relative w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full rounded-md bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 text-sm py-2 pl-9 pr-3 placeholder:text-slate-500"
            />
          </div>
        </form>
        {/* Category bar */}
        <CategoryBar />
      </div>
    </header>
  )
}

export default Header
