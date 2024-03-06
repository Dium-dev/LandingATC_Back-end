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
  @Post('logIn')
  async logIn(@Body() newUser: CreateAdminUserDto): Promise<any> {
    return await this.adminUsersService.createUser(newUser);
  }

  @Post('signIn')
  async signIn(@Body() thisUser: SignInDto) {
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
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminUserDto: UpdateAdminUserDto,
  ) {
    return this.adminUsersService.update(+id, updateAdminUserDto);
  }

  @UseGuards(JwtAuthService)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminUsersService.remove(+id);
  }
}
