import { deleteReview } from "./delete-review.js"
import { changeReview } from "./change-review.js";
import { addEventListeners, initializeQuerySelector, loadPaginationButtonState, makeCards, maxPaginationButtonNumber, pageNumber } from "./common.js";

let $exitButton;
let $modalUpdateButton;
let $modalDeleteButton;

async function fetchHtmlAsText(url) {
	return await (await fetch(url)).text();
}

async function importPage(target) {
	document.querySelector('body').innerHTML = await fetchHtmlAsText(target);
}

function initInformationPage() {
	$exitButton = document.querySelector("#exit-button");
	$modalUpdateButton = document.querySelector("#modal-update-button");
	$modalDeleteButton = document.querySelector("#modal-delete-button");

	$exitButton.addEventListener('click', (event) => {
		event.preventDefault();
		backToMainPage();
	});
	$modalUpdateButton.addEventListener('click', event => {
		event.preventDefault();
		changeReview();
	});
	$modalDeleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        deleteReview();
    });
}

function setPaginationButtonNumber() {
	const $pageLinkButton = document.getElementsByClassName("page-link");
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

export { importPage, initInformationPage, backToMainPage };