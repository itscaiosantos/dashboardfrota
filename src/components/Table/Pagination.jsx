import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + 4);

  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }

  return (
    <div className="pagination">
      <button
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Página anterior"
      >
        <ChevronLeft size={14} />
      </button>

      {start > 1 && (
        <>
          <button
            className={`page-btn ${currentPage === 1 ? 'active' : ''}`}
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {start > 2 && <span className="pagination-ellipsis">&hellip;</span>}
        </>
      )}

      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(p => (
        <button
          key={p}
          className={`page-btn ${currentPage === p ? 'active' : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="pagination-ellipsis">&hellip;</span>}
          <button
            className={`page-btn ${currentPage === totalPages ? 'active' : ''}`}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Próxima página"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
