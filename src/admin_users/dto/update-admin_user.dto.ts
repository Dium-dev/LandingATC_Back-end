import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminUserDto } from './create-admin_user.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateAdminUserDto extends PartialType(CreateAdminUserDto) {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
