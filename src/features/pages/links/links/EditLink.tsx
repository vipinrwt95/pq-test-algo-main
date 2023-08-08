import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, ModalFooter, Button } from 'reactstrap'
import { UpdateLinkRequest } from 'src/features/services/api/linksApi/interface'
import { useUpdateLinkMutation } from 'src/features/services/api/linksApi/linksApi'

type EditLinkProps = {
  center_id: number
  link_id: number
  linkTitle: string
  link: string
}
const EditLink = (props: EditLinkProps) => {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm()
  const [modal, setModal] = useState(false)

  const [title, setTitle] = useState(props.linkTitle)
  const [link, setLink] = useState(props.link)

  const [editLink, { isLoading }] = useUpdateLinkMutation()

  const editLinkData: UpdateLinkRequest = {
    center_id: props.center_id,
    link_id: props.link_id,
    title: title,
    link: link,
  }

  const toggle = () => {
    if (modal === true) {
      reset({
        title: title,
        link: link,
      })
      setModal(false)
    } else if (modal === false) {
      setModal(true)
    }
  }

  const editCompanyFormSubmit = async () => {
    await editLink(editLinkData)
      .unwrap()
      .then(() => {
        toggle()
      })
  }
  const style2 = { padding: '4px 12px', cursor: 'pointer' }

  return (
    <Fragment>
      <input type="button" style={style2} className="pq-jsgrid-icon pq-jsgrid-edit-icon" onClick={toggle} />
      <Modal isOpen={modal} toggle={toggle} size={'xs'} centered>
        <ModalHeader toggle={toggle}>Edit Link</ModalHeader>
        <ModalBody>
          <Form
            className="theme-form mega-form needs-validation"
            onSubmit={handleSubmit(editCompanyFormSubmit)}
            id="EditLinksForm"
            noValidate={true}
          >
            <FormGroup>
              <Label>Title</Label>
              <input
                className="form-control"
                disabled={isLoading}
                defaultValue={props.linkTitle}
                type="text"
                placeholder=""
                {...register('title', {
                  required: { value: true, message: 'Title is required' },
                  onChange: (e) => {
                    trigger('title')
                    setTitle(e.target.value)
                  },
                  onBlur: () => {
                    trigger('title')
                  },
                })}
              />
              <span className="small text-danger">{errors?.title?.message}</span>
            </FormGroup>

            <FormGroup>
              <Label>Link</Label>
              <input
                className="form-control"
                disabled={isLoading}
                defaultValue={props.link}
                type="text"
                placeholder=""
                {...register('link', {
                  required: { value: true, message: 'Link is required' },
                  pattern: {
                    value:
                      /((?:(?:http?|ftp)[s]*:\/\/)+[a-z0-9-%\\/\\&=?\\.]+\.[a-z]{2,4}\/?([^\s<>\\#%"\\,\\{\\}\\|\\\\^\\[\]`]+)?)/gi,
                    message: 'Invalid link. Link should start with http:// or https://',
                  },
                  onChange: (e) => {
                    trigger('link')
                    setLink(e.target.value)
                  },
                  onBlur: () => {
                    trigger('link')
                  },
                })}
              />
              <span className="small text-danger">{errors?.link?.message}</span>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {/* <Button
            color="light"
            onClick={() => {
              toggle()
            }}
          >
            {'Cancel'}
          </Button> */}
          <Button color="primary" disabled={isLoading} form="EditLinksForm" type="submit">
            {isLoading ? 'Loading...' : 'Save Changes'}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default EditLink
