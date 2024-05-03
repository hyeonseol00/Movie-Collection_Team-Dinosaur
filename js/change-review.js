import { getReviewObject, setReviewObject } from "./common-local-storage.js";

let $modalNameInput;
let $modalPasswordInput;
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
	$modalNameInput = document.querySelector("#modal-name-input");
	$modalPasswordInput = document.querySelector("#modal-password-input");
	$modalReviewTextarea = document.querySelector("#modal-review-textarea");

	$modalNameInput.setAttribute('value', review.firstElementChild.firstElementChild.innerHTML);
	$modalPasswordInput.setAttribute('value', "");
	$modalReviewTextarea.innerHTML = review.lastElementChild.firstElementChild.innerHTML;
}

export { changeReview, openUpdateModal };