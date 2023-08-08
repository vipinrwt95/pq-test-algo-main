import React, { Fragment } from 'react'
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { toast } from 'react-toastify'
import { ThemeConfigurations } from '../../../config/ThemeConfig'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Configuration, CopyText, Cancel } from '../../../utils/constants'

type Props = {
  modal: boolean
  toggle: () => void
}

function ConfigurationComponent(props: Props) {
  const themeConfiguration = ThemeConfigurations.data
  return (
    <Fragment>
      <Modal isOpen={props.modal} toggle={props.toggle} className="modal-body" centered={true}>
        <ModalHeader toggle={props.toggle}>{Configuration}</ModalHeader>
        <ModalBody>
          <Container fluid={true} className="bd-example-row">
            <Row>
              <p>{'To replace our design with your desired theme. Please do configuration as mention'} </p>
              <p>
                {' '}
                <b> {'Path : data > customizer > config.jsx '}</b>{' '}
              </p>
            </Row>
            <pre>
              <code>
                <div> {'export class ConfigDB '}&#123;</div>
                <div> {'static data'} = &#123;</div>
                <div> {'settings'}&#58; &#123;</div>
                <div>
                  {' '}
                  {'layout_type'}&#58; '{themeConfiguration.settings.layout_type}',
                </div>

                <div> {'sidebar'}&#58; &#123;</div>
                <div>
                  {' '}
                  {'type'}&#58; '{themeConfiguration.settings.sidebar.type}',
                </div>
                <div> &#125;,</div>
                <div>
                  {' '}
                  {'sidebar_setting'}&#58; '{themeConfiguration.settings.sidebar_setting}',{' '}
                </div>
                <div> &#125;,</div>
                <div> {'color'}&#58; &#123;</div>
                <div>
                  {' '}
                  {'primary_color'}&#58; '{themeConfiguration.color.primary_color}',{' '}
                </div>
                <div>
                  {' '}
                  {'secondary_color'}&#58; '{themeConfiguration.color.secondary_color}',{' '}
                </div>
                <div>
                  {' '}
                  {'mix_background_layout'}&#58; '{themeConfiguration.color.mix_background_layout}',{' '}
                </div>
                <div> &#125;,</div>
                <div>
                  {' '}
                  {'router_animation'}&#58; '{themeConfiguration.router_animation}'
                </div>
                <div> &#125;</div>
                <div> &#125;</div>
              </code>
            </pre>
          </Container>
        </ModalBody>
        <ModalFooter>
          <CopyToClipboard text={JSON.stringify(themeConfiguration)}>
            <Button
              color="primary"
              className="notification"
              onClick={() =>
                toast.success('Code Copied to clipboard !', {
                  position: toast.POSITION.BOTTOM_RIGHT,
                })
              }
            >
              {CopyText}
            </Button>
          </CopyToClipboard>
          <Button color="secondary" onClick={props.toggle}>
            {Cancel}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default ConfigurationComponent
