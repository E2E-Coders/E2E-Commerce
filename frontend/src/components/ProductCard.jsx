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
    <div className="group flex flex-col rounded-xl border border-violet-200/60 dark:border-violet-500/20 bg-white/70 dark:bg-slate-800/60 shadow-sm hover:shadow-violet-300/40 dark:hover:shadow-violet-800/30 transition-shadow backdrop-blur-sm overflow-hidden">
      <Link to={`/products/${product.id}`} className="flex flex-col h-full">
        <div className="relative flex items-center justify-center bg-gradient-to-br from-violet-100 via-violet-50 to-fuchsia-50 dark:from-violet-900/40 dark:via-violet-800/30 dark:to-fuchsia-900/30 w-full" style={{height:'200px'}}>
          <img
            src={product.imageUrl || '/placeholder-product.svg'}
            alt={product.title}
            loading="lazy"
            onError={(e) => { e.target.src = '/placeholder-product.svg' }}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.06]"
          />
          {product.stock === 0 && (
            <span className="absolute top-2 left-2 bg-red-600/90 backdrop-blur text-white text-[10px] font-semibold px-2 py-1 rounded-md shadow">
              SEM ESTOQUE
            </span>
          )}
          {product.promo && product.stock > 0 && (
            <span className="absolute top-2 right-2 bg-amber-300/95 text-slate-900 text-[10px] font-bold px-2 py-1 rounded-md shadow">
              40% OFF
            </span>
          )}
        </div>
        <div className="flex flex-col flex-1 p-4">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-tight line-clamp-2 min-h-[2.4rem] tracking-tight">{product.title}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 mb-3 line-clamp-2">{product.description}</p>
          <div className="mt-auto space-y-2">
            <div className="flex items-center gap-2 text-[15px] font-bold text-emerald-600 dark:text-emerald-400">
              {product.promo ? (
                <>
                  <span>{formatPrice(Math.round(product.priceCents * 0.6))}</span>
                  <span className="line-through text-[11px] text-slate-400">{formatPrice(product.priceCents)}</span>
                </>
              ) : (
                <span>{formatPrice(product.priceCents)}</span>
              )}
            </div>
            {product.reviews && product.reviews.length > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex">
                  {renderStars(Math.round(product.averageRating || 0))}
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">({product.reviewCount || product.reviews.length})</span>
              </div>
            )}
            <div className="text-[11px] text-slate-500 dark:text-slate-400" aria-live="polite">Estoque: {product.stock}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
