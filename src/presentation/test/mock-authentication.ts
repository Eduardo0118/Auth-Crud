import { Authentication, AuthenticationProps } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationProps;

  async auth(props: AuthenticationProps): Promise<AccountModel> {
    this.params = props;
    return Promise.resolve(this.account);
  }
}
