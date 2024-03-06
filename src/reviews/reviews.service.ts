import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectModel } from '@nestjs/sequelize';
import { IReview } from './entities/interface/reviews.interface';
import IResponse from 'src/utils/interface/response.interface';
import { Sequelize } from 'sequelize-typescript';
import {
  IFindAllResponse,
  IFindOneResponse,
  IUpdateResponse,
} from './interface/response.interface';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review)
    private readonly reviewRepository: typeof Review,
    private readonly sequelize: Sequelize,
  ) {}

  async createReview(review: Omit<IReview, 'id'>): Promise<IResponse> {
    return await this.reviewRepository
      .create(review)
      .then(() => {
        return {
          statusCode: 201,
          message: 'Review subida con Exito!.',
        };
      })
      .catch((error: NodeJS.ErrnoException) => {
        throw new InternalServerErrorException(
          `Ocurrió un error en el servidor al intentar crear la nueva Review.\n${error.message}`,
        );
      });
  }

  async findAllReview(): Promise<IFindAllResponse> {
    return await this.reviewRepository
      .findAll({
        /* order: this.sequelize.random(), */
        limit: 20,
      })
      .then((data: IReview[] | []) => {
        return {
          statusCode: data.length ? HttpStatus.OK : HttpStatus.NO_CONTENT,
          data: data.length ? data : undefined,
          message: data.length
            ? undefined
            : 'No se publicaron reviews hasta el momento.',
        };
      })
      .catch((error: NodeJS.ErrnoException) => {
        throw new InternalServerErrorException(
          `Ocurrió un error al solicitar las reviews existentes.\n${error.message}`,
        );
      });
  }

  async findOneReview(id: string): Promise<IFindOneResponse> {
    return await this.reviewRepository
      .findByPk(id)
      .then((data: IReview | null) => {
        return {
          statusCode: data ? HttpStatus.OK : HttpStatus.NO_CONTENT,
          data: data ? data : undefined,
          message: data ? undefined : 'No se encontró la review solicitada.',
        };
      })
      .catch((error: NodeJS.ErrnoException) => {
        throw new InternalServerErrorException(
          `Ocurrió un error al solicitar el detalle de una reviews.\n${error.message}`,
        );
      });
  }

  async updateReview(updatenReview: IReview): Promise<IUpdateResponse> {
    return await this.reviewRepository
      .update(updatenReview, {
        where: { id: updatenReview.id },
        returning: true,
      })
      .then(([count, [data]]: [count: number, data: IReview[] | undefined]) => {
        return {
          statusCode: count ? HttpStatus.OK : HttpStatus.NO_CONTENT,
          data: count ? data : undefined,
          message: count
            ? 'Review actualizada con éxito!'
            : 'No se pudo actualizar/no se encontró la review solicitada.',
        };
      })
      .catch((error: NodeJS.ErrnoException) => {
        throw new InternalServerErrorException(
          `Ocurrió un error al actualizar una reviews.\n${error.message}`,
        );
      });
  }

  async removeReview(id: string): Promise<IResponse> {
    return await this.reviewRepository
      .destroy({ where: { id }, force: true })
      .then((count) => {
        console.log(count);

        return {
          statusCode: count ? HttpStatus.OK : HttpStatus.NOT_FOUND,
          message: count
            ? 'Eliminado con éxito!'
            : 'No se pudo eliminar la review solicitada.',
        };
      })
      .catch((error: NodeJS.ErrnoException) => {
        throw new InternalServerErrorException(
          `Ocurrió un error al eliminar una reviews.\n${error.message}`,
        );
      });
  }
}
