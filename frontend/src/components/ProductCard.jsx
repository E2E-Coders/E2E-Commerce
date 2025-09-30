import { Link, useNavigate } from 'react-router-dom'
import { Star, ShoppingCart } from 'lucide-react'
import { useMutation, useQueryClient } from 'react-query'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'
import toast from 'react-hot-toast'

function ProductCard({ product }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const queryClient = useQueryClient()

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
          size={12}
          className={i <= rating ? 'star' : 'star empty'}
          fill={i <= rating ? 'currentColor' : 'none'}
        />
      )
    }
    return stars
  }

  const price = product.price_final ? 
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(product.price_final) :
    formatPrice(product.priceCents)

  // Add to cart mutation
  const addToCartMutation = useMutation(
    async (cartData) => {
      const response = await api.post('/cart', cartData)
      return response.data.data
    },
    {
      onSuccess: () => {
        toast.success('Produto adicionado ao carrinho!')
        queryClient.invalidateQueries(['cart'])
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || 'Erro ao adicionar ao carrinho')
      }
    }
  )

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      navigate('/login')
      return
    }
    
    addToCartMutation.mutate({
      productId: product.id,
      quantity: 1
    })
  }

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-link">
        <div className="product-image">
          <img 
            src={product.imageUrl || "/placeholder-product.svg"} 
            alt={product.title}
            onError={(e) => {
              e.target.src = "/placeholder-product.svg";
            }}
          />
        </div>
      </Link>
      
      <div className="product-info">
        <Link to={`/products/${product.id}`} className="product-title-link">
          <h3 className="product-title">{product.title}</h3>
        </Link>
        
        <div className="product-rating">
          <div className="stars">
            {renderStars(product.rating || 4)}
          </div>
          <span className="rating-count">({product.reviews || Math.floor(Math.random() * 1000) + 10})</span>
        </div>
        
        <div className="product-price">
          {price}
        </div>
        
        <p className="product-description">{product.description}</p>
        
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || addToCartMutation.isLoading}
          className="btn btn-cart"
        >
          <ShoppingCart size={16} />
          {product.stock === 0 ? 'Fora de Estoque' : 'Adicionar ao Carrinho'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
