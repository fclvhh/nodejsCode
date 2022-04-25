#!/usr/bin/env node
const api = require('./index') // 这个api对象挂载很多方法
const db = require('./db')
const commander = require('commander')
const program = new commander.Command()

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza')
  .option('-x,--xxx', 'what the x');



program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const words = args.slice(0,-1).join(" ")
    // api.add(words)
    db.read()
    db.add(words).then(()=>{ console.log("添加成功"); },()=>{ console.log("添加失败"); })
  
  

  });

program
  .command('clear')
  .description('clear tasks')
  .action(() => {
    console.log('clear tasks!');
    db.clear().then(()=>{ console.log("清除成功"); },()=>{ console.log("清除失败"); })
  });

program.parse(process.argv);

if(process.argv.length === 2) {
  db.showAll()
}


