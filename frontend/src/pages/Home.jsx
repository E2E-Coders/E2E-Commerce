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
  const PAGE_SIZE = 20
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
    <div className="container pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 tracking-tight">Catálogo de Produtos</h1>
        <p className="text-gray-600 dark:text-slate-300 text-sm">Navegue pelo catálogo. 20 itens por página.</p>
      </div>

      {/* Barra de filtros removida para visual Amazon-like simplificado */}

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-pulse" aria-busy="true" aria-live="polite">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
              <div className="h-40 bg-slate-200 dark:bg-slate-700" />
              <div className="p-3 space-y-2">
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
              <div className="flex items-center justify-between mb-3 text-sm text-gray-600 dark:text-slate-400" aria-live="polite">
                <span>Pagina {filters.page + 1} de {productsData.totalPages}</span>
                <span>Total: {productsData.totalElements} itens</span>
              </div>
              <div className="product-grid">
                {productsData.content.slice(0, PAGE_SIZE).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <Pagination
                currentPage={filters.page + 1}
                totalPages={productsData.totalPages}
                onPageChange={handlePageChange}
              />

              <div className="text-center text-gray-600 dark:text-slate-400 mb-6">
                Showing {Math.min(productsData.content.length, PAGE_SIZE)} of {productsData.totalElements} products
              </div>
            </>
          ) : (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Home
