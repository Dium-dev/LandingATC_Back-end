import IResponse from 'src/utils/interface/response.interface';
import { IReview } from '../entities/interface/reviews.interface';

export interface IFindAllResponse extends IResponse {
  data?: IReview[] | undefined;
}

export interface IFindOneResponse extends IResponse {
  data?: IReview | undefined;
}

export interface IUpdateResponse extends IFindOneResponse {}
