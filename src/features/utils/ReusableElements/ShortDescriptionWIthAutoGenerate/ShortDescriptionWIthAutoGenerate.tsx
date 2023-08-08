import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Input, Label } from 'reactstrap'
import parse from 'html-react-parser'
import { RefCallBack } from 'react-hook-form'
import { DEFAULT_SHORT_DESCRIPTION_LENGTH } from 'src/features/constants/blog'

const getUniqueId = () => 'short-description-' + Math.random().valueOf().toString().slice(2)

interface ShortDescriptionWIthAutoGenerateProps {
  textareaRef?: RefCallBack
  onChange: (value: string) => void
  // richtext from the long description
  richtext: string
  labelText: string
  defaultShortDescription?: string
  defaultAutoGenerate?: boolean
}

const ShortDescriptionWIthAutoGenerate = (props: ShortDescriptionWIthAutoGenerateProps) => {
  const {
    textareaRef,
    labelText,
    defaultShortDescription,
    richtext,
    onChange: onChangeProp,
    defaultAutoGenerate,
  } = props

  // assign an id based on the timestamp at the time of mounting the component. It must not change.
  const [textareaId] = useState(getUniqueId)
  const [checkboxId] = useState(getUniqueId)

  // keep the callback in a ref, so that it doesn't get rerendered whenever the parent function is rerendered or not wrapped in useCallback
  const onChangePropRef = useRef<(value: string) => void>(onChangeProp)

  useEffect(() => {
    onChangePropRef.current = onChangeProp
  }, [onChangeProp])

  // make the textarea controlled
  const [value, setValue] = useState(defaultShortDescription || '')

  const validateAndSetValue = useCallback((value: string) => {
    setValue(value.slice(0, DEFAULT_SHORT_DESCRIPTION_LENGTH))
  }, [])

  // call prop.onChange whenever value is updated regardless the value was updated by user input on the text area or not
  useEffect(() => {
    onChangePropRef.current(value)
  }, [value])

  useEffect(() => {
    validateAndSetValue(defaultShortDescription || '')
  }, [defaultShortDescription, validateAndSetValue])

  // update the value in the textarea
  const onTextInputChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      validateAndSetValue(e.target.value)
    },
    [validateAndSetValue]
  )

  const [autoGenerate, setAutoGenerate] = useState(defaultAutoGenerate)

  useEffect(() => {
    setAutoGenerate(defaultAutoGenerate)
  }, [defaultAutoGenerate])

  // update the value in the textarea even user doesn't type, because if the autoGenerate is true,
  // we should set update the textarea automatically
  const hiddenContainerRef = useRef(null)
  useEffect(() => {
    if (!autoGenerate) return
    if (!hiddenContainerRef.current) return
    const richtextRenderer: HTMLDivElement = hiddenContainerRef.current
    const textContent = richtextRenderer.textContent?.trim()
    validateAndSetValue(textContent || '')
  }, [autoGenerate, richtext, validateAndSetValue])

  return (
    <div className="mb-0">
      <Label htmlFor={textareaId} className="form-label">
        {labelText}
      </Label>
      <div className="checkbox checkbox-success pull-right">
        <Input
          id={checkboxId}
          type="checkbox"
          checked={autoGenerate}
          onChange={(e) => setAutoGenerate(e.target.checked)}
        />
        <Label className="ps-2 m-0 pq-checkbox-small" for={checkboxId}>
          Auto Generate
        </Label>
      </div>
      <textarea
        ref={textareaRef}
        id={textareaId}
        rows={3}
        className="form-control"
        disabled={autoGenerate}
        value={value}
        onChange={onTextInputChange}
      />

      <div className="pull-right pt-1 txt-info">
        {value.length}/{DEFAULT_SHORT_DESCRIPTION_LENGTH} characters
      </div>

      {/* keep this hidden div to extract the text from richtext format */}
      {autoGenerate && (
        <div ref={hiddenContainerRef} hidden>
          {parse(richtext || '')}
        </div>
      )}
    </div>
  )
}

export default ShortDescriptionWIthAutoGenerate
