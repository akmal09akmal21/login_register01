const mongoose = require("mongoose");

const dataDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/loginregister");
    console.log("db ga ulandi");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dataDB;
