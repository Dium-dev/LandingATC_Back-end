import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { IAdminUser } from '../entities/admin_user.entity';

export class CreateAdminUserDto implements IAdminUser {
  @IsNotEmpty()
  @IsString()
  nickName: string;

  @IsNotEmpty()
  @IsEmail(undefined, { message: 'El formato del email no es valido' })
  email: string;

  @IsNotEmpty()
  @Matches(
    /^(?=.*[A-Za-zñÑáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛ])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-zñÑáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛ\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
    {
      message:
        'La contraseña debe ser de 8 a 15 caracteres, tener una mayúscula, una minúscula, un número y un carácter especial',
    },
  )
  password: string;
}
