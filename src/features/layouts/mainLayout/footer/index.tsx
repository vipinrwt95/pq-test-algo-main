import classNames from 'classnames'
import React, { Fragment } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store'
import styles from './index.module.css'

function Footer() {
  const toggleIcon = useAppSelector((state: RootState) => state.themeCustomizer.toggleIcon)

  return (
    <Fragment>
      <footer
        className={classNames(styles.footer, {
          [styles.collapsedSidebarMargin]: toggleIcon,
          [styles.expandedSidebarMargin]: !toggleIcon,
        })}
      >
        <Container fluid={true}>
          <Row>
            <Col md="6" className="footer-copyright">
              <p>{`Copyright © ${new Date().getFullYear()} All rights reserved.`}</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </Fragment>
  )
}

export default Footer
