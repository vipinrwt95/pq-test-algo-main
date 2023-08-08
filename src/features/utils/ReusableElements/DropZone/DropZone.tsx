import classNames from 'classnames'
import { ReactNode } from 'react'
import styles from './DropZone.module.css'
import { useDropzone } from 'react-dropzone'

const DropZone = ({
  children,
  handleFileSelect,
}: {
  children: ReactNode
  handleFileSelect: (files: File[]) => void
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ noClick: true, onDrop: handleFileSelect })

  return (
    <div
      className={classNames({
        [styles.dropZoneActive]: isDragActive,
      })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {children}
    </div>
  )
}

export default DropZone
