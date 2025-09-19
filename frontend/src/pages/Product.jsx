import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  // Fetch product details
  const { data: product, isLoading, error } = useQuery(
    ['product', id],
    async () => {
      const response = await api.get(`/products/${id}`)
      return response.data.data
    }
  )

  // Fetch product reviews
  const { data: reviews } = useQuery(
    ['reviews', id],
    async () => {
      const response = await api.get(`/products/${id}/reviews`)
      return response.data.data
    }
  )

  // Add to cart mutation
  const addToCartMutation = useMutation(
    async (cartData) => {
      const response = await api.post('/cart', cartData)
      return response.data.data
    },
    {
      onSuccess: () => {
        toast.success('Product added to cart!')
        queryClient.invalidateQueries(['cart'])
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || 'Failed to add to cart')
      }
    }
  )

  // Add review mutation
  const addReviewMutation = useMutation(
    async (reviewData) => {
      const response = await api.post(`/products/${id}/reviews`, reviewData)
      return response.data.data
    },
    {
      onSuccess: () => {
        toast.success('Review added successfully!')
        setComment('')
        queryClient.invalidateQueries(['reviews', id])
        queryClient.invalidateQueries(['product', id])
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || 'Failed to add review')
      }
    }
  )

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login')
      return
    }
    addToCartMutation.mutate({
      productId: parseInt(id),
      quantity: quantity
    })
  }

  const handleAddReview = (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    addReviewMutation.mutate({
      rating: rating,
      comment: comment
    })
  }

  const formatPrice = (priceCents) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(priceCents / 100)
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={20}
          className={i <= rating ? 'star' : 'star empty'}
          fill={i <= rating ? 'currentColor' : 'none'}
        />
      )
    }
    return stars
  }

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">Carregando produto...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Product not found</h3>
          <p>The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline mb-4"
      >
        <ArrowLeft size={16} />
        Voltar aos Produtos
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="product-image" style={{ height: '400px' }}>
            <img 
              src={product.imageUrl || "/placeholder-product.jpg"} 
              alt={product.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              onError={(e) => {
                e.target.src = "/placeholder-product.jpg";
              }}
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="text-2xl font-bold text-green-600 mb-4">
            {formatPrice(product.priceCents)}
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Category</h3>
            <p className="text-gray-700">{product.category?.name}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Stock</h3>
            <p className="text-gray-700">{product.stock} available</p>
          </div>

          {product.reviews && product.reviews.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Rating</h3>
              <div className="flex items-center gap-2">
                <div className="stars">
                  {renderStars(Math.round(product.averageRating || 0))}
                </div>
                <span>({product.reviewCount || product.reviews.length} reviews)</span>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Quantity</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-btn"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="quantity-btn"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || addToCartMutation.isLoading}
            className="btn btn-primary btn-lg w-full"
          >
            <ShoppingCart size={20} />
            {product.stock === 0 ? 'Fora de Estoque' : 'Adicionar ao Carrinho'}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>

        {user && (
          <div className="card mb-6">
            <div className="card-body">
              <h3 className="font-semibold mb-4">Write a Review</h3>
              <form onSubmit={handleAddReview}>
                <div className="form-group">
                  <label className="form-label">Rating</label>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        size={24}
                        className={`cursor-pointer ${star <= rating ? 'star' : 'star empty'}`}
                        fill={star <= rating ? 'currentColor' : 'none'}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Comment</label>
                  <textarea
                    className="form-input form-textarea"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts about this product..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={addReviewMutation.isLoading}
                  className="btn btn-primary"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}

        {reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="card">
                <div className="card-body">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{review.user?.name}</h4>
                      <div className="stars">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="text-gray-700">{review.comment}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No reviews yet</h3>
            <p>Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Product
