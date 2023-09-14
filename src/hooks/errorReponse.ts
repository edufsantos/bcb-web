/* eslint-disable @typescript-eslint/no-explicit-any */
interface Data {
  statusCode: number;
  code: string;
  path: string;
}

export default class ApiError<T = Data> extends Error {
  private _data?: T;

  constructor(message: string, data?: T) {
    super(message);
    this._data = data;
  }

  public get data(): T | undefined {
    return this._data;
  }
}
