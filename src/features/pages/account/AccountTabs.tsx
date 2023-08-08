import { ReactNode } from 'react'
import { Card, CardBody, Col, Container, Row, TabContent, TabPane } from 'reactstrap'
import { P } from 'src/features/utils/ReusableElements'
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_BASIC_PROFILE_URL, ACCOUNT_CHANGE_PASSWORD_URL } from './constants'
import classNames from 'classnames'

interface AccountTabsProps {
  basicProfileForm?: ReactNode
  changePasswordForm?: ReactNode
  primaryColorTab: 'BASIC_PROFILE' | 'CHANGE_PASSWORD'
}

const AccountTabs = (props: AccountTabsProps) => {
  const { basicProfileForm, changePasswordForm, primaryColorTab } = props
  const navigate = useNavigate()

  const basicProfileTab = primaryColorTab === 'BASIC_PROFILE'

  return (
    <Container fluid>
      <Row>
        <Col sm="3" xs="12">
          <div className="file-sidebar">
            <ul className="simple-list mt-3 mb-3  m-sm-0">
              <li>
                <div
                  className={classNames({
                    'btn btn-primary': basicProfileTab,
                    'btn btn-primary-light': !basicProfileTab,
                  })}
                  onClick={() => navigate(ACCOUNT_BASIC_PROFILE_URL)}
                >
                  Basic Profile
                </div>
              </li>
              <li>
                <div
                  className={classNames({
                    'btn btn-primary': !basicProfileTab,
                    'btn btn-primary-light': basicProfileTab,
                  })}
                  onClick={() => navigate(ACCOUNT_CHANGE_PASSWORD_URL)}
                >
                  Change Password
                </div>
              </li>
            </ul>
          </div>
        </Col>

        <Col sm="9" xs="12">
          <Card>
            <CardBody>
              <TabContent activeTab={primaryColorTab}>
                <TabPane className="fade show" tabId="BASIC_PROFILE">
                  <h4>Basic Profile</h4>
                  <P attrPara={{ className: 'mb-0 m-t-30' }}></P>
                  {basicProfileForm}
                </TabPane>
                <TabPane tabId="CHANGE_PASSWORD">
                  <h4>Change Password</h4>
                  <P attrPara={{ className: 'mb-0 m-t-30' }}></P>
                  {changePasswordForm}
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AccountTabs
