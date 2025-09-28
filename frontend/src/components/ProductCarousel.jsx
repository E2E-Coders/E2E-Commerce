import { useQuery } from 'react-query'
import { api } from '../services/api'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import ProductCard from './ProductCard'

export default function ProductCarousel({ title, category }) {
  const { data, isLoading } = useQuery(['carousel', category], async () => {
    const params = new URLSearchParams({ page: '0', size: '10', category })
    const res = await api.get(`/products?${params}`)
    return res.data.data?.content || []
  })

  const scrollerRef = useRef(null)
  const [scrollPos, setScrollPos] = useState(0)

  const scroll = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = 320
    const next = dir === 'left' ? Math.max(0, scrollPos - amount) : Math.min(el.scrollWidth, scrollPos + amount)
    el.scrollTo({ left: next, behavior: 'smooth' })
    setScrollPos(next)
  }

  if (isLoading) {
    return (
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3 px-2">{title}</h2>
        <div className="flex gap-4 overflow-hidden px-2 animate-pulse">
          {Array.from({ length: 5 }).map((_,i)=>(<div key={i} className="w-72 h-64 bg-slate-200 dark:bg-slate-700 rounded" />))}
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) return null

  return (
    <section className="mb-10 group relative" aria-label={title}>
      <h2 className="text-xl font-semibold mb-3 px-2 flex items-center gap-2">
        <span className="text-indigo-600 dark:text-indigo-400">▣</span> {title}
      </h2>
      <button onClick={()=>scroll('left')} aria-label="Anterior" className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-900/70 hover:bg-slate-900 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"><ChevronLeft size={20}/></button>
      <div ref={scrollerRef} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-2 pb-2" style={{scrollbarWidth:'none'}}>
        {data.map(p => (
          <div key={p.id} className="min-w-[288px] max-w-[288px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <button onClick={()=>scroll('right')} aria-label="Próximo" className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-900/70 hover:bg-slate-900 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"><ChevronRight size={20}/></button>
    </section>
  )
}
