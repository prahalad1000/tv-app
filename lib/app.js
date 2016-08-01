"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require("method-override");

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _main = require("./controllers/main");

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// configure DB connection
// MongoDB wrapper
// converts post request params and create request.body.params
// server  
_mongoose2.default.connect("mongodb://localhost:27017/tvDB"); // to get root path

// import app controllers here
// enable PUT/DELETE calls from old browsers
// logger - can be changed to something else
// import external modules required here

_mongoose2.default.connection.on("error", function () {
	console.log("Error in Mongo Connection establishment. Make sure MongoDB is running");
	process.exit(1); // dont know what this does
});

var app = (0, _express2.default)();

app.set("port", process.env.PORT || 8080);
app.set("views", _path2.default.join(__dirname, "..", "views"));
app.set("view engine", "jade");
app.use(_express2.default.static(_path2.default.join(__dirname, '..', 'public')));
app.use((0, _morgan2.default)('dev')); // log only for development
app.use(_bodyParser2.default.json()); // parse JSON data from POST request and create an object request.body so that we can read it easily
app.use((0, _methodOverride2.default)()); // Allow PUT/DELETE

app.listen(app.get("port"), function () {
	console.log('Server is running on port ${app.get("port")}'); // ${} is ES6 way of evaluating stuff
});

// routes can also use routes/index.js for these type of requests
app.get('/', _main2.default.getIndex);
app.get('/templates/:template', _main2.default.getTemplate);
app.get('/tvs', _main2.default.getAllTvs);
app.post('/tvs', _main2.default.postNewTv);
app.delete('/tvs/:id', _main2.default.deleteTv);