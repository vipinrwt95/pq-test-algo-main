import { RefCallBack } from 'react-hook-form'

interface HiddenInputRefProps {
  inputRef?: RefCallBack

  // this is useful if you want to bring focus on the element that is wrapped
  // by this component when this component is focused on the form error
  onFocus?: () => void
}

/**
 * This component is useful when you want to pass the ref from react-hook-form controller to
 * scroll to this element if there is error on the form element that is wrapped by this component.
 * This is particularly used for the components that does't take the ref as a prop, i.e. summernote.
 * @param props
 * @returns
 */
export const HiddenInputRef = (props: HiddenInputRefProps) => {
  const { inputRef, onFocus } = props

  // TODO-: fix: input is occupying extra spacing on the add post modal
  // Input is useful for the react-hook-form's ref for bringing focus on error
  return <input ref={inputRef} className="pq-hidden-input-ref" onFocus={onFocus} />
}
