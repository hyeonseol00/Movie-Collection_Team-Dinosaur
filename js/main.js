import { getDocs, docs/*삭제*/ } from "./fetch.js";
import { makeCards, loadPaginationButtonState, addEventListeners } from "./common.js";

async function init()
{
	await getDocs();
	makeCards("");
	addEventListeners();
	loadPaginationButtonState();
}

init();
console.log(docs);//삭제