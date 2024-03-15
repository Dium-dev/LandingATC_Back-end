import { Module, forwardRef } from '@nestjs/common';
import { AdminUsersService } from './admin_users.service';
import { AdminUsersController } from './admin_users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminUser } from './entities/admin_user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthService } from 'src/auth/jtwAuth.service';

@Module({
  imports: [
    SequelizeModule.forFeature([AdminUser]),
    forwardRef(() => AuthModule),
  ],
  controllers: [AdminUsersController],
  providers: [AdminUsersService, JwtAuthService],
  exports: [AdminUsersService, JwtAuthService],
})
export class AdminUsersModule {}
