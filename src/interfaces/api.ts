export type OrderByDirection = "asc" | "desc";

export interface FetchListRequest<
  Search = object,
  OrderBy = { [key: string]: OrderByDirection }
> {
  skip?: number;
  take?: number;
  search?: Search;
  orderBy?: OrderBy;
}

export interface FetchListResponse<T> {
  count: number;
  skip: number;
  take: number;
  rows: T[];
}
