import React, { useContext } from 'react';
import styles from './styles.scss';
import Context from '@/presentation/contexts/form';

type InputParams = { withIcon?: boolean };
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & InputParams;

const Input: React.FC<InputProps> = ({
  withIcon = false,
  ...props
}: InputProps) => {
  const { errorState } = useContext(Context);
  const error = errorState[props.name];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  const getStatus = (): string => {
    return '🔴';
  };

  const getTitle = (): string => {
    return error;
  };

  return (
    <div className={styles.inputWrapper}>
      <input {...props} readOnly onFocus={enableInput} />
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
