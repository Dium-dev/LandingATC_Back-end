import { Module } from '@nestjs/common';
import { AdminUsersService } from './admin_users.service';
import { AdminUsersController } from './admin_users.controller';

@Module({
  controllers: [AdminUsersController],
  providers: [AdminUsersService],
  exports: [AdminUsersService]
})
export class AdminUsersModule { }
