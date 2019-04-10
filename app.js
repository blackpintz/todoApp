const express    = require("express"),
      app        = express(),
      todoRoutes = require("./routes/todos.js"),
      bodyParser = require("body-parser")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));1
app.use("/api/todos", todoRoutes)  // /api/todos is a prefix for all the routes
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res) => {
    res.sendFile("home.html", {root:__dirname + "/views"} );
})







app.listen(process.env.PORT, process.env.IP, () => {
    console.log("App is running!");
})    
   



      