import React, { useContext } from 'react';
import styles from './styles.scss';
import Spinner from '../spinner';
import Context from '@/presentation/contexts/form';

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context);

  return (
    <div data-testid="error-wrapper" className={styles.wrapper}>
      {!!state.isLoading && <Spinner className={styles.spinner} />}
      {!!errorState.main && (
        <span className={styles.message}>{errorState.main}</span>
      )}
    </div>
  );
};

export default FormStatus;
