import React, { memo } from 'react';
import styles from './styles.scss';

import Logo from '../logo';

const LoginHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1 className={styles.title}>Auth Login - Project</h1>
    </header>
  );
};

export default memo(LoginHeader);
