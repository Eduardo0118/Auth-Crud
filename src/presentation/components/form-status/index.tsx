import React, { useContext } from 'react';
import styles from './styles.scss';
import Spinner from '../spinner';
import Context from '@/presentation/contexts/form';

const FormStatus: React.FC = () => {
  const { state } = useContext(Context);
  const { isLoading, mainError } = state;

  return (
    <div data-testid="error-wrapper" className={styles.wrapper}>
      {!!isLoading && <Spinner className={styles.spinner} />}
      {!!mainError && <span className={styles.message}>{mainError}</span>}
    </div>
  );
};

export default FormStatus;
