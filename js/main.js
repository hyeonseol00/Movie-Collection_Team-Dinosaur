import { getDocs } from "./fetch.js";
import { makeCards, loadPaginationButtonState, addEventListeners, loadDocsPage, initializeQuerySelector } from "./common.js";
import { importPage } from "./switch-info-page.js";

async function init() {
	localStorage.clear();	// 개발 중 임시로 실행 시 마다 localStorage 초기화
	
	await importPage("html/main.html");
	await getDocs(1, 1);
	initializeQuerySelector();
	makeCards("");
	addEventListeners();
	loadPaginationButtonState();
	getDocs(2, loadDocsPage);
}

init();