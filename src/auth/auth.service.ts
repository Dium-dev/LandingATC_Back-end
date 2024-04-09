import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConf } from 'env.config';
import { Request } from 'express';
import { Op } from 'sequelize';
import { AdminUsersService } from 'src/admin_users/admin_users.service';
import * as bcrypt from 'bcrypt';
import {
  AdminUser,
  IAdminUser,
} from 'src/admin_users/entities/admin_user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ISingIn } from 'src/admin_users/dto/signInUser.dto';
import {
  ISignInResponse,
  ITokenPayload,
} from './interface/responseAuth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => AdminUsersService))
    private readonly usersService: AdminUsersService,
    @InjectModel(AdminUser)
    private readonly adminUserRepository: typeof AdminUser,
  ) {}
  public async logIn({ thisUser, pass }: ISingIn): Promise<ISignInResponse> {
    return await this.usersService
      .findOneUser({
        where: {
          [Op.or]: [{ email: thisUser }, { nickName: thisUser }],
        },
      })
      .then(async (user) => {
        if (!user.user) throw new UnauthorizedException();
        const comparePass = await bcrypt.compareSync(pass, user.user.password);
        if (!comparePass) throw new UnauthorizedException();
        const payload: ITokenPayload = {
          id: user.user.id,
          nickName: user.user.nickName,
        };
        return {
          statusCode: HttpStatus.OK,
          access_token: await this.jwtService.signAsync(payload),
        };
      });
  }

  public async signIn(newUser: Omit<IAdminUser, 'id'>): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newUser.password, salt);
    return await this.adminUserRepository
      .create({ ...newUser, password })
      .then(() => {
        return;
      })
      .catch((error: NodeJS.ErrnoException) => {
        throw new InternalServerErrorException(error.message);
      });
  }
}
