const winston = require("winston");
const config = require("config");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));

 winston.createLogger({
    transports: [
      new winston.transports.MongoDB({
        db: config.get("db"),
        collection: "log",
        level: "info",
        storeHost: true,
        capped: true,
      }),
    ],
  });


};
