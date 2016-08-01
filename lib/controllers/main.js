"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Tv = require("../models/Tv");

var _Tv2 = _interopRequireDefault(_Tv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mongoDB model Tv is exported from this file

var mainController = {
	getIndex: function getIndex(req, res) {
		res.render("index");
	},
	getTemplate: function getTemplate(req, res) {
		res.render("templates/" + req.params.template);
	},
	getAllTvs: function getAllTvs(req, res) {
		_Tv2.default.find({}, function (err, tvs) {
			if (err) {
				return res.send(err);
			}
			res.json(tvs);
		});
	},
	postNewTv: function postNewTv(req, res) {
		_Tv2.default.create({
			name: req.body.name,
			year: req.body.year
		}, function (err, tv) {
			if (err) {
				return res.send(err);
			}
			_Tv2.default.find({}, function (err, tvs) {
				if (err) {
					return res.send(err);
				}
				res.json(tvs);
			});
		});
	},
	deleteTv: function deleteTv(req, res) {
		_Tv2.default.remove({
			_id: req.params.id
		}, function (err, tv) {
			if (err) {
				return res.send(err);
			}
			_Tv2.default.find({}, function (err, tvs) {
				if (err) {
					return res.send(err);
				}
				res.json(tvs);
			});
		});
	}
};

exports.default = mainController;