import React, { useContext } from 'react';
import styles from './styles.scss';
import Context from '@/presentation/contexts/form';

type InputParams = { withIcon?: boolean };
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & InputParams;

const Input: React.FC<InputProps> = ({
  withIcon = false,
  ...props
}: InputProps) => {
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const getStatus = (): string => {
    return error ? '🔴' : '🟢';
  };

  const getTitle = (): string => {
    return error || 'Tudo certo';
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        {...props}
        data-testid={props.name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      {!!withIcon && (
        <span
          data-testid={`${props.name}-status`}
          title={getTitle()}
          className={styles.status}
        >
          {getStatus()}
        </span>
      )}
    </div>
  );
};

export default Input;
