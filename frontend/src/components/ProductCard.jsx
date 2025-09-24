import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

function ProductCard({ product }) {
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
          size={16}
          className={i <= rating ? 'star' : 'star empty'}
          fill={i <= rating ? 'currentColor' : 'none'}
        />
      )
    }
    return stars
  }

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <div className="product-image">
          <img 
            src={product.imageUrl || "/placeholder-product.svg"} 
            alt={product.title}
            onError={(e) => {
              e.target.src = "/placeholder-product.svg";
            }}
          />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-description">{product.description}</p>
          <div className="product-price">
            {formatPrice(product.priceCents)}
          </div>
          {product.reviews && product.reviews.length > 0 && (
            <div className="product-rating">
              <div className="stars">
                {renderStars(Math.round(product.averageRating || 0))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviewCount || product.reviews.length})
              </span>
            </div>
          )}
              <div className="text-sm text-gray-500">
                Estoque: {product.stock}
              </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
