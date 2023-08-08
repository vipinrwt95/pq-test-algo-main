import { Fragment, useEffect, useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import { useGetLinksQuery, useUpdateLinkOrderMutation } from 'src/features/services/api/linksApi/linksApi'
import { FormLinkProps } from '../types'
import { LinkItems, UpdateLinkOrderRequest } from 'src/features/services/api/linksApi/interface'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import WithSpinnerLinks from '../reusable/WithSpinnerLinks'
import { cloneDeep } from 'lodash'
import { arrayElementSwap } from 'src/features/utils/functions/arrayElementSwap'

const GetLinks = (props: FormLinkProps) => {
  const { data, isLoading, isFetching } = useGetLinksQuery(props.centerId, {
    skip: props.centerId <= 0 ? true : false,
  })

  const [stateLinks, setStateLinks] = useState<LinkItems[] | undefined>()

  useEffect(() => {
    setStateLinks(data?.items)
  }, [data])

  const [updateLinkOrder] = useUpdateLinkOrderMutation()

  const onDragEnd = (dropResult: DropResult, links: LinkItems[]) => {
    const sourceIndex = dropResult.source.index
    const reason = dropResult.reason

    const source = dropResult.source

    if (!dropResult.destination) return

    const destination = dropResult.destination
    const destinationIndex = dropResult.destination.index

    if (reason === 'CANCEL') {
      return
    }

    // dropped at the same place, so no changes
    if (destinationIndex === sourceIndex && destination?.droppableId === source.droppableId) {
      return
    }

    const stateCopy = cloneDeep(links)
    const ordering2 = stateCopy[destinationIndex].ordering

    stateCopy[destinationIndex].ordering = stateCopy[sourceIndex].ordering
    stateCopy[sourceIndex].ordering = ordering2

    arrayElementSwap(stateCopy, sourceIndex, destinationIndex)
    setStateLinks(stateCopy)

    const dataToBeSent = stateCopy.map((item, index) => ({ id: item.id, ordering: index + 1 }))

    const updateLinkOrderData: UpdateLinkOrderRequest = {
      center_id: props.centerId,
      items: dataToBeSent,
    }

    updateLinkOrder(updateLinkOrderData)
  }

  return (
    <Fragment>
      <Card>
        <CardBody className="p-0">
          <WithSpinnerLinks isLoading={isLoading || isFetching}>
            <CardBody className="p-0 pq-no-select">
              <div className="taskadd">
                <div className="table-responsive" style={{ overflowY: 'hidden' }}>
                  {stateLinks && stateLinks.length > 0 && (
                    <DragDropContext
                      onDragEnd={(params) => {
                        onDragEnd(params, stateLinks)
                      }}
                    >
                      {/*  */}
                    </DragDropContext>
                  )}
                </div>
              </div>
            </CardBody>
          </WithSpinnerLinks>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default GetLinks
