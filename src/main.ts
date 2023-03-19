import express from "express";
import bodyParser from "body-parser";
import Gateway from "./gateway";
import path from "path";
import cors from "cors";
import { useRoutes } from "./plugins/router";
import { port, ip_address } from "./config";
import Print from "./tools/log";

import "./services";

function runApp() {
  const server = express();
  const router = useRoutes("api");
  server.use(cors());
  // 静态文件托管
  server.use(express.static(path.join(process.cwd(), "../public")));
  server.use(bodyParser.json());
  server.use(Gateway.middleware);
  server.use(router);
  // 监听端口
  server.listen(port, () => {
    console.clear();
    Print.message(
      `service running http://localhost:${port} http://${ip_address}:${port}`
    );
  });
}

export default runApp;
