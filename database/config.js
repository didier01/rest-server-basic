const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    });

    console.log('bd connected!!!');
  } catch (error) {
    console.log(error);
    throw new Error("error al iniciar la bd");
  }
};

module.exports = {
  dbConnection,
};
