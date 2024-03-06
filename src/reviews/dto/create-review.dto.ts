import { IsEnum, IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { RatingEnum } from '../entities/enum/reviews.enum';
import { IReview } from '../entities/interface/reviews.interface';

export class CreateReviewDto implements IReview {
  @IsNotEmpty({ message: 'La propiedad $property debe contener algun dato.' })
  @IsString({ message: 'La propiedad $property debe de ser de tipo string.' })
  review: string;

  @IsNotEmpty({ message: 'La propiedad $property debe contener algun dato.' })
  @IsEnum(RatingEnum, {
    message: `La propiedad $property debe contener alguno de los siguientes datos: ${Object.values(
      RatingEnum,
    )}`,
  })
  rating: RatingEnum;

  @IsNotEmpty({ message: 'La propiedad $property debe contener algun dato.' })
  @IsString({ message: 'La propiedad $property debe de ser de tipo string.' })
  user: string;

  @IsNotEmpty({ message: 'La propiedad $property debe contener algun dato.' })
  @IsISO8601({ strict: true })
  date: Date;
}
