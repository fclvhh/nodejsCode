import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import * as urlParse from "url"
import { IncomingMessage, ServerResponse } from "http";
const server = http.createServer();
const publicDir = path.resolve(__dirname,"public")
server.on("request", (req: IncomingMessage, res: ServerResponse) => {
  const { method, url, headers } = req;
  const {pathname,query} = urlParse.parse(url) // 解析路径

  if(method !== "GET") {
    res.statusCode = 405
    res.setHeader("Content-Type","text/html;charset=utf-8")
    res.end("不接受非GET 请求！")
  }

  console.log(pathname);
  
  let fileName = pathname.substr(1);
  if(fileName === "") {
    fileName = "index.html"
  }
   fs.readFile(path.resolve(publicDir,fileName),(error,data)=>{
        if ( error ) {
          res.statusCode = 404
          fs.readFile(path.resolve(publicDir,"404.html"),(error,data) =>{
            res.end(data)
          })
          res.setHeader("Content-Type","text/html;charset=utf-8")
         
        }else {
          // 添加缓存选项
          res.setHeader("Cache-Control","public,max-age=31536000")
          res.end(data)
        }
       
      })

 

});

server.listen(8888);
