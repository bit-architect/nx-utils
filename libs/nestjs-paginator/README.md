# nestjs-paginator

## Installation

Add the library via

```
npm i @bit-architect/nestjs-paginator
```

or

```
yarn add @bit-architect/nestjs-paginator
```

## Usage

The library provides a handy decorator that can be added to any NestJS controller. Consider the following example:

```ts
import { Paginator, PaginatorQuery } from '@bit-architect/nestjs-paginator';
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  getUsers(@Paginator() query: PaginatorQuery) {
    // console.log(query);
    return await this.service.getUsers(query);
  }
}
```

Currently, the `Paginator` supports the following query parameters:

- `page`: number
- `limit`: number
- `sort`: string
- `filter`: object

Now, you can make a HTTP Call to the endpoint and pass the params as follows:

```curl
http://api.example.com/users?limit=20&page=3&sort=-email,username
```

This will return

- 20 users
- from the 3rd page (i.e., entry 21-30 from the database according to your `sort` and `filter` parameters)
- ordered by email descending (note the `-`) and username ascending

### Different Format

The `Paginator` is designed to be ORM agnostic, i.e., it can be easily extended / adapted to work with common ORMs, like `TypeORM` or `Prisma`.

The easiest approach would be to simply create a `PrismaPaginator` Decorator and call the `PaginatorService`, and adapt the response as required.
This may look like this:

```ts
import { PaginatorService, PaginatorOptions } from '@bit-architect/nestjs-paginator';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { PrismaPaginatorQuery } from './prisma-paginator-query.model';

export const PrismaPaginator = createParamDecorator((data: Partial<PaginatorOptions>, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const query = new PaginatorService().parseQuery(request.query, data);

  const prismaQuery: PrismaPaginatorQuery = {
    skip: query.skip,
    take: query.take,
    orderBy: query.sort, // note that prisma uses the orderBy instead of sort parameter!
  };

  return prismaQuery;
});
```

Now you can just use the `PrismaPaginator` instead of the default `Paginator` in your controllers.
