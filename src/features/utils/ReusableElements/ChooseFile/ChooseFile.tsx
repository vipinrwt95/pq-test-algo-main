import { useCallback, useRef, useState } from 'react'
import { UploadCloud } from 'react-feather'
import { Button } from 'reactstrap'
import { ButtonIconWrapper } from 'src/features/utils/ReusableElements'

interface ChooseFileProps {
  handleUploadedFile: (file: File) => void
}

const ChooseFile = (props: ChooseFileProps) => {
  const { handleUploadedFile } = props

  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const uploadInputRef = useRef<HTMLInputElement>(null)
  const getFile = () => {
    const input = uploadInputRef.current
    if (!input) return

    input.value = ''
    input.click()

    setIsUploading(true)
  }

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files

      if (selectedFiles?.length) {
        const selectedFile = selectedFiles[0]

        setFile(selectedFile)
        if (selectedFile) {
          handleUploadedFile(selectedFile)

          setIsUploading(false)
        }
      }
    },
    [handleUploadedFile]
  )

  return (
    <>
      <div style={{ height: '0px', width: '0px', overflow: 'hidden' }}>
        <input ref={uploadInputRef} type="file" disabled={isUploading} onChange={handleFileSelect} accept=".csv" />
      </div>
      <div className="d-flex align-items-center">
        <Button
          color="primary"
          className="d-flex align-items-center"
          onClick={() => {
            getFile()
          }}
        >
          <ButtonIconWrapper>
            <UploadCloud className="me-2" />
          </ButtonIconWrapper>
          Choose File
        </Button>
        {file && <span className="ms-2">{file.name}</span>}
      </div>
    </>
  )
}

export default ChooseFile
