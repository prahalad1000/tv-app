import path from "path";

let webpackConfig = {
	entry: path.join(__dirname, "webpack", "index.js"),
	output: {
		path: path.join(__dirname, "public"),
		filename: "bundle.js"
	},
	module : {
		loaders: [
			{test: /\.js$/, loaders: ["babel-loader"]},
			{test: /\.css$/, loaders: ["style-loader", "css-loader"]},
			{test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000'}
		]
	}
};

export default webpackConfig;