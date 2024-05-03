import { addEventListeners, initializeQuerySelector, loadPaginationButtonState, makeCards, maxPaginationButtonNumber, pageNumber } from "./common.js";

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

function setPaginationButtonNumber() {
	let $pageLinkButton = document.getElementsByClassName("page-link");
	let count = (pageNumber - pageNumber % maxPaginationButtonNumber) + 1;

	if (pageNumber % maxPaginationButtonNumber == 0)
		count -= maxPaginationButtonNumber;

	$pageLinkButton.forEach((button) => {
		if (button.innerHTML != "이전" && button.innerHTML != "다음") {
			button.innerHTML = count++;

			if (count % maxPaginationButtonNumber == 1)
				count -= maxPaginationButtonNumber;
		}
	});
}

async function backToMainPage() {
	await importPage("html/main.html");
	initializeQuerySelector();
	makeCards("");
	addEventListeners();
	setPaginationButtonNumber();
	loadPaginationButtonState();
}

export { importPage, initInformationPage };