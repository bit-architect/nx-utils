export interface PaginatorQuery {
  page: number;
  skip: number;
  take: number;
  sort: Record<string, string>;
  filter: object;
}
