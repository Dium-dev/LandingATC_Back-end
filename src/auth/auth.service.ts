import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConf } from 'env.config';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AdminUsersService } from 'src/admin_users/admin_users.service';

@Injectable()
export class AuthService implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(AdminUsersService)
        private readonly usersService: AdminUsersService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: JwtConf.jwt_secret
                }
            );
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    async signIn(
        username: string,
        pass: string,
    )/* : Promise<{ access_token: string }> */ {
        /* const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { userId: user.userId };
        return {
            access_token: await this.jwtService.signAsync(payload),
        }; */
    }

    async logIn() {

    }
}
