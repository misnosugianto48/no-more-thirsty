export function responseJson(
  status: string,
  message: string,
  statusCode: number,
  data: object,
) {
  return {
    status: status,
    message: message,
    statusCode: statusCode,
    data: data,
  };
}
