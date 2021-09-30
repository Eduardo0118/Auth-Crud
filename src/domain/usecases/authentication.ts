import { AccountModel } from './../models/account-model';

export type AuthenticationProps = {
  email: string;
  password: string;
};

export interface Authentication {
  auth(props: AuthenticationProps): Promise<AccountModel>;
}
