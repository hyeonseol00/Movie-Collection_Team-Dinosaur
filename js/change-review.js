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

function openUpdateModal(review) {
	let tempObject = getReviewObject();

	$modalNameInput = document.querySelector("#modal-name-input");
	$modalReviewTextarea = document.querySelector("#modal-review-textarea");

	$modalNameInput.attr('value', review.firstElementChild.firstElementChild.innerHTML);
	$modalReviewTextarea.html(review.lastElementChild.firstElementChild.innerHTML);
}

export { changeReview, openUpdateModal };