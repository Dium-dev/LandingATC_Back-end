import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleConfig } from './config/jwt.config';
import { AdminUsersModule } from 'src/admin_users/admin_users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminUser } from 'src/admin_users/entities/admin_user.entity';

@Module({
  imports: [
    JwtModule.register(JwtModuleConfig),
    SequelizeModule.forFeature([AdminUser]),
    forwardRef(() => AdminUsersModule),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
