import { internet, random } from 'faker';

import { AccountModel } from '@/domain/models';
import { AuthenticationProps } from '@/domain/usecases';

export const mockAuthentication = (): AuthenticationProps => ({
  email: internet.email(),
  password: internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: random.uuid(),
});
