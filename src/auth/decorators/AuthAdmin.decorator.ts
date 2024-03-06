import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthAdminUser: ParameterDecorator = createParamDecorator(
  async (_data: unknown, context: ExecutionContext): Promise<void> => {},
);
