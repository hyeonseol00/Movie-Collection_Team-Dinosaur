import { openUpdateModal } from "./change-review.js";
import { openDeleteModal } from "./delete-review.js"
import { getReviewObject, setReviewObject } from "./common-local-storage.js";

// 해당 html id를 통해 value 값을 가져옴
function inputReview(inputId) { //idInput
	const $inputId = document.getElementById(inputId);
	const madevalue = $inputId.value;//input 내용
	if (madevalue.trim() !== "") {
		return madevalue;
	} else {
		return "empty8792";
	};
}

// 입력내용=>객체 생성 로직
function madeObject(secondinputId) {
	let catchError = 0
	const firstinputId = ["id", "pw", "text"]; //firstId 값\ reset 가능 but, 하위 변수도 동일 개수로 수정
	const objectKey = ["name", "password", "text"]; //key 값\ reset 가능 but, 상위 변수도 동일 개수로 수정
	let pullinputId = []; //idInput, ...
	let answerObject = {};//name: "input", ...
	firstinputId.forEach((first) => {
		pullinputId.push(first + secondinputId); //결과 : idInput
	});
	for (let i = 0; i < firstinputId.length; i++) {
		let pull = pullinputId[i];
		answerObject[objectKey[i]] = inputReview(pull);
	};
	for (let j = 0; j < firstinputId.length; j++) {
		let catchValue = answerObject[objectKey[j]]
		if (catchValue === "empty8792") {
			alert(`${objectKey[j]} 입력해주세요.`)
			catchError = 8792
			break
		}
	};
	if (catchError === 8792) {
		return 8792
	} else {
		for (let i = 0; i < pullinputId.length; i++) {             //input 초기화 새로 기입
			document.getElementById(pullinputId[i]).value = '';    //input 초기화 새로 기입
		};
		return answerObject //name: "input", ...
	};
}

// localstorage로 객체내용 update 하는 로직
function storageUpdate(movieId, secondId) {
	let tempObject = getReviewObject();
	let userObject = madeObject(secondId);
	if (userObject === 8792) {
		setReviewObject(tempObject)
	} else {
		tempObject[movieId].push(userObject); // 234: [{name: "input", ...}]
		setReviewObject(tempObject);
		alert("리뷰가 등록되었습니다.") //리뷰등록안내 새로 기입
		temping(movieId, "review-card-box");
		reviewScroll(movieId, userObject); // MD 수정중
	};
}

// <등록 버튼>
// brtId: html button Id, movieId: 영화Id
//seconId 정의 : html input태그의 변형되는 firstId 는 생략하고 그 나머지 반복되는 Id
// Ex: updateBtr(movieId, "updatebtr", "input") 이렇게 설정 가능
function uploadBtr(movieId, brtId, secondId) {
	const $getbrt = document.getElementById(brtId);
	$getbrt.addEventListener("click", (event) => {
		storageUpdate(movieId, secondId);
	});// 탬핑 삭제 후 storageUpdate함수로 이동
}


// 리뷰탬핑로직
function temping(movieId, tagId) {
	const $getTagId = document.getElementById(tagId);
	let openObject = getReviewObject();
	if (!openObject[movieId] || openObject[movieId].length === 0) {
		$getTagId.innerHTML = ``;
		return;
	};
	$getTagId.innerHTML = ``;
	let i = 0;
	openObject[movieId].forEach((getObject) => {  /* 데이터스크롤 idx 추가 => data-scroll="${i}" */
		let temp_rivew = `
        <div class="card border-secondary mb-3" data-scroll="${i}" data-idx="${i}" data-password="${getObject["password"]}">
            <div class="card-header">
                <h5>${getObject["name"]}</h5>
            </div>
            <div class="card-body text-secondary">
                <p class="card-text">${getObject["text"]}</p>
				<div class="d-flex gap-2 justify-content-end">
					<button type="button" data-idx="${i}" data-pw"${getObject["password"]}" class="update-button btn btn-secondary" data-bs-toggle="modal" data-bs-target="#update-modal">수정</button>
					<button type="button" data-idx="${i}" data-pw"${getObject["password"]}" class="delete-button btn btn-dark" data-bs-toggle="modal" data-bs-target="#delete-modal">삭제</button>
				</div>
            </div>
        </div>
        `;
		$getTagId.insertAdjacentHTML('beforeend', temp_rivew);
		addUpdateDeleteEvent(i);
		i++;
	});
}

function addUpdateDeleteEvent(idx) {
	let $updateButton = document.getElementsByClassName("update-button");
	let $deleteButton = document.getElementsByClassName("delete-button");

	$updateButton[idx].addEventListener("click", (event) => {
        event.preventDefault();
        openUpdateModal(event.target.parentElement.parentElement.parentElement);
    });

	$deleteButton[idx].addEventListener("click", (event) => {
        event.preventDefault();
        openDeleteModal(event.target.parentElement.parentElement.parentElement);
    });
}
// MD 스크롤 기능 추가 작업중
// userWrite: 리뷰작성을 모아 만든 객체 ex: {name: HMD, ...}
function reviewScroll(movieId, userWrite) {
	const getlocal = getReviewObject();
	let where = getlocal[movieId];
	let findarray = [];
	let userstring = [];
	userstring.push((JSON.stringify(userWrite)));
	where.forEach((inarray) => {
		findarray.push(JSON.stringify(inarray));
	});
	if (findarray.find(findit => findit === userstring[0])) {
		let getIdx = userstring.map((string) => (findarray.indexOf(string)));
		let $scrollId = document.querySelector(`[data-scroll="${getIdx}"]`);
		$scrollId.scrollIntoView({
		behavior: "smooth",
		block: "start",
		inline: "nearest",
		});
	};
}

export { uploadBtr, temping };