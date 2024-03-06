import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminUser } from 'src/admin_users/entities/admin_user.entity';
import { ITokenPayload } from './interface/responseAuth.interface';
import { JwtConf } from 'env.config';
import { Op } from 'sequelize';
import { Request } from 'express';

@Injectable()
export class JwtAuthService implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: ITokenPayload = await this.jwtService.verifyAsync(token, {
        secret: JwtConf.jwt_secret,
        algorithms: ['HS256'],
      });
      if (payload)
        await AdminUser.findOne({
          where: {
            [Op.and]: [{ id: payload.id }, { nickName: payload.nickName }],
          },
        }).then((res) => {
          if (res) return;
          else throw new UnauthorizedException();
        });
      else {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
