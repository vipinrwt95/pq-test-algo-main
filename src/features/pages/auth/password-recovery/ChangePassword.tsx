import React, { Fragment, useState } from 'react'
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { H4, Btn } from '../../../utils/ReusableElements'
import { Link, useNavigate } from 'react-router-dom'
import { useChangePasswordMutation } from '../../../services/api/authApi/authApi'
import { PasswordChange } from '../types'
import { ToastContainer, toast } from 'react-toastify'

function ChangePassword() {
  const [code1, setCode1] = useState('')
  const [code2, setCode2] = useState('')
  const [code3, setCode3] = useState('')
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [, setErrorLocal] = useState<any>()
  const [, setErrorField1] = useState<any>()
  const [, setErrorField2] = useState<any>()
  const [, setErrorField3] = useState<any>()
  const [, setErrorField4] = useState<any>()

  const navigate = useNavigate()

  const [changePassword, { isLoading, error }] = useChangePasswordMutation()

  const submitChangePasswordForm = async (e: React.FormEvent) => {
    e.preventDefault()

    setOtp(code1 + code2 + code3)

    const body: PasswordChange = {
      email: email,
      code: otp,
      password: password,
      confirmPassword: confirmPassword,
    }

    await changePassword(body)
      .unwrap()
      .then(() => navigate(`${process.env.PUBLIC_URL}/login`))
      .catch((error) => {
        setErrorLocal(error.data.error.description)
        setErrorField1(error.data.error.fields[0])
        setErrorField2(error.data.error.fields[1])
        setErrorField3(error.data.error.fields[2])
        setErrorField4(error.data.error.fields[3])
      })
  }

  return (
    <Fragment>
      <section>
        <Container fluid={true} className="p-0">
          <Row className="m-0">
            <Col xl="12 p-0">
              <div className="login-card">
                <Form className="theme-form login-form" onSubmit={(e) => submitChangePasswordForm(e)}>
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
                      {toast('Incorrect values')}
                      <ToastContainer />
                    </div>
                  )}
                  <H4 attrH4={{ className: 'mb-3' }}>Change Your Password</H4>
                  <FormGroup>
                    {' '}
                    <span className="reset-password-link">
                      Didn't receive the OTP?  
                      <Link className="btn-link text-danger" to={`${process.env.PUBLIC_URL}/forgot-password`}>
                        Resend
                      </Link>
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <Label>Enter OTP</Label>
                    <Row>
                      <Col>
                        <Input
                          className="form-control text-center opt-text"
                          type="text"
                          placeholder="00"
                          maxLength={2}
                          onChange={(e) => setCode1(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <Input
                          className="form-control text-center opt-text"
                          type="text"
                          placeholder="00"
                          maxLength={2}
                          onChange={(e) => setCode2(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <Input
                          className="form-control text-center opt-text"
                          type="text"
                          placeholder="00"
                          maxLength={2}
                          onChange={(e) => setCode3(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label>Email Address</Label>
                    <div className="input-group">
                      <span className="input-group-text"></span>
                      <Input
                        className="form-control"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="email Address..."
                      />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label>New Password</Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="icon-lock"></i>
                      </span>
                      <Input
                        className="form-control"
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="*********"
                      />
                      <div className="show-hide">
                        <span className="show"></span>
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label>Password</Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="icon-lock"></i>
                      </span>
                      <Input
                        className="form-control"
                        type="password"
                        name="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="*********"
                      />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="checkbox">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" for="checkbox1">
                        Remember password
                      </Label>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Btn attrBtn={{ className: 'btn-block', color: 'primary', type: 'submit', disabled: isLoading }}>
                      {isLoading ? 'LOADING...' : 'Done'}
                    </Btn>
                  </FormGroup>
                  {/* <P>Don't have account?<a className="ps-2" href="sign-up.html">Create Account</a></P> */}
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  )
}

export default ChangePassword
