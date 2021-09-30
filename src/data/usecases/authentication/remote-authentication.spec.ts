import {
  mockAccountModel,
  mockAuthentication,
} from '@/domain/test/mock-account';

import { AccountModel } from '@/domain/models/account-model';
import { AuthenticationProps } from '@/domain/usecases/authentication';
import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { RemoteAuthentication } from './remote-authentication';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { internet } from 'faker';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationProps, AccountModel>;
};

const makeSut = (url: string = internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationProps,
    AccountModel
  >();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const url = internet.url();
    const { httpPostClientSpy, sut } = makeSut(url);

    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('should call HttpPostClient with correct body', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const authenticationProps = mockAuthentication();

    await sut.auth(authenticationProps);
    expect(httpPostClientSpy.body).toEqual(authenticationProps);
  });

  test('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const promise = sut.auth(mockAuthentication());

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized,
    };

    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const promise = sut.auth(mockAuthentication());

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const promise = sut.auth(mockAuthentication());

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const promise = sut.auth(mockAuthentication());

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return an AccountModel if HttpPostClient returns 200', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const httpResult = mockAccountModel();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const account = await sut.auth(mockAuthentication());
    expect(account).toEqual(httpResult);
  });
});
