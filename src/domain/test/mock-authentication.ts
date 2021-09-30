import { AuthenticationProps } from '@/domain/usecases/authentication';
import { internet } from 'faker';

export const mockAuthentication = (): AuthenticationProps => ({
  email: internet.email(),
  password: internet.password(),
});
