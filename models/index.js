const mongoose = require("mongoose"),
      Promise  = require("bluebird")
      
mongoose.set("debug", true) //setting the debug mode to true so that we can see what happens when data is being sent to the database.      
mongoose.connect("mongodb://localhost/todo_app", { useNewUrlParser: true })

mongoose.Promise = Promise  // this line will enable us to use to chain on .then() rather that using a callback()

module.exports = require("./todo");