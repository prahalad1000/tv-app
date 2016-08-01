import mongoose from "mongoose";

let tvSchema = new mongoose.Schema({
	"name": String,
	"year": Number
});

export default mongoose.model("Tv", tvSchema);