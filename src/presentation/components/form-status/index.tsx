import React from 'react';
import styles from './styles.scss';

import Spinner from '../spinner';

type FormStatusProps = {
  label?: string;
  isLoading?: boolean;
};

const FormStatus: React.FC<FormStatusProps> = ({
  isLoading = false,
  label,
}: FormStatusProps) => {
  return (
    <div className={styles.wrapper}>
      {!!isLoading && <Spinner className={styles.spinner} />}
      <span className={styles.message}>{label}</span>
    </div>
  );
};

export default FormStatus;
