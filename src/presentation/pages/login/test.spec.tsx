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
  });
});
