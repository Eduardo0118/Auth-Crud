import React, { memo } from 'react';
import styles from './styles.scss';

import LoginHeader from '@/presentation/components/login-header';
import Footer from '@/presentation/components/footer';
import Input from '@/presentation/components/input';
import FormStatus from '@/presentation/components/form-status';

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

        <FormStatus />
      </form>
      <Footer />
    </div>
  );
};

export default memo(Login);
