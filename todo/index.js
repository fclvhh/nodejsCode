const homedir = require('os').homedir();
const home = process.env.HOME || homedir
const path = require('path')
const fs = require('fs')
const dbPath = path.join(home,'.todo')
// 导出add方法
module.exports.add = (title)=>{
 
    // 1. 读取之前的任务
  fs.readFile(dbPath,{flag:"a+"},(err,data)=>{
  
    if(err) { console.log(error) }

    else {
      console.log(data.toString());
       // 判断todo文件是否为空 ， 如果空就创建一个空数组
      // 该如何判断呢？
      let list
      try {
        list = JSON.parse(data.toString()) //  把json字符串，解析成对象
       
      }catch(error2) {
        list = [] // 数组也是对象的一种
      }
      console.log(list);
      // 2. 往里面添加一个title 任务
      const task = {
        title:title,
        done:false
      }

      list.push(task)
      console.log(list);
    // 3. 存储任务到文件
      const string = JSON.stringify(list) //转换成字符串
      fs.writeFile(dbPath,string,(error3)=>{
        if(error3) {
          console.log(error3);
        }
      })
    }

  })

  
 
}