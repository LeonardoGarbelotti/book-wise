import { TextareaHTMLAttributes } from 'react'
import { TextAreaContainer } from './styles'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number
}

export function TextArea({ maxLength, ...props }: TextAreaProps) {
  const valueLength = String(props.value)?.length ?? 0

  return (
    <TextAreaContainer>
      <textarea {...props} maxLength={maxLength} />
      {maxLength && (
        <span>
          {valueLength}/{maxLength}
        </span>
      )}
    </TextAreaContainer>
  )
}
