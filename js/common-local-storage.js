function makeReviewObjectInLocalStorage(movieId) {
    let tempObject = {};
	// localStorage에 "review"가 없는 경우 빈객체와 함께 넣어줌 이과정이 생략됨
    if (localStorage.review === undefined) {
        localStorage.review = JSON.stringify(tempObject);
    }
	tempObject = JSON.parse(localStorage.review);
    if (tempObject[movieId] === undefined) {
        tempObject[movieId] = [];
    }

    localStorage.review = JSON.stringify(tempObject); // localStorage에 업데이트된 객체 저장
}

function getReviewObject() {
	return JSON.parse(localStorage.review);
}

function setReviewObject(obj) {
	localStorage.review = JSON.stringify(obj);
}

export { makeReviewObjectInLocalStorage, getReviewObject, setReviewObject };