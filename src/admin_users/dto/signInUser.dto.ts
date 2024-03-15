import { IsNotEmpty, IsString, Matches } from 'class-validator';

export interface ISingIn {
  thisUser: string;
  pass: string;
}

export class SignInDto implements ISingIn {
  @IsNotEmpty()
  @IsString()
  thisUser: string;

  @IsNotEmpty()
  @Matches(
    /^(?=.*[A-Za-zñÑáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛ])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-zñÑáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛ\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
    {
      message:
        'La contraseña debe ser de 8 a 15 caracteres, tener una mayúscula, una minúscula, un número y un carácter especial',
    },
  )
  pass: string;
}
