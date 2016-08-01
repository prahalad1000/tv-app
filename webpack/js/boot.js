import {bootstrap} from 'angular2/platform/browser'; // Angular magic to bootstrap the application in a web browser
import {TvComponent} from './TvComponent';

let boot = document.addEventListener("DOMContentLoaded", () => {
	bootstrap(TvComponent);
});

module.exports = boot; // expose boot so webpack can utilize this
