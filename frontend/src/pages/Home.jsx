import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { api } from '../services/api'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'
import Pagination from '../components/Pagination'
import PromoCarousel from '../components/PromoCarousel'

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialFilters = {
    q: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    categorySlug: searchParams.get('categorySlug') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'createdAt',
    direction: searchParams.get('direction') || 'desc',
    page: parseInt(searchParams.get('page') || '0'),
    size: parseInt(searchParams.get('size') || '20')
  }
  const [filters, setFilters] = useState(initialFilters)

  // Sync filters -> URL
  useEffect(() => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k,v]) => {
      if (v !== '' && v !== null && v !== undefined) params.set(k, v)
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
        if (value !== '') {
          params.append(key, value)
        }
      })

      const response = await api.get(`/products?${params}`)
      return response.data.data
    },
    {
      keepPreviousData: true
    }
  )

  const handleFiltersChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 0 }))
  }

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
    <div className="container">
      <PromoCarousel />
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">E2E Marketplace</h1>
        <p className="text-gray-600 dark:text-slate-300">Discover amazing products at great prices</p>
      </div>

      <Filters
        onFiltersChange={handleFiltersChange}
        categories={categoriesData}
      />

      {isLoading ? (
        <div className="loading">
          Carregando produtos...
        </div>
      ) : (
        <>
          {productsData?.content?.length > 0 ? (
            <>
              <div className="product-grid">
                {productsData.content.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <Pagination
                currentPage={filters.page + 1}
                totalPages={productsData.totalPages}
                onPageChange={handlePageChange}
              />

              <div className="text-center text-gray-600 dark:text-slate-400 mb-6">
                Showing {productsData.content.length} of {productsData.totalElements} products
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
