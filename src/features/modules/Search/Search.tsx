import classNames from 'classnames'
import { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Card, CardBody, CardHeader, Collapse, Spinner } from 'reactstrap'
import { usePropCallback } from 'src/features/hooks/usePropCallback'
import { Btn, H5 } from 'src/features/utils/ReusableElements'

export type SearchItemPillProps = { name: string; id: number; count: number; canDelete: boolean }
export type HandleAddSearch = (searchName: string) => void
export type HandleDeleteSearch = (searchId: number) => void
export type HandleSelectedSearchIds = (searchIds: number[]) => void

interface SearchProps {
  searchQuery: string
  handleSearch: (searchQuery: string) => void
  // isLoadingSearch is the truthy when isLoadingBlogPost is truthy
  isLoadingSearch?: boolean
  searchFieldOnly?: boolean
}

const Search = (props: SearchProps) => {
  const { searchFieldOnly, searchQuery, handleSearch: handleSearchProp, isLoadingSearch } = props
  const [isSearchOpen, setIsSearchOpen] = useState(true)
  const [searchVal, setSearchVal] = useState(searchQuery)

  useEffect(() => {
    setSearchVal(searchQuery)
  }, [searchQuery])

  const handleSearch = usePropCallback(handleSearchProp)

  useEffect(() => {
    handleSearch.current(searchVal)
  }, [handleSearch, searchVal])

  const handleClear = useCallback((event: SyntheticEvent<HTMLSpanElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setSearchVal('')
  }, [])

  const searchField = useMemo(
    () => (
      <div className="d-flex position-relative mb-0">
        <input
          type="text"
          value={searchVal}
          onInput={(event) => setSearchVal(event.currentTarget.value)}
          className="form-control"
          placeholder="Search..."
        />
      </div>
    ),
    [searchVal]
  )

  if (searchFieldOnly) {
    return searchField
  }

  return (
    <Card>
      <CardHeader>
        <H5 attrH5={{ className: 'mb-0 p-0' }}>
          <Btn
            attrBtn={{
              className: 'btn btn-link ps-0',
              color: 'transparent',
              onClick: () => setIsSearchOpen((prev) => !prev),
            }}
          >
            <div className="d-flex align-items-center w-100">
              <span>Search</span>

              {isSearchOpen && (
                <span
                  role="button"
                  style={{ width: 'auto', fontWeight: 400 }}
                  className="btn btn-outline ms-auto pq-hover-underline p-0 txt-primary"
                  onClick={handleClear}
                >
                  clear
                </span>
              )}
            </div>
          </Btn>
        </H5>
      </CardHeader>
      <Collapse isOpen={isSearchOpen}>
        <CardBody
          className={classNames('filter-cards-view animate-chk p-relative animate-chk', {
            'pe-none': isLoadingSearch,
          })}
          style={{ opacity: isLoadingSearch ? 0.5 : 1 }}
        >
          {isLoadingSearch && (
            <div style={{ zIndex: 1 }} className="z-1 position-absolute top-50 start-50 translate-middle">
              <Spinner className="txt-primary" />
            </div>
          )}

          {searchField}
        </CardBody>
      </Collapse>
    </Card>
  )
}

export default Search
