import { initPageNumber } from "./common.js";
import { docs } from "./fetch.js";
import { backToMainPage } from "./switch-info-page.js";

function sortByRating() {
	docs.sort((a, b) => { return b["voteAverage"] - a["voteAverage"] });

	initPageNumber();
	backToMainPage();
}

function sortByName() {
	docs.sort((a, b) => {
		if (a["title"] > b["title"])
			return 1;
		if (a["title"] < b["title"])
			return -1;
		return 0;
	});

	initPageNumber();
	backToMainPage();
}

export { sortByRating, sortByName };