import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { PaginatorService } from './../services/paginator.service';
import { PaginatorOptions } from './../models/paginator-options.model';

export const Paginator = createParamDecorator(
  (data: Partial<PaginatorOptions>, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return new PaginatorService().parseQuery(request.query, data);
  }
);
