import { getReviewObject, setReviewObject } from "./common-local-storage.js";
import { temping } from "./input-review.js";

let $updateModal;
let $modalNameInput;
let $modalPasswordInput;
let $modalReviewTextarea;
let $movieId;

function changeReview() {
	let tempObject = getReviewObject();

	let movieId = $movieId.dataset.movieId;
	let idx = $updateModal.dataset.reviewIndex;

	if ($modalPasswordInput.value == tempObject[movieId][idx].password) {
		tempObject[movieId][idx]['name'] = $modalNameInput.value;
		tempObject[movieId][idx]['text'] = $modalReviewTextarea.innerHTML;
	}
	else
		alert("비밀번호가 다릅니다!");

	setReviewObject(tempObject);

	temping(movieId, "rivew-borderbox");
}

function openUpdateModal(review) {
	$updateModal = document.querySelector("#update-modal");
	$modalNameInput = document.querySelector("#modal-name-input");
	$modalPasswordInput = document.querySelector("#modal-password-input");
	$modalReviewTextarea = document.querySelector("#modal-review-textarea");
	$movieId = document.querySelector("#movie-id");

	$updateModal.dataset.reviewIndex = review.dataset.idx;
	$modalNameInput.setAttribute('value', review.firstElementChild.firstElementChild.innerHTML);
	$modalPasswordInput.removeAttribute('value');
	$modalReviewTextarea.innerHTML = review.lastElementChild.firstElementChild.innerHTML;
}

export { changeReview, openUpdateModal };