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
import { Authentication } from '@/domain/usecases';

type LoginProps = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<LoginProps> = ({
  validation,
  authentication,
}: LoginProps) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    try {
      if (state.isLoading || state.emailError || state.passwordError) return;

      setState({ ...state, isLoading: true });
      await authentication.auth({
        email: state.email,
        password: state.password,
      });
    } catch (error) {
      setState({ ...state, mainError: error.message });
    }
  };

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    });
  }, [state.email, state.password]);

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={styles.form}
          onSubmit={handleSubmit}
        >
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
            disabled={!!state.emailError || !!state.passwordError}
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
