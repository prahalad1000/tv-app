// import external modules required here
import express from "express"; // server  
import logger from "morgan"; // logger - can be changed to something else
import bodyParser from "body-parser"; // converts post request params and create request.body.params
import methodOverride from "method-override"; // enable PUT/DELETE calls from old browsers
import mongoose from "mongoose"; // MongoDB wrapper
import path from "path"; // to get root path

// import app controllers here
import mainController from "./controllers/main";

// configure DB connection
mongoose.connect("mongodb://localhost:27017/tvDB");
mongoose.connection.on("error", function(){
	console.log("Error in Mongo Connection establishment. Make sure MongoDB is running");
	process.exit(1); // server running exits from this
});

let app = express();

app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(logger('dev')); // log only for development
app.use(bodyParser.json()); // parse JSON data from POST request and create an object request.body so that we can read it easily
app.use(methodOverride()); // Allow PUT/DELETE

app.listen(app.get("port"), function(){
	console.log('Server is running on port ${app.get("port")}'); // ${} is ES6 way of evaluating stuff
});

// routes can also use routes/index.js for these type of requests
app.get('/', mainController.getIndex);
app.get('/templates/:template', mainController.getTemplate);
app.get('/tvs', mainController.getAllTvs);
app.post('/tvs', mainController.postNewTv);
app.delete('/tvs/:id', mainController.deleteTv);
