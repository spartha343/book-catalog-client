export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IApiResponse<T> = {
  statusCode?: number;
  success: boolean;
  message?: string | null;
  errorMessages?: IGenericErrorMessage[];
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};
