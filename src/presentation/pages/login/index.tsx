import React, { useState, useEffect } from 'react';
import styles from './styles.scss';
import Context from '@/presentation/contexts/form';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from '@/presentation/components';
import { Validation } from '@/presentation/protocols/validation';

type LoginProps = {
  validation: Validation;
};

const Login: React.FC<LoginProps> = ({ validation }: LoginProps) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: '',
  });

  useEffect(() => {
    validation.validate({ email: state.email });
  }, [state.email]);

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
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
