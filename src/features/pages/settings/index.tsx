import { Container, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { selectCustomStyles, selectThemeConfig } from 'src/features/utils/ReusableElements/ReactSelect/ReactSelect'

function Settings() {
  return (
    <Container fluid>
      <Row>
        <Col xs={4}>
          <Select
            styles={selectCustomStyles as any}
            theme={selectThemeConfig}
            isLoading={false}
            className="form-control p-0 m-8"
            escapeClearsValue
            isSearchable
            options={[]}
            placeholder="Select Option"
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Settings
