import { Request, Response } from "express";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface RouteMethod {
  path: string;
  method: string;
  name: string;
}

export interface RouteOption {
  target: { new (req: Request, res: Response): any };
  root: string;
  methods: RouteMethod[];
}
