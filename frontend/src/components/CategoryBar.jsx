import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

export default function CategoryBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const current = (searchParams.get('category') || '').toLowerCase() || (searchParams.get('categoria') || '').toLowerCase()

  // Lista fixa solicitada
  const shortcuts = [
    { label: 'PlayStation', value: 'PlayStation' },
    { label: 'Xbox', value: 'Xbox' },
    { label: 'PC Gamer', value: 'PC Gamer' },
    { label: 'Notebook', value: 'Notebook' },
    { label: 'Headset', value: 'Headset' },
    { label: 'Teclado', value: 'Teclado' },
    { label: 'Mouse', value: 'Mouse' },
    { label: 'Monitor', value: 'Monitor' }
  ]

  const go = (catName) => {
    const params = new URLSearchParams(location.search)
    const normalized = catName ? catName.toLowerCase() : ''
    if (normalized && normalized === current) {
      params.delete('category')
      params.delete('categoria')
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
        {shortcuts.map(sc => {
          const active = current === sc.value.toLowerCase()
          return (
            <button
              key={sc.value}
              onClick={() => go(sc.value)}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${active ? 'bg-indigo-600 text-white shadow' : 'text-slate-200 hover:bg-slate-700'}`}
              aria-current={active ? 'true' : undefined}
            >{sc.label}</button>
          )
        })}
      </div>
    </nav>
  )
}
