import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsNotEmpty } from 'class-validator';
import { IReview } from '../entities/interface/reviews.interface';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
    @IsNotEmpty({ message: 'La propiedad $property no debe estar vacía.' })
    id: string;

}
