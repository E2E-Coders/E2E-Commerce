import { ChevronLeft, ChevronRight } from 'lucide-react'

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null
  const windowSize = 5
  let start = Math.max(1, currentPage - 2)
  let end = Math.min(totalPages, start + windowSize - 1)
  if (end - start + 1 < windowSize) {
    start = Math.max(1, end - windowSize + 1)
  }
  const pages = []
  for (let p = start; p <= end; p++) pages.push(p)

  const jumpForward = () => onPageChange(Math.min(totalPages, currentPage + windowSize))
  const jumpBack = () => onPageChange(Math.max(1, currentPage - windowSize))

  return (
    <div className="pagination flex flex-wrap gap-1 justify-center">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className="btn btn-outline">Primeira</button>
      <button onClick={jumpBack} disabled={currentPage === 1} className="btn btn-outline">-5</button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="btn btn-outline">
        <ChevronLeft size={16} /> Prev
      </button>
      {pages.map(p => (
        <button key={p} onClick={() => onPageChange(p)} className={`btn ${p === currentPage ? 'btn-primary' : 'btn-outline'}`}>{p}</button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-outline">
        Next <ChevronRight size={16} />
      </button>
      <button onClick={jumpForward} disabled={currentPage === totalPages} className="btn btn-outline">+5</button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className="btn btn-outline">Última</button>
    </div>
  )
}

export default Pagination
