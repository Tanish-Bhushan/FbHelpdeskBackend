const mongoose=require("mongoose")

const connectDataBase = () => {
    mongoose.connect("mongodb+srv://xtract07:I0YtFaJZDep7hLkD@cluster0.8ililvw.mongodb.net/?retryWrites=true&w=majority").then((data) => {
      console.log(`Database connected with ${data.connection.host}`);
    });
  };
  
module.exports = connectDataBase;
