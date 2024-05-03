import { getReviewObject, setReviewObject } from "./common-local-storage.js";

let $updateModal;
let $modalNameInput;
let $modalPasswordInput;
let $modalReviewTextarea;
let $movieId;

function changeReview() {
	let tempObject = getReviewObject();

	let movieId = $movieId.dataset.movieId;
	let idx = $updateModal.dataset.reviewIndex;

	console.log(movieId, idx, tempObject[movieId][idx]);

	if ($modalPasswordInput.value == tempObject[movieId][idx].password) {
		tempObject[movieId][idx].name = $modalNameInput.value;
		tempObject[movieId][idx].text = $modalReviewTextarea.innerHTML;
		$updateModal.setAttribute("area-hidden", true);
	}
	else
		alert("비밀번호가 다릅니다!");

	setReviewObject(tempObject);
}

function openUpdateModal(review) {
	$updateModal = document.querySelector("#update-modal");
	$modalNameInput = document.querySelector("#modal-name-input");
	$modalPasswordInput = document.querySelector("#modal-password-input");
	$modalReviewTextarea = document.querySelector("#modal-review-textarea");
	$movieId = document.querySelector("#movie-id");

	$updateModal.dataset.reviewIndex = review.dataset.idx;
	$modalNameInput.setAttribute('value', review.firstElementChild.firstElementChild.innerHTML);
	console.log($modalPasswordInput.getAttribute('value'));
	$modalPasswordInput.setAttribute('value', null);
	$modalReviewTextarea.innerHTML = review.lastElementChild.firstElementChild.innerHTML;
}

export { changeReview, openUpdateModal };