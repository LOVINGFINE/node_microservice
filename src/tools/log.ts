import dayjs from "dayjs";

class Print {
  static now() {
    return dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  }

  static error(msg: string) {
    console.error(`[${Print.now()}] ${msg}`);
  }

  static message(msg: string) {
    console.log(`[${Print.now()}] ${msg}`);
  }
}

export default Print;
