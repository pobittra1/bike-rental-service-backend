export type TErrorSource = {
  //that means array of object type here
  path: string | number;
  message: string;
}[];

export type TGenericsErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSource;
};
