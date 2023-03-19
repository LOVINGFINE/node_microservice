import { Request, Response } from "express";
import { Post, Route } from "../../../plugins/router";
import { RouteCtx } from "../../../plugins/context";

@Route("sign")
class UserSign extends RouteCtx {
  @Post("in")
  signIn() {
    const { email = "", password = "" } = this.body;
    if (email && password) {
      console.log(email, password);
      this.send(200, { message: "ok" });
    } else {
      this.send(400, { message: "邮箱密码不能为空" });
    }
  }

  @Post("up")
  signUp() {
    const { email = "", password = "" } = this.body;
    if (email && password) {
      console.log(email, password);
      this.send(200, { message: "ok" });
    } else {
      this.send(400, { message: "邮箱密码不能为空" });
    }
  }
}

export default UserSign;
