 // 1. 读取之前的任务
 // 2. 往里面添加一个title 任务
 // 3. 存储任务到文件
 // 设计三个接口 read , add , save

 const homedir = require('os').homedir();
 const home = process.env.HOME || homedir
 const path = require('path')
 const fs = require('fs')
 const dbPath = path.join(home, '.todo')

 const db = {
   read(path = dbPath) {
     return new Promise((resolve, reject) => {
       fs.readFile(path, {
         flag: "a+"
       }, (error, data) => {

         if (error) {
           reject(error);
         } else {
           let list
           try {
             list = JSON.parse(data.toString()) //  把json字符串，解析成对象
           } catch (error2) {
             list = [] // 数组也是对象的一种
           }
           resolve(list)
         }
       })
     })
   },
   add: async (title) => {
     let list = await db.read()
     list.push({
       title,
       done: false
     })
     await db.save(list)
   },
   save(list, path = dbPath) {
     return new Promise((resolve, reject) => {
       const string = JSON.stringify(list) //转换成字符串
       fs.writeFile(path, string, (error3) => {
         if (error3) {
           reject(error3)
         }else {
          resolve()
         }        
       })
     })

   },

   clear:async()=>{
     await db.save([])
   },

   showAll:async()=> {
    console.log("show all");
    const list = await db.read()
    list.forEach((item,index) => {
      console.log(`${item.done? '[x]':'[_]'} ${index+1} - ${item.title}`);
    });
   }
 }

 module.exports = db