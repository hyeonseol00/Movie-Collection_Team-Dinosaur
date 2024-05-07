import { getReviewObject, setReviewObject } from "./common-local-storage.js";
import { temping } from "./input-review.js";

let $deleteModal;
let $deleteModalPasswordInput;
let $movieId;

function deleteReview() {
    let tempObject = getReviewObject();

    let movieId = $movieId.dataset.movieId;
    let idx = Number($deleteModal.dataset.reviewIndex);

    let target = tempObject[movieId][idx];

    if (target.password !== $deleteModalPasswordInput.value) return alert("비밀번호가 일치하지 않습니다");

    tempObject[movieId] = tempObject[movieId].filter((v,i) => i !== idx);  

    setReviewObject(tempObject);
    alert("삭제가 완료되었습니다.")
    $deleteModalPasswordInput.value = ""; 
    // 닫는 기능 추가
    temping(movieId, "review-card-box");
}

function openDeleteModal(review) {
    $deleteModal = document.querySelector("#delete-modal");
    $deleteModalPasswordInput = document.querySelector("#modal-delete-password-input");
    $movieId = document.querySelector("#movie-id");

    $deleteModal.dataset.reviewIndex = review.dataset.idx;
    $deleteModalPasswordInput.value = "";
}

export { deleteReview, openDeleteModal };
