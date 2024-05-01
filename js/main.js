import { getDocs } from "./fetch.js";
import { makeCards, loadPaginationButtonState, addEventListeners, loadDocsPage } from "./common.js";

async function init() {
	localStorage.clear();	// 개발 중 임시로 실행 시 마다 localStorage 초기화

	await getDocs(1, 1);
	makeCards("");
	addEventListeners();
	loadPaginationButtonState();
	getDocs(2, loadDocsPage);
}

init();