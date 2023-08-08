import React, { Fragment } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { usePageOnLoadMessage } from 'src/features/hooks/usePageOnLoadMessage'
import { Image } from '../../../utils/ReusableElements'
import LoginForm from './LoginForm'
import { toast } from 'react-toastify'

const Login = () => {
  usePageOnLoadMessage((message) => {
    toast(message)
  })

  return (
    <Fragment>
      <section>
        <Container fluid={true}>
          <Row>
            <Col xl="7">
              <Image
                attrImage={{
                  className: 'bg-img-cover bg-center',
                  src: `${require('../../../../assets/images/login/loginTwo-bg.jpg')}`,
                  alt: 'looginpage',
                }}
              />
            </Col>
            <Col xl="5 p-0">
              <LoginForm />
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  )
}

export default Login
