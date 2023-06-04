import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwt = require('jsonwebtoken');
    let tokendetails = jwt.decode(request.headers.authorization.split(' ')[1]);
    return tokendetails.id;
  },
);


