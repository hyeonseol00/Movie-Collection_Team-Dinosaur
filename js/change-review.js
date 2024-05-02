import { getReviewObject, setReviewObject } from "./common-local-storage.js";

let $modalNameInput;
let $modalReviewTextarea;

function changeReview(movieId, idx, name, password, text) {
	let tempObject = getReviewObject();

	if (password == tempObject[movieId][idx].password) {
		tempObject[movieId][idx].name = name;
		tempObject[movieId][idx].text = text;
	}

	setReviewObject(tempObject);
}

function openUpdateModal(movieId, idx) {
	let tempObject = getReviewObject();

	$modalNameInput = document.querySelector("#modal-name-input");
	$modalReviewTextarea = document.querySelector("#modal-review-textarea");

	$modalNameInput.attr('value', tempObject[movieId][idx].name);
	$modalReviewTextarea.html(tempObject[movieId][idx].text);
}

export { changeReview, openUpdateModal };