import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { api } from '../services/api'
import { Plus, Edit, Trash2, Package } from 'lucide-react'
import toast from 'react-hot-toast'

function Seller() {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceCents: '',
    stock: '',
    categoryId: ''
  })

  // Fetch seller's products
  const { data: productsData, isLoading, error } = useQuery(
    'seller-products',
    async () => {
      const response = await api.get('/seller/products')
      return response.data.data
    }
  )

  // Fetch categories
  const { data: categoriesData } = useQuery(
    'seller-categories',
    async () => {
      const response = await api.get('/seller/categories')
      return response.data.data
    }
  )

  // Create/Update product mutation
  const saveProductMutation = useMutation(
    async (productData) => {
      if (editingProduct) {
        const response = await api.put(`/seller/products/${editingProduct.id}`, productData)
        return response.data.data
      } else {
        const response = await api.post('/seller/products', productData)
        return response.data.data
      }
    },
    {
      onSuccess: () => {
        toast.success(editingProduct ? 'Product updated!' : 'Product created!')
        queryClient.invalidateQueries('seller-products')
        resetForm()
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || 'Failed to save product')
      }
    }
  )

  // Delete product mutation
  const deleteProductMutation = useMutation(
    async (productId) => {
      const response = await api.delete(`/seller/products/${productId}`)
      return response.data
    },
    {
      onSuccess: () => {
        toast.success('Product deleted!')
        queryClient.invalidateQueries('seller-products')
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || 'Failed to delete product')
      }
    }
  )

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priceCents: '',
      stock: '',
      categoryId: ''
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      description: product.description || '',
      priceCents: product.priceCents.toString(),
      stock: product.stock.toString(),
      categoryId: product.category.id.toString()
    })
    setShowForm(true)
  }

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(productId)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    saveProductMutation.mutate({
      title: formData.title,
      description: formData.description,
      priceCents: parseInt(formData.priceCents),
      stock: parseInt(formData.stock),
      categoryId: parseInt(formData.categoryId)
    })
  }

  const formatPrice = (priceCents) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(priceCents / 100)
  }

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">Carregando produtos...</div>
      </div>
    )
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Product Form */}
      {showForm && (
        <div className="card mb-6">
          <div className="card-header">
            <h2 className="text-xl font-semibold">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-input form-select"
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    required
                  >
                    <option value="">Select Category</option>
                    {categoriesData?.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Price (cents)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.priceCents}
                    onChange={(e) => setFormData({ ...formData, priceCents: e.target.value })}
                    placeholder="9999"
                    required
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Enter price in cents (e.g., 9999 = $99.99)
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">Stock Quantity</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="10"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your product..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={saveProductMutation.isLoading}
                  className="btn btn-primary"
                >
                  {saveProductMutation.isLoading ? 'Saving...' : 'Save Product'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de Produtos */}
      {productsData?.content && productsData.content.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsData.content.map(product => (
            <div key={product.id} className="card">
              <div className="product-image">
                <Package size={48} className="text-gray-400" />
              </div>
              <div className="card-body">
                <h3 className="font-semibold mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-green-600">
                    {formatPrice(product.priceCents)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  Category: {product.category?.name}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="btn btn-sm btn-outline flex-1"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-sm btn-danger"
                    disabled={deleteProductMutation.isLoading}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Package size={64} className="mx-auto mb-4 text-gray-400" />
          <h3>No products yet</h3>
          <p>Add your first product to get started!</p>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary mt-4"
          >
            Add Product
          </button>
        </div>
      )}

      {productsData?.totalPages > 1 && (
        <div className="text-center text-gray-600 mt-6">
          Showing {productsData.content.length} of {productsData.totalElements} products
        </div>
      )}
    </div>
  )
}

export default Seller
