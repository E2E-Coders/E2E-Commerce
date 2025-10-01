import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null

  const windowSize = 5
  let start = Math.max(1, currentPage - 2)
  let end = Math.min(totalPages, start + windowSize - 1)
  if (end - start + 1 < windowSize) start = Math.max(1, end - windowSize + 1)

  const pages = []
  for (let p = start; p <= end; p++) pages.push(p)

  const baseBtn = 'w-10 h-10 inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors border backdrop-blur-sm'
  const variant = (active, disabled) => {
    if (disabled) return 'border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed bg-white/40 dark:bg-slate-800/40'
    if (active) return 'border-violet-500 bg-violet-600 text-white shadow hover:bg-violet-500'
    return 'border-violet-200/60 dark:border-violet-500/30 text-violet-700 dark:text-violet-300 bg-white/70 dark:bg-slate-800/60 hover:bg-violet-50 dark:hover:bg-violet-700/40'
  }

  const iconBtn = (disabled) => `${baseBtn} ${variant(false, disabled)} text-xs`

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap gap-2 justify-center">
        <button aria-label="Primeira página" onClick={() => onPageChange(1)} disabled={currentPage === 1} className={iconBtn(currentPage===1)}>
          <ChevronsLeft size={16} />
        </button>
        <button aria-label="Página anterior" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={iconBtn(currentPage===1)}>
          <ChevronLeft size={16} />
        </button>
        {pages.map(p => (
          <button
            key={p}
            aria-current={p === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(p)}
            className={`${baseBtn} ${variant(p === currentPage, false)}`}
          >
            {p}
          </button>
        ))}
        <button aria-label="Próxima página" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={iconBtn(currentPage===totalPages)}>
          <ChevronRight size={16} />
        </button>
        <button aria-label="Última página" onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className={iconBtn(currentPage===totalPages)}>
          <ChevronsRight size={16} />
        </button>
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 tracking-wide">
        Página <span className="font-semibold text-violet-600 dark:text-violet-400">{currentPage}</span> de {totalPages}
      </div>
    </div>
  )
}

export default Pagination
