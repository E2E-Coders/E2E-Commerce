import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { api } from '../services/api'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
// Carrosséis removidos para cumprir requisito de exibir estritamente 20 itens por página.
// import PromoCarousel from '../components/PromoCarousel'
// import ProductCarousel from '../components/ProductCarousel'

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const rawPage = parseInt(searchParams.get('page') || '1')
  const PAGE_SIZE = 8
  const initialFilters = {
    q: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    categorySlug: searchParams.get('categorySlug') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'createdAt',
    direction: searchParams.get('direction') || 'desc',
    page: isNaN(rawPage) ? 0 : Math.max(0, rawPage - 1),
    size: PAGE_SIZE
  }
  const [filters, setFilters] = useState(initialFilters)

  // Sync filters -> URL
  useEffect(() => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k,v]) => {
      if (v !== '' && v !== null && v !== undefined) {
        if (k === 'page') {
          params.set('page', (v + 1).toString())
        } else {
          params.set(k, v)
        }
      }
    })
    setSearchParams(params, { replace: true })
  }, [filters, setSearchParams])

  // Fetch categories
  const { data: categoriesData } = useQuery(
    'categories',
    async () => {
      const response = await api.get('/products/categories')
      return response.data.data
    }
  )

  // Fetch products
  const { data: productsData, isLoading, error } = useQuery(
    ['products', filters],
    async () => {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (key === 'size') {
          params.set('size', PAGE_SIZE)
          return
        }
        if (value !== '') params.append(key, value)
      })

      const response = await api.get(`/products?${params}`)
      return response.data.data
    },
    {
      keepPreviousData: true
    }
  )

  // Filtros tradicionais removidos do layout principal (mantido mecanismo via query params)

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page: page - 1 }))
  }

  if (error) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Error loading products</h3>
          <p>{error.response?.data?.error || 'Something went wrong'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container pb-16">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 tracking-tight text-slate-800 dark:text-white">Catálogo de Produtos</h1>
      </div>
      <div className="relative rounded-2xl border border-violet-200/60 dark:border-violet-500/20 shadow-[0_4px_22px_-4px_rgba(124,58,237,0.25)] bg-[linear-gradient(145deg,#ffffffee,#f4f0ff,_#efe8ff)] dark:bg-[linear-gradient(145deg,#1e1b2e,#271f42,_#2f2652)] backdrop-blur-sm p-5 md:p-8">
        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true" aria-live="polite">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col rounded-xl border border-violet-200/60 dark:border-violet-500/20 bg-white/70 dark:bg-slate-800/60 overflow-hidden animate-pulse">
                <div className="h-[200px] bg-slate-200 dark:bg-slate-700" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
                  <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {productsData?.content?.length > 0 ? (
              <>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {productsData.content.slice(0, PAGE_SIZE).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="mt-10">
                  <Pagination
                    currentPage={filters.page + 1}
                    totalPages={productsData.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              <div className="empty-state">
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Nenhum produto encontrado</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Ajuste sua busca ou filtros.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Home
