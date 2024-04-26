import { getDocs } from "./fetch.js";
import { makeCards, loadPaginationButtonState, addEventListeners } from "./common.js";

async function init()
{
	addEventListeners();
	await getDocs();
	makeCards("");
	loadPaginationButtonState();
}

init();