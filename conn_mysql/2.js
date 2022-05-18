//  crm sequelizejs

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('demo', 'root', '123456', {
  host: 'localhost',
  dialect:'mysql'
});
try {
  (async ()=>{
    await sequelize.authenticate();
    console.log('successfully.');
  })()
  
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// 创建表
class User extends Model {} 
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

// 插入元素
(async () => {ß
  await sequelize.sync(); // 同步到数据库
  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
  console.log(jane.toJSON());
})();