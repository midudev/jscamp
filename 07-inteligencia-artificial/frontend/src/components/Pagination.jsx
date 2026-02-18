import styles from './Pagination.module.css'

export function Pagination ({ currentPage = 1, totalPages = 10, onPageChange }) {
  // generar un array de páginas a mostrar
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const stylePrevButton = isFirstPage ? { pointerEvents: 'none', opacity: 0.5 } : {}
  const styleNextButton = isLastPage ? { pointerEvents: 'none', opacity: 0.5 } : {}

  const handlePrevClick = (event) => {
    event.preventDefault()
    if (isFirstPage === false) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextClick = (event) => {
    event.preventDefault()
    if (isLastPage === false) {
      onPageChange(currentPage + 1)
    }
  }

  const handleChangePage = (event) => {
    event.preventDefault()
    const page = Number(event.target.dataset.page)

    if (page !== currentPage) {
      onPageChange(page)
    }
  }

  const buildPageUrl = (page) => {
    const url = new URL(window.location)
    url.searchParams.set('page', page)
    return `${url.pathname}?${url.searchParams.toString()}`
  }

  return (
    <nav className={styles.pagination}>
      
      <a href={buildPageUrl(currentPage - 1)} style={stylePrevButton} onClick={handlePrevClick}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </a>
      

      {pages.map((page) => (
        <a
          key={page}
          data-page={page}
          href={buildPageUrl(page)}
          className={currentPage === page ? styles.isActive : ''}
          onClick={handleChangePage}
        >
          {page}
        </a>
      ))}

      <a href={buildPageUrl(currentPage + 1)} style={styleNextButton} onClick={handleNextClick}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </a>

      
    </nav>
  )
}