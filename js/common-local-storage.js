function makeReviewObjectInLocalStorage(movieId) {	
	let tempObject;
	
	if (localStorage.review === undefined) 
		tempObject = { review: {} };
	else
		tempObject = JSON.parse(localStorage.review);
	
	tempObject.review[movieId] = [];

	localStorage.review = JSON.stringify(tempObject);
}

export { makeReviewObjectInLocalStorage };