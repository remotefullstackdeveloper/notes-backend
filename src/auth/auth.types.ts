import { Request } from 'express';

export interface IAuthenticatedUserPayload {
  id: string;
  wallet_address: string;
}

export interface IAuthenticatedUserRequest extends Request {
  user: IAuthenticatedUserPayload;
}