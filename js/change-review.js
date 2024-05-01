import { getReviewObject, setReviewObject } from "./common-local-storage.js";

function changeReview(movieId, idx, name, password, text) {
	let tempObject = getReviewObject();

	if (password == tempObject[movieId][idx].password) {
		tempObject[movieId][idx].name = name;
		tempObject[movieId][idx].text = text;
	}

	setReviewObject(tempObject);
}

export { changeReview };