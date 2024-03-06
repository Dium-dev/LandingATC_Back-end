import { JwtModuleOptions } from '@nestjs/jwt';
import { JwtConf } from 'env.config';

export const JwtModuleConfig: JwtModuleOptions = {
  secret: JwtConf.jwt_secret,
  global: true,
  signOptions: {
    expiresIn: '3h',
    algorithm: 'HS256',
  },
};
