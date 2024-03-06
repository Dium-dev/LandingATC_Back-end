import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';
import { CreateAdminUserDto } from './dto/create-admin_user.dto';
import { UpdateAdminUserDto } from './dto/update-admin_user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AdminUser, IAdminUser } from './entities/admin_user.entity';
import IResponse from 'src/utils/interface/response.interface';
import { FindOptions } from 'sequelize';
import {
  IFindAllUserResponse,
  IFindByPkUserResponse,
  IFindOneUserResponse,
} from './interface/responseAdminUser.interface';
import { AuthService } from 'src/auth/auth.service';
import { ISingIn } from './dto/signInUser.dto';

@Injectable()
export class AdminUsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectModel(AdminUser)
    private readonly adminUserRepository: typeof AdminUser,
  ) {}

  async createUser(adminUser: Omit<IAdminUser, 'id'>): Promise<IResponse> {
    return await this.authService
      .logIn(adminUser)
      .then(() => {
        return {
          statusCode: HttpStatus.CREATED,
          message: 'Usuario Creado!.',
        };
      })
      .catch((error: NodeJS.ErrnoException) => {
        throw new InternalServerErrorException(
          `Ocurrio un error al crear el usuario.\n${error.message}`,
        );
      });
  }

  async validateUser(adminUser: ISingIn) {
    return await this.authService.signIn(adminUser);
  }

  async findAllUsers(): Promise<IFindAllUserResponse> {
    return await this.adminUserRepository
      .findAll({ attributes: ['id', 'nickName', 'email'] })
      .then((users) => {
        return {
          statusCode: users.length ? HttpStatus.OK : HttpStatus.NO_CONTENT,
          users: users.length ? users : undefined,
          message: users.length
            ? undefined
            : 'No se encontró el usuario solicitado.',
        };
      })
      .catch((error: NodeJS.ErrnoException) => {
        throw new InternalServerErrorException(
          `Ocurrio un error al indagar el detalle del usuario.\n${error.message}`,
        );
      });
  }

  async findByPkUser(
    id: string,
    options: FindOptions,
  ): Promise<IFindByPkUserResponse> {
    return await this.adminUserRepository
      .findByPk(id, options)
      .then((user) => {
        return {
          statusCode: user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
          user: user ? user : undefined,
          message: user ? undefined : 'No se encontró el usuario solicitado.',
        };
      })
      .catch((error: NodeJS.ErrnoException) => {
        throw new InternalServerErrorException(
          `Ocurrio un error al indagar el detalle del usuario.\n${error.message}`,
        );
      });
  }

  async findOneUser(options: FindOptions): Promise<IFindOneUserResponse> {
    return await this.adminUserRepository
      .findOne(options)
      .then((user) => {
        return {
          user: user ? user : undefined,
        };
      })
      .catch((error: NodeJS.ErrnoException) => {
        throw new InternalServerErrorException(
          `Ocurrio un error al indagar el detalle del usuario.\n${error.message}`,
        );
      });
  }

}
