import { Request, Response } from "express";
import Print from "../tools/log";

export class Gateway {
  constructor(
    public req: Request,
    public res: Response,
    public next: Function
  ) {}

  get token() {
    return (this.req.headers["Access-Token"] || "") as string;
  }

  async auth() {}

  handle() {
    this.sendError(500, "拦截");
    // this.next();
  }

  sendError(code: number, msg: string) {
    Print.error(`${code} ${msg}`);
    this.res.status(code).send({ msg, code: -1 });
  }

  static middleware(req: Request, res: Response, next: Function) {
    const gateway = new Gateway(req, res, next);
    // 下一步
    gateway.handle();
  }
}

export default Gateway;
