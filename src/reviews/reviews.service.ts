import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectModel } from '@nestjs/sequelize';
import { IReview } from './entities/interface/reviews.interface';
import IResponse from 'src/utils/interface/response.interface';
import { Sequelize } from 'sequelize-typescript';
import { IFindAllResponse } from './interface/response.interface';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review)
    private readonly reviewRepository: typeof Review,
    private readonly sequelize: Sequelize,
  ) { }

  async createReview(review: Omit<IReview, 'id'>): Promise<IResponse> {
    return await this.reviewRepository.create(review)
      .then(() => {
        return {
          statusCode: 201,
          message: 'Review subida con Exito!.'
        }
      }).catch((error: NodeJS.ErrnoException) => {
        throw new InternalServerErrorException(`Ocurrió un error en el servidor al intentar crear la nueva Review.\n${error.message}`)
      });
  }

  async findAllReview(): Promise<IFindAllResponse> {
    return await this.reviewRepository.findAll({
      /* order: this.sequelize.random(), */
      limit: 20,
    })
      .then((data) => {
        console.log(data);
        
        if (data.length) {
          return {
            statusCode: HttpStatus.OK,
            data
          }
        } else {
          return {
            statusCode: HttpStatus.NO_CONTENT,
            message: 'No se publicaron reviews hasta el momento.'
          }
        }
      }).catch((error: NodeJS.ErrnoException) => {
        throw new BadRequestException(`Ocurrió un error al solicitar las reviews existentes.\n${error.message}`)
      });
  }

  async findOneReview(id: number) {
    try {

    } catch (error) {

    }
  }

  async updateReview(updateReviewDto: UpdateReviewDto) {
    try {

    } catch (error) {

    }
  }

  async removeReview(id: number) {
    try {

    } catch (error) {

    }
  }
}
