export interface IPayload<T> {
  data: T;
  message: string;
  success: boolean;
}
