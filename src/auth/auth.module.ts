import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleConfig } from './config/jwt.config';
import { AdminUsersModule } from 'src/admin_users/admin_users.module';

@Module({
  imports: [
    JwtModule.register(JwtModuleConfig),
    forwardRef(() => AdminUsersModule)
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
