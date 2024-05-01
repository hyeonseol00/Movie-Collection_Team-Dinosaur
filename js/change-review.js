localStorage.review = JSON.stringify({
	278: [{
		name: "재석", password: "1234", text: "리뷰 내용"
	}, {
		name: "민도", password: "1543", text: "리뷰 내용"
	}],
	372: [{
		name: "재석", password: "1234", text: "리뷰 내용"
	}, {
		name: "민도", password: "1543", text: "리뷰 내용"
	}]
});
let tempObject = JSON.parse( localStorage.review );

// tempObject를 사용해서 데이터베이스 수정 후 다시 localStorage에 적용시킬 때
localStorage.review = JSON.stringify(tempObject);