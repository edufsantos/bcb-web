export type IPaginationResponse<T = object> = {
  docs: T[];
  total: number;
  page: number;
  pages: number;
  limit: number;
};

export type IPaginationRequest<T = object> = T & {
  limit?: number;
  page?: number;
  skip?: number;
};
