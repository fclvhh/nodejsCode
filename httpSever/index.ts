import * as http from "http"
import { IncomingMessage,ServerResponse } from "http";
const server = http.createServer();
server.on('request',(req:IncomingMessage,res:ServerResponse)=>{
  console.log(req.httpVersion);
  console.log(req.url);
  console.log(req.method);
  const arr = []
  console.log(req.headers);
  req.on('data',(chunk)=>{
    arr.push(chunk)
  })
  req.on('end',()=>{
    const body = Buffer.concat(arr).toString()
    console.log('body');
    console.log(body);
    
  })
  console.log("someone requset!");
  res.end('hi')
})

server.listen(8888)


