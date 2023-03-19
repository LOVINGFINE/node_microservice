import express, { Request, Response } from "express";
import { HttpMethod, RouteOption } from "./lib/type";
import { parserUrl } from "./lib/use";

export * from "./lib/type";

export const routes: RouteOption[] = [];

// 这里就是http请求工厂函数，传入的type就是http的get、post等
export function methodFactory(method: HttpMethod) {
  // 类方法修饰器传入三个参数，target是方法本身，key是属性名
  return function (path: string) {
    return function (target: any, name: string) {
      if (target.routes) {
        target.routes.push({
          path,
          method,
          name,
        });
      } else {
        target.routes = [
          {
            path,
            method,
            name,
          },
        ];
      }
    };
  };
}

export const Get = methodFactory(HttpMethod.GET);
export const Post = methodFactory(HttpMethod.POST);
export const Delete = methodFactory(HttpMethod.DELETE);
export const Put = methodFactory(HttpMethod.PUT);
export const Patch = methodFactory(HttpMethod.PATCH);

export function Route(path: string) {
  return function (target: any) {
    if (target.prototype.routes) {
      routes.push({
        target,
        root: path,
        methods: target.prototype.routes,
      });
    }
  };
}

export const useRoutes = (prefix?: string) => {
  const router = express.Router() as any;
  routes.forEach((item) => {
    const { target, root } = item;
    item.methods.forEach((route) => {
      const url = parserUrl([prefix || "", root, route.path]);
      const method = route.method.toLowerCase();
      router[method](url, (req: Request, res: Response) => {
        const obj = new target(req, res);
        obj[route.name]();
      });
    });
  });
  return router;
};
