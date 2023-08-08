import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import GetLinks from './links/GetLinks'
import AddLinks from './links/AddLinks'
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import LinkSettings from './links/LinkSettings'
import { useGetLinksQuery } from 'src/features/services/api/linksApi/linksApi'
import { setNoLinks } from './linksSlice'
import { AlertSelectCenter, InlineAlert } from 'src/features/utils/ReusableElements'
import { selectCenter } from 'src/features/layouts/mainLayout/header/CompanyAndCenterSelection/companyAndCenterSelectionSlice'
import { NO_LINK_FOUND } from 'src/features/constants/text'

function Links() {
  const selectedCenter = useAppSelector(selectCenter)
  const selectedCenterId = selectedCenter?.id

  const {
    data,
    isFetching: isFetchingDataLink,
    isLoading: isLoadingDataLink,
  } = useGetLinksQuery(selectedCenterId, {
    skip: selectedCenterId === undefined || selectedCenterId === 0 ? true : false,
  })

  const noLinks = useAppSelector((state) => state.link.noLinks)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data && data?.count === 0) {
      dispatch(setNoLinks(true))
    } else if (data && data?.count !== 0) {
      dispatch(setNoLinks(false))
    }
  }, [selectedCenterId, data, data?.settings, dispatch])

  if (!selectedCenterId) {
    return <AlertSelectCenter />
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h3 className="mb-4">Links</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12} xl={4}>
          <AddLinks centerId={selectedCenterId} />
          <LinkSettings centerId={selectedCenterId} />
        </Col>

        <Col xs={12} xl={8}>
          {noLinks && (!isLoadingDataLink || !isFetchingDataLink) && <InlineAlert message={NO_LINK_FOUND} />}

          {!noLinks && <GetLinks centerId={selectedCenterId} />}
        </Col>
      </Row>
    </Container>
  )
}

export default Links
