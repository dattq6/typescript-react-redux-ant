declare type ApiResponseError = {
  status: number;
  message: string;
  data?: any;
};

declare type ThunkRejectType = {
  rejectValue: ApiResponseError;
};

declare type DataSource<T> = {
  data: Array<T>;
};

declare type BaseState = {
  error?: ApiResponseError;
};

declare type ActionStatus = "idle" | "pending" | "success" | "failed";
