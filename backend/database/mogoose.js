const mongoose = require("mongoose");

//To handle asynchronous codes
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost/todomanager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("Database is Connected"))
  .catch(error => console.log(error));

// var Users = require('../routes/Users')

module.exports = mongoose;
