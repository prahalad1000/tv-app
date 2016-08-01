import {Inject} from "angular2/core";
import {Http, Headers} from "angular2/http";
import 'rxjs/add/operator/map' // Allows us to map the HTTP response from raw to JSON format


// To inject Http we can also use "Injectable" module exported from "angular2/core"
// @Injectable()  - this needs to be added & can omit @Inject(Http) in below code
class TvService {
	constructor(http) { // inject Http to our service class or you can just use http:Http here and enable below commented code TvService.parameters = [new Inject(Http)];
		this.http = http;
	}
	getAllTvs() {
		return this.http.get("/tvs").map((response) => {
			return JSON.parse(response._body); // why _body instead of just body, need to debug
		});
	}
	postNewTv(data) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json'); // set json header so data is parsed properly by bodyParser in backend
		return this.http.post("/tvs", JSON.stringify(data), {headers: headers}).map((response) => {
			return JSON.parse(response._body);
		});
	}
	deleteTv(id) {
		return this.http.delete("/tvs/"+ id).map((response) => {
			return JSON.parse(response._body);
		});
	}
}

TvService.parameters = [new Inject(Http)]; // inject dependency modules to a class using inject module

export {TvService};