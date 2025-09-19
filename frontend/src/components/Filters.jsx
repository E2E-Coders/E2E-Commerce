import { useState } from 'react'
import { Search, Filter } from 'lucide-react'

function Filters({ onFiltersChange, categories }) {
  const [filters, setFilters] = useState({
    q: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: 'createdAt',
    direction: 'desc'
  })

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onFiltersChange(filters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      q: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sort: 'createdAt',
      direction: 'desc'
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  return (
    <div className="filters">
      <form onSubmit={handleSubmit}>
        <div className="filters-grid">
          <div className="form-group">
            <label className="form-label">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                className="form-input pl-10"
                placeholder="Buscar produtos..."
                value={filters.q}
                onChange={(e) => handleFilterChange('q', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Categoria</label>
            <select
              className="form-input form-select"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">Todas as Categorias</option>
              {categories?.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Preço Mínimo</label>
            <input
              type="number"
              className="form-input"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Preço Máximo</label>
            <input
              type="number"
              className="form-input"
              placeholder="1000"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Ordenar Por</label>
            <select
              className="form-input form-select"
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
            >
              <option value="createdAt">Data</option>
              <option value="priceCents">Preço</option>
              <option value="title">Nome</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Ordem</label>
            <select
              className="form-input form-select"
              value={filters.direction}
              onChange={(e) => handleFilterChange('direction', e.target.value)}
            >
              <option value="desc">Decrescente</option>
              <option value="asc">Crescente</option>
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary w-full">
              <Filter size={16} />
              Aplicar Filtros
            </button>
          </div>

          <div className="form-group">
            <button type="button" onClick={clearFilters} className="btn btn-outline w-full">
              Limpar Filtros
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Filters
