import { addEventListeners, initializeQuerySelector, loadPaginationButtonState, makeCards } from "./common.js";

async function fetchHtmlAsText(url) {
	return await (await fetch(url)).text();
}

async function importPage(target) {
	document.querySelector('body').innerHTML = await fetchHtmlAsText(target);
}

function initInformationPage() {
	let $exitButton = document.querySelector("#exit-button");

	$exitButton.addEventListener('click', (event) => {
		event.preventDefault();
		backToMainPage();
	});
}

async function backToMainPage() {
	await importPage("html/main.html");
	initializeQuerySelector();
	makeCards("");
	addEventListeners();
	loadPaginationButtonState();
}

export { importPage, initInformationPage };