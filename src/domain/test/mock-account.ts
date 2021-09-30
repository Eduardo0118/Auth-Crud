import { internet, random } from 'faker';

import { AccountModel } from './../models/account-model';
import { AuthenticationProps } from '@/domain/usecases/authentication';

export const mockAuthentication = (): AuthenticationProps => ({
  email: internet.email(),
  password: internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: random.uuid(),
});
