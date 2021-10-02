import React from 'react';
import { render } from '@testing-library/react';
import Login from '.';

describe('Login component', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(<Login />);

    const errorWrapper = getByTestId(/error-wrapper/i);
    expect(errorWrapper.childElementCount).toBe(0);

    const submitButton = getByTestId(/submit/i) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = getByTestId(/email-status/i);
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = getByTestId(/password-status/i);
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });
});
