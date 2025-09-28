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
    <div className="product-card uniform-card flex flex-col">
      <Link to={`/products/${product.id}`} className="flex flex-col h-full">
        <div className="product-image relative overflow-hidden">
          <img
            src={product.imageUrl || '/placeholder-product.svg'}
            alt={product.title}
            loading="lazy"
            onError={(e) => { e.target.src = '/placeholder-product.svg' }}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.stock === 0 && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded shadow">
              SEM ESTOQUE
            </span>
          )}
          {product.promo && product.stock > 0 && (
            <span className="absolute top-2 right-2 bg-yellow-300 text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow">
              40% OFF
            </span>
          )}
        </div>
        <div className="product-info flex flex-col flex-1">
          <h3 className="product-title line-clamp-2 min-h-[2.75rem]">{product.title}</h3>
          <p className="product-description line-clamp-2">{product.description}</p>
          <div className="mt-auto">
            <div className="product-price mb-2 flex items-center gap-2">
              {product.promo ? (
                <>
                  <span>{formatPrice(Math.round(product.priceCents * 0.6))}</span>
                  <span className="line-through text-xs text-gray-500">{formatPrice(product.priceCents)}</span>
                </>
              ) : (
                <span>{formatPrice(product.priceCents)}</span>
              )}
            </div>
            {product.reviews && product.reviews.length > 0 && (
              <div className="product-rating mb-2">
                <div className="stars">
                  {renderStars(Math.round(product.averageRating || 0))}
                </div>
                <span className="text-sm text-gray-600 dark:text-slate-400">
                  ({product.reviewCount || product.reviews.length})
                </span>
              </div>
            )}
            <div className="text-sm text-gray-500 dark:text-slate-400" aria-live="polite">Estoque: {product.stock}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
