import Tv from "../models/Tv"; // mongoDB model Tv is exported from this file

let mainController = {
	getIndex: (req, res) => {
		res.render("index");
	},
	getTemplate: (req, res) => {
		res.render("templates/"+ req.params.template);
	},
	getAllTvs: (req, res) => {
		Tv.find({}, (err, tvs) => {
			if (err) {
				return res.send(err);
			}
			res.json(tvs);
		});
	},
	postNewTv: (req, res) => {
		Tv.create({
			name: req.body.name,
			year: req.body.year
		}, (err, tv) => {
			if (err) {
				return res.send(err);
			}
			Tv.find({}, (err, tvs) => {
				if (err) {
					return res.send(err);
				}
				res.json(tvs);
			})
		})
	},
	deleteTv: (req, res) => {
		Tv.remove({
			_id: req.params.id
		}, (err, tv) => {
			if (err) {return res.send(err);}
			Tv.find({}, (err, tvs) => {
				if (err) {return res.send(err);}
				res.json(tvs);
			})
		})
	}
}

export default mainController;



