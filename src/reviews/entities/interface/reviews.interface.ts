import { Model } from 'sequelize-typescript';
import { RatingEnum } from '../enum/reviews.enum';

export interface IReview {
  id?: string;
  review?: string;
  rating?: RatingEnum;
  user?: string;
  date?: Date;
}

export interface IModelReview extends Model<IReview> {}
