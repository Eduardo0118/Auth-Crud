import React from 'react';
import styles from './styles.scss';

type InputParams = { withIcon?: boolean };
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & InputParams;

const Input: React.FC<InputProps> = ({
  withIcon = false,
  ...props
}: InputProps) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.readOnly = false;
  };

  return (
    <div className={styles.inputWrapper}>
      <input {...props} readOnly onFocus={enableInput} />
      {!!withIcon && <span className={styles.status}>&#128308;</span>}
    </div>
  );
};

export default Input;
