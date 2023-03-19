import fs from "fs";
import path from "path";

export function parserUrl(paths: string[]) {
  let url = "";
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    if (path) {
      if (path[0] === "/") {
        url += path;
      } else {
        url += `/${path}`;
      }
    }
  }
  return url;
}

export function useImportStack(dir: string) {
  const stack: Function[] = [];
  stack.push(async () => {
    const lib_path = `${dir}`;
    try {
      for await (const dirEntry of fs.readdirSync(
        path.join(process.cwd(), lib_path)
      )) {
        await import(path.join(process.cwd(), `${lib_path}/${dirEntry}`));
      }
    } catch (error) {
      console.error(error);
      console.log("no such file or dir :---- " + path);
    }
    for await (const fn of stack) {
      await fn();
    }
  });
}
