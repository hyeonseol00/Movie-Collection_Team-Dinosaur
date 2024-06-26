import { docs } from "./fetch.js";
import { importPage, initInformationPage } from "./switch-info-page.js";
import { uploadBtr, temping } from "./input-review.js";// MD수정코드
import { sortByName, sortByRating } from "./sort-movie-cards.js";
HTMLCollection.prototype.forEach = Array.prototype.forEach;

let $cardsDiv;
let $searchBox;
let $searchButton;
let $pageLinkButton;
let $sortRating;
let $sortName;

const maxCardNumberInPage = 20;
const maxPaginationButtonNumber = 5;
const maxOverviewStringLength = 180;
const loadDocsPage = 50;

let pageNumber = 1;

function initializeQuerySelector() {
	$cardsDiv = document.querySelector("#cards");
	$searchBox = document.getElementById("search-box");
	$searchButton = document.getElementById("search-button");
	$pageLinkButton = document.getElementsByClassName("page-link");
	$sortRating = document.getElementById("sort-rating");
	$sortName = document.getElementById("sort-name");
}

function makeCards(searchText) {
	$cardsDiv.innerHTML = "";
	searchText = searchText.toLowerCase();

	let cardCount = 0;

	for (let i = searchText == "" ? (pageNumber - 1) * maxCardNumberInPage : 0; i < docs.length; i++) {
		if (docs[i]['title'].toLowerCase().indexOf(searchText) !== -1 || searchText === "") {
			let tempOverview = docs[i].overview.slice(0, maxOverviewStringLength);

			if (tempOverview.length <= 0)
				tempOverview = "한글 줄거리가 등록되지 않은 영화입니다.";

			if (tempOverview.length >= maxOverviewStringLength - 1)
				tempOverview += "...";

			let temp_html = `
				<div class="col">
					<div id="${docs[i].movieId}" class="card text-bg-secondary h-100 main-card">
						<img src="${docs[i].backdropImage}" class="card-img-top" alt="...">
						<div class="card-body">
							<h3 class="card-title">${docs[i].title}</h3>
							<p class="card-text">${tempOverview}</p>
						</div>
						<div class="card-footer text-bg-dark">
							<small>평점 : ${docs[i].voteAverage}</small>
						</div>
					</div>
				</div>
				`;

			$cardsDiv.insertAdjacentHTML("beforeend", temp_html);

			const $card = document.getElementById(docs[i].movieId);
			$card.addEventListener('click', (event) => {
				event.preventDefault();
				clickedCard($card.id);
			})

			cardCount++;
		}

		if (cardCount >= maxCardNumberInPage)
			break;
	}
}

async function clickedCard(movieId) {
	await importPage("html/information.html");

	const $posterFrame = document.querySelector("#poster-frame");

	let idx = docs.findIndex(doc => doc['movieId'] == movieId);

	let tempOverview = docs[idx].overview;

	if (tempOverview.length <= 0) {
		tempOverview = "한글 줄거리가 등록되지 않은 영화입니다.";
	}

	let temp_html = `
			<div class="col p-4 text-center poster-box">
				<img src="${docs[idx]['posterImage']}" alt="">
			</div>
			<br>
			<h1>${docs[idx]['title']}</h1>
			<h5>${docs[idx]['originalTitle']}</h5>
			<br>
			<p>개봉 일자 : ${docs[idx]['releaseDate']}</p>
			<p id="movie-id" data-movie-id="${docs[idx]['movieId']}">영화 ID : ${docs[idx]['movieId']}</p>
			<p>평균 평점 : ${docs[idx]['voteAverage']}</p>
			<p>평점 수 : ${docs[idx]['voteCount']}</p>
			<p>줄거리 : <br>&emsp;${tempOverview}</p>
			`;

	$posterFrame.insertAdjacentHTML("beforeend", temp_html);
	uploadBtr(movieId, "uploadbrt", "review"); // MD수정 코드
	temping(movieId, "review-card-box"); // MD수정 코드
	initInformationPage();
}

function inputEvent() { makeCards($searchBox.value); }

function loadPaginationButtonState() {
	$pageLinkButton.forEach((btn) => {
		btn.className = 'page-link';
		if (btn.innerHTML == pageNumber)
			btn.className += ' active';
		else if (parseInt($pageLinkButton[1].innerHTML) - maxPaginationButtonNumber <= 0 && btn.innerHTML == "이전")
			btn.className += ' disabled';
		else if (parseInt($pageLinkButton[1].innerHTML) + maxPaginationButtonNumber >= loadDocsPage && btn.innerHTML == "다음")
			btn.className += ' disabled';
	});
}

function enableDropdown() {
	$sortName.classList.remove("disabled");
	$sortRating.classList.remove("disabled");
}

function addEventListeners() {
	$searchBox.addEventListener('keyup', (event) => {
		event.preventDefault();
		inputEvent();
	})

	$searchButton.addEventListener('click', (event) => {
		event.preventDefault();
		inputEvent();
	})

	$pageLinkButton.forEach((button) => {
		button.addEventListener('click', (event) => {
			event.preventDefault();

			if (button.innerHTML == "이전") {
				$pageLinkButton.forEach((btn) => {
					if (btn.innerHTML != "이전" && btn.innerHTML != "다음")
						btn.innerHTML = parseInt(btn.innerHTML) - maxPaginationButtonNumber;
				});
				pageNumber = $pageLinkButton[maxPaginationButtonNumber].innerHTML;
			}
			else if (button.innerHTML == "다음") {
				$pageLinkButton.forEach((btn) => {
					if (btn.innerHTML != "이전" && btn.innerHTML != "다음")
						btn.innerHTML = parseInt(btn.innerHTML) + maxPaginationButtonNumber;
				});
				pageNumber = $pageLinkButton[1].innerHTML;
			}
			else
				pageNumber = button.innerHTML;

			loadPaginationButtonState();
			makeCards("");
		});
	});

	$sortRating.addEventListener('click', (event) => {
		event.preventDefault();
		sortByRating();
	});

	$sortName.addEventListener('click', (event) => {
		event.preventDefault();
		sortByName();
	})
}

function initPageNumber() { pageNumber = 1; }

export { makeCards, loadPaginationButtonState, addEventListeners, loadDocsPage, initializeQuerySelector, pageNumber, maxPaginationButtonNumber, initPageNumber, enableDropdown };