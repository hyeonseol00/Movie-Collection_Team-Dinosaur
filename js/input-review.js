import { getReviewObject, setReviewObject } from "./common-local-storage.js";

// 해당 html id를 통해 value 값을 가져옴
function inputReview(inputId) { //idInput
    const $inputId = document.getElementById(inputId);
    const madevalue = $inputId.value;//input 내용
    if (madevalue === "") {
        return "defind8792"
    } else {
        return madevalue
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
		pullinputId.push(first+secondinputId); //결과 : idInput
	})
    for (let i = 0; i < firstinputId.length; i++) {
        let pull = pullinputId[i];
        answerObject[objectKey[i]] = inputReview(pull);
    }
    for (let j = 0; j < firstinputId.length; j++) {
        let catchValue = answerObject[objectKey[j]]
        if (catchValue === "defind8792") {
            alert(`${objectKey[j]} 입력해주세요.`)
            catchError = 8792
            break
        }
    }
    if (catchError === 8792) {
        return 8792
    } else {
        return answerObject //name: "input", ...
    }
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
    };
}

// <등록 버튼>
// brtId: html button Id, movieId: 영화Id
//seconId 정의 : html input태그의 변형되는 firstId 는 생략하고 그 나머지 반복되는 Id
// Ex: updateBtr(movieId, "updatebtr", "input") 이렇게 설정 가능
function updateBtr(movieId, brtId, secondId) {
    const $getbrt = document.getElementById(brtId);
    $getbrt.addEventListener("click", (event) => {
        storageUpdate(movieId, secondId);
    });
}

function temping(movieId,tagId) {
    const getTagId = document.getElementById(tagId)
    let openObject = getReviewObject()
    openObject[movieId].forEach((getObject) => {
        for (let getKey in getObject) {
            
        }
    })
}



export {  };

