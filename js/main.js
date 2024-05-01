import { getDocs } from "./fetch.js";
import { makeCards, loadPaginationButtonState, addEventListeners } from "./common.js";

async function init() {
	localStorage.clear();
	await getDocs();
	makeCards("");
	addEventListeners();
	loadPaginationButtonState();

	console.log(JSON.parse(localStorage.review));
}

init();