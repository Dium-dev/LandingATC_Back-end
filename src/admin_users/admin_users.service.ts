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
import * as bcrypt from 'bcrypt';

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
      .signIn(adminUser)
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
    return await this.authService.logIn(adminUser);
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

  async updateUser(user: IAdminUser): Promise<IResponse> {
    let password;
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(user.password, salt);
    }
    return await this.adminUserRepository
      .update(
        { ...user, password: user.password ? password : undefined },
        { where: { id: user.id } },
      )
      .then(([res]) => {
        return {
          statusCode: res ? HttpStatus.OK : HttpStatus.CONFLICT,
          message: res
            ? 'Usuario actualizado con éxito!'
            : 'Hubo un problema con las credenciales del usuario, intente nuevamente.',
        };
      })
      .catch((error: NodeJS.ErrnoException) => {
        throw new InternalServerErrorException(
          `Ocurrió un error al intentar actualizar los datos del usuario.\n${error.message}`,
        );
      });
  }

  async removeUser(id: string): Promise<IResponse> {
    return await this.adminUserRepository
      .destroy({
        where: { id },
        force: true,
      })
      .then((res) => {
        return {
          statusCode: res ? HttpStatus.OK : HttpStatus.NOT_FOUND,
          message: res
            ? 'Usuario eliminado con éxito.'
            : 'Usuario no encontrado.',
        };
      })
      .catch((error: NodeJS.ErrnoException) => {
        throw new InternalServerErrorException(
          `Ocurrió un error al solicitar al eliminación de un usuario.\n${error.message}`,
        );
      });
  }
}
