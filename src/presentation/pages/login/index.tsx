import React, { memo } from 'react';
import styles from './styles.scss';

import Spinner from '@/presentation/components/spinner';
import LoginHeader from '@/presentation/components/login-header';
import Footer from '@/presentation/components/footer';
import Input from '@/presentation/components/input';

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <LoginHeader />
      <form className={styles.form}>
        <h2 className={styles.formTitle}>Login</h2>
        <Input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          withIcon
        />
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          withIcon
        />
        <button className={styles.formButton} type="submit">
          Entrar
        </button>
        <span className={styles.formLink}>Criar conta</span>
        <div className={styles.errorWrapper}>
          <Spinner className={styles.spinner} />
          <span className={styles.errorMessage}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default memo(Login);
