import {Component, View} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {TvService} from "./TvService";

class TvComponent {
	constructor(tvService) {
		this.tvs = [];
		this.tvData = {
			"name": "",
			"year": 0
		};
		this.tvService = tvService;
		this.tvService.getAllTvs().subscribe((resp) => { // rxjs, we subscribe to response of a promise
			this.tvs = resp;
		});
	}
	createTv() {
		this.tvService.postNewTv(this.tvData).subscribe((resp) => {
			this.tvs = resp;
			this.tvData = {
				"name": "",
				"year": 0
			};
		});
	}
	deleteTv(id) {
		this.tvService.deleteTv(id).subscribe((resp) => {
			this.tvs = resp;
		})
	}
}

TvComponent.annotations = [ // can also use @Component above TvComponent class for metadata
	new Component({
		"selector": "tv-app",
		"providers" : [TvService, HTTP_PROVIDERS],
		"templateUrl" : "templates/TvComponent"
	})
];

TvComponent.parameters = [[TvService]];  // Injecting TvService dependency to TvComponent

export {TvComponent};