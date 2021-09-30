import { AuthenticationProps } from '../../../domain/usecases/authentication';
import { HttpPostClient } from './../../protocols/http/http-post-client';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
  ) {}

  async auth(params: AuthenticationProps): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    return Promise.resolve();
  }
}
