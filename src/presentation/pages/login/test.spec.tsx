import React from 'react';
import { internet, random } from 'faker';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react';

import { ValidationStub } from '@/presentation/test';
import Login from '.';

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = random.words();
  const sut = render(<Login validation={validationStub} />);

  return {
    sut,
    validationStub,
  };
};

describe('Login component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut();

    const errorWrapper = sut.getByTestId(/error-wrapper/i);
    expect(errorWrapper.childElementCount).toBe(0);

    const submitButton = sut.getByTestId(/submit/i) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId(/email-status/i);
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = sut.getByTestId(/password-status/i);
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    const emailStatus = sut.getByTestId('email-status');
    const emailInput = sut.getByTestId('email');

    fireEvent.input(emailInput, { target: { value: internet.email() } });
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    const passwordStatus = sut.getByTestId('password-status');
    const passwordInput = sut.getByTestId('password');

    fireEvent.input(passwordInput, { target: { value: internet.password() } });
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    const emailStatus = sut.getByTestId('email-status');
    const emailInput = sut.getByTestId('email');

    fireEvent.input(emailInput, { target: { value: internet.email() } });
    expect(emailStatus.title).toBe('Tudo certo');
    expect(emailStatus.textContent).toBe('🟢');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    const passwordStatus = sut.getByTestId('password-status');
    const passwordInput = sut.getByTestId('password');

    fireEvent.input(passwordInput, { target: { value: internet.password() } });
    expect(passwordStatus.title).toBe('Tudo certo');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;

    const emailInput = sut.getByTestId('email');
    const passwordInput = sut.getByTestId('password');

    fireEvent.input(emailInput, { target: { value: internet.email() } });
    fireEvent.input(passwordInput, { target: { value: internet.password() } });

    const submitButton = sut.getByTestId(/submit/i) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });
});
