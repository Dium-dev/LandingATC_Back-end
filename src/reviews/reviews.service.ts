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
import { writeFile } from 'src/utils/writeFile';
import { deleteFile } from 'src/utils/deleteFile';
import { createFileName } from 'src/utils/createFileName';
import { renameFile } from 'src/utils/renameFile';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review)
    private readonly reviewRepository: typeof Review,
    private readonly sequelize: Sequelize,
  ) {}

  async createReview(
    review: Omit<IReview, 'id'>,
    image: Express.Multer.File,
  ): Promise<IResponse> {
    const fileName = await writeFile(review.user, image).catch(
      (error: Error) => {
        throw new InternalServerErrorException(error.message);
      },
    );

    return await this.reviewRepository
      .create({
        ...review,
        image: fileName,
      })
      .then(() => {
        return {
          statusCode: 201,
          message: '¡Reseña subida con éxito!',
        };
      })
      .catch(async (error: NodeJS.ErrnoException) => {
        await deleteFile(fileName);
        throw new InternalServerErrorException(
          `Ocurrió un error en el servidor al intentar crear la nueva reseña.\n${error.message}`,
        );
      });
  }

  async findAllReview(): Promise<IFindAllResponse> {
    return await this.reviewRepository
      .findAll({
        order: [['user', 'ASC']],
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

  async updateReview(
    updatenReview: IReview,
    image: Express.Multer.File,
  ): Promise<IUpdateResponse> {
    const review = await this.findOneReview(updatenReview.id);
    let fileName: string;
    const isImageNull = image.originalname === 'null';
    if (!review.data) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No se encontró la review solicitada.',
      };
    }
    if (isImageNull) {
      fileName = createFileName(updatenReview.user, review.data.image);
    } else {
      fileName = createFileName(updatenReview.user, image.originalname);
    }
    return await this.reviewRepository
      .update(
        { ...updatenReview, image: fileName },
        {
          where: { id: updatenReview.id },
          returning: true,
        },
      )
      .then(
        async ([count, [data]]: [
          count: number,
          data: IReview[] | undefined,
        ]) => {
          if (!isImageNull) {
            await deleteFile(review.data.image).catch((error: Error) => {
              throw new InternalServerErrorException(error.message);
            });
            await writeFile(updatenReview.user, image).catch((error: Error) => {
              throw new InternalServerErrorException(error.message);
            });
          } else {
            await renameFile(review.data.image, fileName).catch(
              (error: Error) => {
                throw new InternalServerErrorException(error.message);
              },
            );
          }
          return {
            statusCode: count ? HttpStatus.OK : HttpStatus.NO_CONTENT,
            data: count ? data : undefined,
            message: count
              ? 'Review actualizada con éxito!'
              : 'No se pudo actualizar/no se encontró la review solicitada.',
          };
        },
      )
      .catch((error: NodeJS.ErrnoException) => {
        throw new InternalServerErrorException(error.message);
      });
  }

  async removeReview(id: string): Promise<IResponse> {
    const review = await this.findOneReview(id);

    if (!review.data) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No se encontró la review solicitada.',
      };
    }
    return await this.reviewRepository
      .destroy({
        where: { id },
        force: true,
      })
      .then(async (count) => {
        await deleteFile(review.data.image).catch((error: Error) => {
          throw new InternalServerErrorException(error.message);
        });
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
