import React from 'react';
import { internet, random } from 'faker';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react';

import { ValidationSpy } from '@/presentation/test';
import Login from '.';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = random.words();
  const sut = render(<Login validation={validationSpy} />);

  return {
    sut,
    validationSpy,
  };
};

describe('Login component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { sut, validationSpy } = makeSut();

    const errorWrapper = sut.getByTestId(/error-wrapper/i);
    expect(errorWrapper.childElementCount).toBe(0);

    const submitButton = sut.getByTestId(/submit/i) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId(/email-status/i);
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = sut.getByTestId(/password-status/i);
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId('email');
    const email = internet.email();

    fireEvent.input(emailInput, { target: { value: email } });
    expect(validationSpy.fildName).toBe('email');
    expect(validationSpy.fildValue).toBe(email);
  });

  test('Should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId('password');
    const password = internet.password();

    fireEvent.input(passwordInput, { target: { value: password } });
    expect(validationSpy.fildName).toBe('password');
    expect(validationSpy.fildValue).toBe(password);
  });

  test('Should show email error if Validation fails', () => {
    const { sut, validationSpy } = makeSut();
    const emailStatus = sut.getByTestId('email-status');
    const emailInput = sut.getByTestId('email');

    fireEvent.input(emailInput, { target: { value: internet.email() } });
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
  });
});
