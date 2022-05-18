let fs = require('fs')
function getFile() {
  return new Promise((resolve,reject)=>{
    fs.readFile('./demo.txt',{encoding:"utf-8",flag:"a+"},(err,data)=>{
      if(err) {
        reject(err)
      }
      resolve(data.toString())
    })
  })
}

var promise = getFile()

promise.then((data)=>{
 console.log(data);
})


console.log('js end!');