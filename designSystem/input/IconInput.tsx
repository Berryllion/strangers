import styled from 'styled-components';

const IconInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--primary);
  padding: .5rem .2rem;

  input {
    padding: .6rem .9rem;
    color: #fff;
    width: 100%;

    ::placeholder {
      color: #fff;
      opacity: 0.4;
    }
  }
`

interface IconInputProps {
  type?: string,
  placeholder?: string,
  value: string,
  onChange: Function,
  leftIcon?: React.ReactElement,
  rightIcon?: React.ReactElement,
}

export default ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  leftIcon,
  rightIcon,
  ...props
}: IconInputProps) => {
  return (
    <IconInputContainer {...props}>
      {leftIcon && leftIcon}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        />
      {rightIcon && rightIcon}
    </IconInputContainer>
  )
}
