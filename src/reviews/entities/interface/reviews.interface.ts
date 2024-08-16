import { Model } from 'sequelize-typescript';
import { RatingEnum } from '../enum/reviews.enum';

export interface IReview {
  id?: string;
  review?: string;
  rating?: RatingEnum;
  user?: string;
  date?: Date;
  active?: boolean;
  image?: string;
}

export type IModelReview = Model<IReview>;
