import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AdminUsersService } from './admin_users.service';
import { CreateAdminUserDto } from './dto/create-admin_user.dto';
import { UpdateAdminUserDto } from './dto/update-admin_user.dto';
import { SignInDto } from './dto/signInUser.dto';
import { JwtAuthService } from 'src/auth/jtwAuth.service';

@Controller('admin-users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @UseGuards(JwtAuthService)
  @Post('signIn')
  async signIn(@Body() newUser: CreateAdminUserDto): Promise<any> {
    return await this.adminUsersService.createUser(newUser);
  }
  
  @Post('logIn')
  async logIn(@Body() thisUser: SignInDto) {
    return await this.adminUsersService.validateUser(thisUser);
  }

  @UseGuards(JwtAuthService)
  @Get()
  async findAllUser() {
    return await this.adminUsersService.findAllUsers();
  }

  @UseGuards(JwtAuthService)
  @Get(':id')
  async findDetailUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.adminUsersService.findByPkUser(id, {
      attributes: ['id', 'nickName', 'email'],
    });
  }

  @UseGuards(JwtAuthService)
  @Patch()
  async update(@Body() updateAdminUserDto: UpdateAdminUserDto) {
    return await this.adminUsersService.updateUser(updateAdminUserDto);
  }

  @UseGuards(JwtAuthService)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.adminUsersService.removeUser(id);
  }
}
