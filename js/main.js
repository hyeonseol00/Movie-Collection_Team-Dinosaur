import { getDocs } from "./fetch.js";
import { makeCards, loadPaginationButtonState, addEventListeners } from "./common.js";

async function init()
{
	await getDocs();
	makeCards("");
	addEventListeners();
	loadPaginationButtonState();
}

init();