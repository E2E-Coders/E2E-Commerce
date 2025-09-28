import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { api } from '../services/api'

export default function CategoryBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const current = (searchParams.get('category') || '').toLowerCase()

  const { data: categories } = useQuery('categories', async () => {
    const res = await api.get('/products/categories')
    return res.data.data
  })

  const go = (catName) => {
    const params = new URLSearchParams(location.search)
    if (catName && catName.toLowerCase() === current) {
      params.delete('category')
    } else if (catName) {
      params.set('category', catName)
    }
    params.set('page','1')
    navigate({ pathname: '/', search: params.toString() })
  }

  return (
    <nav className="bg-slate-800/95 dark:bg-slate-900 backdrop-blur supports-[backdrop-filter]:bg-slate-800/80 border-b border-slate-700 overflow-x-auto" aria-label="Categorias">
      <div className="max-w-7xl mx-auto px-3 flex gap-2 py-2 text-xs sm:text-sm font-medium min-w-max">
        <button
          onClick={() => go(null)}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${!current ? 'bg-indigo-600 text-white shadow' : 'text-slate-200 hover:bg-slate-700'}`}
        >Tudo</button>
        {categories?.map(cat => {
          const active = current === cat.name.toLowerCase()
          return (
            <button
              key={cat.id}
              onClick={() => go(cat.name)}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${active ? 'bg-indigo-600 text-white shadow' : 'text-slate-200 hover:bg-slate-700'}`}
              aria-current={active ? 'true' : undefined}
            >{cat.name}</button>
          )
        })}
      </div>
    </nav>
  )
}
