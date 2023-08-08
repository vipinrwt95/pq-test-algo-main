import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Btn } from '..'

const CommonModal = (props: {
  isOpen: boolean
  toggler: () => void
  size?: string
  title: string
  bodyClass?: string
  submitFunction: (e: any) => Promise<void>
  formId: string
  isLoading: boolean
  submitButtonTitle: string
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | Iterable<React.ReactNode>
    | null
    | undefined
}) => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggler} size={props.size} centered>
      <ModalHeader toggle={props.toggler}>{props.title}</ModalHeader>
      <ModalBody className={props.bodyClass}>{props.children}</ModalBody>
      <ModalFooter>
        <Btn attrBtn={{ color: 'light', onClick: props.toggler }}>{'Cancel'}</Btn>
        <Btn
          attrBtn={{ color: 'primary', onclick: props.submitFunction, form: props.formId, disabled: props.isLoading }}
          type="submit"
        >
          {props.isLoading ? 'Loading...' : props.submitButtonTitle}
        </Btn>
      </ModalFooter>
    </Modal>
  )
}

export default CommonModal
