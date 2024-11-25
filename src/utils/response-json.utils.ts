export type ResponseJson<T = object | [] | null> = {
  status: string;
  message: string;
  statusCode: number;
  data?: T;
};

export function responseJson<T>(
  message: string,
  statusCode: number = 200,
  data?: T,
): ResponseJson<T> {
  return {
    status: statusCode >= 400 ? 'error' : 'success',
    message,
    statusCode,
    data,
  };
}
