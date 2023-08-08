import React, { Fragment, useState } from 'react'
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { H4, Btn, P } from '../../../utils/ReusableElements'
import { Link, useNavigate } from 'react-router-dom'
import { useGetRecoveryCodeMutation } from '../../../services/api/authApi/authApi'
import { ToastContainer, toast } from 'react-toastify'

const ForgotPassword = () => {
  const [errorLocal, setErrorLocal] = useState<any>()
  const [setErrorFields] = useState<any>()
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const [recovery, { isLoading, error }] = useGetRecoveryCodeMutation()

  const getRecoveryCode = async (e: React.FormEvent, email: string) => {
    e.preventDefault()
    await recovery(email)
      .unwrap()
      .then(() => navigate(`${process.env.PUBLIC_URL}/create-password`))
      .catch((error) => {
        setErrorLocal(error.data.error.description)
        setErrorFields(error.data.error.fields[0])
      })
  }
  return (
    <Fragment>
      <section>
        <Container className="p-0" fluid={true}>
          <Row className="m-0">
            <Col className="p-0">
              <div className="login-card">
                <div className="login-main">
                  {error && (
                    <div>
                      <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                      />
                      {toast('Incorrect email address', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                      })}
                      <ToastContainer />
                    </div>
                  )}
                  <Form className="theme-form" onSubmit={(e) => getRecoveryCode(e, email)}>
                    <H4 attrH4={{ className: 'mb-3' }}>Reset Your Password</H4>
                    <FormGroup>
                      <Label>Enter Your Email Address</Label>
                      <Row>
                        <Col xl="12" sm="12">
                          <Input
                            className={errorLocal ? 'border-danger form-control' : 'form-control'}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email address..."
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Btn attrBtn={{ className: 'btn-block', color: 'primary', type: 'submit', disabled: isLoading }}>
                        {isLoading ? 'SENDING...' : 'Send'}
                      </Btn>
                    </FormGroup>
                    <P>
                      Already have a password?
                      <Link className="ms-2" to={`${process.env.PUBLIC_URL}/login`}>
                        Sign in
                      </Link>
                    </P>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  )
}

export default ForgotPassword
