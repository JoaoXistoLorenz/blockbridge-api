/* eslint-disable prettier/prettier */
export class Response {
  constructor(data: any = {}, message = '', success = true) {
    this.data = data;
    this.message = message;
    this.success = success;
  }

  public success: boolean;
  public message: string;
  public data: any;
}
