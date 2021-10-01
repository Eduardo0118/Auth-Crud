import React, { useContext } from 'react';
import styles from './styles.scss';
import Spinner from '../spinner';
import Context from '@/presentation/contexts/form';

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context);

  return (
    <div data-testid="error-wrapper" className={styles.wrapper}>
      {!!isLoading && <Spinner className={styles.spinner} />}
      {!!errorMessage && <span className={styles.message}>{errorMessage}</span>}
    </div>
  );
};

export default FormStatus;
