function makeReviewObjectInLocalStorage(movieId) {
	let tempObject;

	if (localStorage.review === undefined)
		tempObject = {};
	else {
		tempObject = JSON.parse(localStorage.review);
		tempObject[movieId] = [];
	}

	localStorage.review = JSON.stringify(tempObject);
}

function getReviewObject() {
	return JSON.parse(localStorage.review);
}

function setReviewObject(obj) {
	localStorage.review = JSON.stringify(obj);
}

export { makeReviewObjectInLocalStorage, getReviewObject, setReviewObject };