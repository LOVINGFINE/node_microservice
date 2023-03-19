import { Request, Response } from "express";

export class RouteCtx {
  constructor(public request: Request, public response: Response) {}

  get body() {
    return this.request.body;
  }

  get query() {
    return this.request.query;
  }

  get params() {
    return this.request.params;
  }

  get headers() {
    return this.request.headers;
  }

  send(code: number, data: unknown) {
    try {
      if (typeof data === "string") {
        this.response.status(code).send(data);
      } else {
        this.response.status(code).send(data);
      }
    } catch (e) {
      this.response.status(code).send(JSON.stringify(e));
    }
  }
}
