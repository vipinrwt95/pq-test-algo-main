import classNames from 'classnames'
import { Pagination as PaginationComponent, PaginationItem, PaginationLink } from 'reactstrap'
import { getSiblingPaginatedNumbers } from '../../functions/getSiblingPaginatedNumbers'

interface PaginationProps {
  pageNumber: number
  totalPages: number
  onClickPageNumber: (pageNumber: number | string) => void // pageNumber can be '...' string
  onClickPrev: () => void
  onClickNext: () => void
}

const Pagination = (props: PaginationProps) => {
  const { pageNumber, totalPages, onClickPageNumber, onClickPrev, onClickNext } = props

  return (
    <nav className="m-b-20 m-t-50" aria-label="Page navigation example">
      <PaginationComponent
        className="pagination justify-content-center pagination-primary"
        aria-label="Page navigation example"
      >
        <PaginationItem disabled={pageNumber === 1} onClick={() => pageNumber > 1 && onClickPrev()}>
          <PaginationLink>Previous</PaginationLink>
        </PaginationItem>

        {getSiblingPaginatedNumbers({
          breadth: 3,
          currentPageNumber: pageNumber,
          lastPageNumber: totalPages,
        }).map((buttonText, index) => (
          <PaginationItem
            key={index}
            className={classNames({ 'pe-none': pageNumber === buttonText })}
            onClick={() => onClickPageNumber(buttonText)}
            active={pageNumber === buttonText}
          >
            <PaginationLink>{buttonText}</PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem disabled={pageNumber === totalPages} onClick={() => pageNumber < totalPages && onClickNext()}>
          <PaginationLink>Next</PaginationLink>
        </PaginationItem>
      </PaginationComponent>
    </nav>
  )
}

export default Pagination
