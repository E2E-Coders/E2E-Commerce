import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { ChevronLeft, ChevronRight, Percent, ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'

// Select products tagged as promotions (placeholder logic: top priced unique categories)
export default function PromoCarousel() {
  const [items, setItems] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get('/products')
        const all = res.data.data.content || []
        const promos = all.filter(p => p.promo).sort((a,b)=> b.priceCents - a.priceCents)
        if (active) setItems(promos)
      } catch (e) {
        console.error('Promo load error', e)
      }
    }
    load()
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (items.length === 0) return
    const id = setInterval(() => setIndex(i => (i + 1) % items.length), 5000)
    return () => clearInterval(id)
  }, [items])

  const current = items[index]

  const addToCart = async () => {
    if (!current) return
    try {
      await api.post('/cart', { productId: current.id, quantity: 1 })
      toast.success('Adicionado com 40% OFF!')
    } catch (e) {
      toast.error(e.message || 'Erro ao adicionar')
    }
  }

  if (!current) return null

  const formatPrice = (cents) => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(cents/100)

  return (
    <div className="relative w-full overflow-hidden rounded-lg mb-8 shadow group bg-gradient-to-r from-indigo-600 to-blue-600 text-white" role="region" aria-roledescription="carousel" aria-label="Promoções" aria-live="polite">
      <div className="p-6 flex flex-col md:flex-row items-center gap-6 transition-all">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-yellow-300 font-semibold mb-2">
            <Percent size={18} /> Promoção da Semana – até 40% OFF
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow">
            {current.title}
          </h3>
          <p className="text-sm md:text-base text-blue-50/90 line-clamp-3 mb-4 max-w-2xl">{current.description}</p>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold">{formatPrice(Math.round(current.priceCents * 0.6))}</span>
            <span className="line-through opacity-70">{formatPrice(current.priceCents)}</span>
            <span className="bg-yellow-400 text-slate-900 px-2 py-0.5 rounded text-xs font-semibold">40% OFF</span>
          </div>
          <button onClick={addToCart} className="inline-flex items-center gap-2 bg-white text-slate-900 font-medium text-sm px-4 py-2 rounded shadow hover:bg-slate-100 transition">
            <ShoppingCart size={16} /> Adicionar ao Carrinho
          </button>
        </div>
        <div className="w-48 h-48 flex items-center justify-center bg-white/10 backdrop-blur rounded-md">
          <img src={current.imageUrl || '/placeholder-product.svg'} alt={current.title} className="object-contain w-full h-full p-4" />
        </div>
      </div>
      <button aria-label="Anterior" onClick={() => setIndex(i => (i - 1 + items.length) % items.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur transition opacity-0 group-hover:opacity-100">
        <ChevronLeft size={20} />
      </button>
      <button aria-label="Próximo" onClick={() => setIndex(i => (i + 1) % items.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur transition opacity-0 group-hover:opacity-100">
        <ChevronRight size={20} />
      </button>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {items.map((_, i) => (
          <button key={i} aria-label={`Ir para promoção ${i+1}`} aria-current={i===index} onClick={() => setIndex(i)} className={`h-2 w-2 rounded-full ${i===index? 'bg-white':'bg-white/40'}`}></button>
        ))}
      </div>
    </div>
  )
}
