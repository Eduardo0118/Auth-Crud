import React from 'react';
import styles from './styles.scss';

import Spinner from '@/presentation/components/spinner';
import Logo from '@/presentation/components/Logo';

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <header className={styles.header}>
        <Logo />
        <h1 className={styles.title}>Auth Login - Project</h1>
      </header>
      <form className={styles.form}>
        <h2 className={styles.formTitle}>Login</h2>
        <div className={styles.inputWrapper}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={styles.status}>&#128308;</span>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <span className={styles.status}>&#128308;</span>
        </div>
        <button className={styles.formButton} type="submit">
          Entrar
        </button>
        <span className={styles.formLink}>Criar conta</span>
        <div className={styles.errorWrapper}>
          <Spinner className={styles.spinner} />
          <span className={styles.errorMessage}>Erro</span>
        </div>
      </form>
      <footer className={styles.footer} />
    </div>
  );
};

export default Login;
