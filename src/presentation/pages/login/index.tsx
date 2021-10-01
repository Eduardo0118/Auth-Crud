import React from 'react';
import styles from './styles.scss';

import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from '@/presentation/components';

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

export default Login;
