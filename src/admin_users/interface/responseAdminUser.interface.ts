import IResponse from 'src/utils/interface/response.interface';
import { IAdminUser } from '../entities/admin_user.entity';

export interface IFindOneUserResponse {
  user: IAdminUser | undefined;
}

export interface IFindByPkUserResponse extends IResponse {
  user: IAdminUser;
}

export interface IFindAllUserResponse extends IResponse {
  users: IAdminUser[] | [];
}
