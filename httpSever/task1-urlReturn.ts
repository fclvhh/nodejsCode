import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { IncomingMessage, ServerResponse } from "http";
const server = http.createServer();
const publicDir = path.resolve(__dirname,"public") // 得到绝对路径
server.on("request", (req: IncomingMessage, res: ServerResponse) => {
  console.log(req.url);
  const { method, url, headers } = req;
  switch (url) {
    case "/index.html":
      // 拼接路径
      fs.readFile(path.resolve(publicDir,'index.html'),(error,data)=>{
        if ( error )throw  error
        res.end(data.toString())
      })
      break;
    case "/style.css":
      res.setHeader("Content-Type","text/css;charset=utf-8")
      fs.readFile(path.resolve(publicDir,'style.css'),(error,data)=>{
        if ( error )throw  error
        res.end(data.toString())
      })
      break;
    case "/main.js":
      res.setHeader("Content-Type","text/javaScript;charset=utf-8")
      fs.readFile(path.resolve(publicDir,'main.js'),(error,data)=>{
        if ( error )throw  error
        res.end(data.toString())
      })
      break;
  }

  // const arr = [];

  // req.on("data", (chunk) => {
  //   arr.push(chunk);
  // });

  // req.on("end", () => {
  //   const body = Buffer.concat(arr).toString();
  //   console.log("body");
  //   console.log(body);
  // });

  // console.log("someone requset!");
  // res.end("hi");

});

server.listen(8888);
