const winston = require('winston');
const mongoose = require('mongoose');
const config = require("config");

const mongConfig ={
  useNewUrlParser: true, 
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology:true
  
}

module.exports = function() {
 // const db ="mongodb+srv://utlm:kernel123@kernelcodder.zq4fr.mongodb.net/utility";
  const db = config.get('db',mongConfig);
  mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`));
}