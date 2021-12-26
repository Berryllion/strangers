import styled from 'styled-components';

const IconInputContainer = styled.div<{ border?: boolean }>`
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ border }) => border
    ? 'transparent'
    : 'var(--button-background)'
  };
  border: 1px solid ${({ border }) => border
    ? 'var(--disabled)'
    : 'var(--button-background)'
  };
  padding: .5rem .7rem;
  transition: all .15s ease-out;

  :focus-within {
    border-color: ${({ border }) => border
      ? 'var(--primary)'
      : 'var(--button-background)'
    };

    svg {
      transition: all .15s ease-out;
      color: var(--primary);
    }
  }

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
  border?: boolean,
}

const RoundedInput = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  leftIcon,
  rightIcon,
  border,
  ...props
}: IconInputProps) => {
  return (
    <IconInputContainer {...props} border={border}>
      {leftIcon && leftIcon}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        />
      {rightIcon && rightIcon}
    </IconInputContainer>
  );
}

export default RoundedInput;
