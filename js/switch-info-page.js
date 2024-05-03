import { changeReview, openUpdateModal } from "./change-review.js";
import { addEventListeners, initializeQuerySelector, loadPaginationButtonState, makeCards, maxPaginationButtonNumber, pageNumber } from "./common.js";

let $exitButton;
let $updateButton;
let $modalUpdateButton;

async function fetchHtmlAsText(url) {
	return await (await fetch(url)).text();
}

async function importPage(target) {
	document.querySelector('body').innerHTML = await fetchHtmlAsText(target);
}

function initInformationPage() {
	$exitButton = document.querySelector("#exit-button");
	$updateButton = document.getElementsByClassName("update-button");
	$modalUpdateButton = document.querySelector("#modal-update-button");

	$exitButton.addEventListener('click', (event) => {
		event.preventDefault();
		backToMainPage();
	});
	$updateButton.forEach(button => {
		button.addEventListener("click", (event) => {
			event.preventDefault();
			openUpdateModal(event.target.parentElement.parentElement.parentElement);
		});
	});
	$modalUpdateButton.addEventListener('click', event => {
		event.preventDefault();
		changeReview();
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

export { importPage, initInformationPage };