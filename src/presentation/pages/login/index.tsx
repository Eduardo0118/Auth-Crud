import React, { useState } from 'react';
import styles from './styles.scss';
import Context from '@/presentation/contexts/form';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from '@/presentation/components';

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
  });

  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: '',
  });

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, errorState }}>
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
          <button
            data-testid="submit"
            disabled
            className={styles.formButton}
            type="submit"
          >
            Entrar
          </button>
          <span className={styles.formLink}>Criar conta</span>

          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
