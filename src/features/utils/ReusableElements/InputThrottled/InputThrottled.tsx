import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'src/features/hooks/useDebouncedCallback'
import { usePropCallback } from 'src/features/hooks/usePropCallback'
import { ControlledComponentProps } from 'src/features/types'

interface InputThrottledProps extends ControlledComponentProps<string> {
  className?: string
}

const InputThrottled = (props: InputThrottledProps) => {
  const { id, value: valueProp, onChange: onChangeProp, className, isDisabled } = props
  const onChange = usePropCallback(onChangeProp)
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setValue(valueProp || '')
  }, [valueProp])

  const handleChange = useDebouncedCallback(
    (value: string) => {
      onChange.current?.(value)
    },
    250,
    []
  )

  return (
    <input
      type="text"
      id={id}
      value={value}
      onChange={(e) => {
        const value = e.target.value
        setValue(value)
        handleChange(value)
      }}
      className={className}
      disabled={isDisabled}
    />
  )
}

export default InputThrottled
