import { IAdminUser } from 'src/admin_users/entities/admin_user.entity';
import IResponse from 'src/utils/interface/response.interface';

export interface ISignInResponse extends IResponse {
  access_token: string;
}

export interface ITokenPayload extends Omit<IAdminUser, 'email' | 'password'> {}
