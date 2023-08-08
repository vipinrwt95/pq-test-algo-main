import { Spinner } from 'reactstrap'

export const SpinnerWithPlaceholder = () => {
  return (
    <div style={{ minHeight: '65vh', position: 'relative' }}>
      <div className="position-absolute top-50 start-50 translate-middle">
        <Spinner color="primary" />
      </div>
    </div>
  )
}
