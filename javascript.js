HTMLCollection.prototype.forEach = Array.prototype.forEach;

const $cardsDiv = document.querySelector("#cards");
const $searchBox = document.getElementById("searchBox");
const $searchButton = document.getElementById("searchButton");
const $modalInneer = document.querySelector("#modalInneer");
const $pageLinkButton = document.getElementsByClassName("page-link");

let docs = new Array();
let pageNumber = 1;

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzE0MzAzYWIzYzViMDk1Y2RhODZkM2FjNDE3NjQ4MSIsInN1YiI6IjY2Mjc2MGUzZTg5NGE2MDE3ZDNkNDU1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kGzDSaGDQaTJEELIaLkxZDQAZkX-W4RusSOXOhYi6YQ'
	}
};

async function getDocs()
{
	for (let i = 1; i <= 5; i++)
		await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${i}`, options)
			.then(response => response.json())
			.then(response =>
			{
				response['results'].forEach((doc) =>
				{
					docs.push({
						backdropImage: "https://image.tmdb.org/t/p/w400" + doc['backdrop_path'],
						posterImage: "https://image.tmdb.org/t/p/w400" + doc['poster_path'],
						originalTitle: doc['original_title'],
						title: doc['title'],
						releaseDate: doc['release_date'],
						movieId: doc['id'],
						voteAverage: doc['vote_average'],
						voteCount: doc['vote_count'],
						overview: doc['overview'],
					});
				});
			})
			.catch(err => console.error(err));

	makeCards("");
}

function makeCards(searchText)
{
	$cardsDiv.innerHTML = "";
	searchText = searchText.toLowerCase();

	let cardCount = 0;

	for (let i = searchText == "" ? (pageNumber - 1) * 20 : 0; i < docs.length; i++)
	{
		if (docs[i]['title'].toLowerCase().indexOf(searchText) !== -1 || searchText === "")
		{
			let tempOverview = docs[i].overview.slice(0, 180);

			if (tempOverview.length >= 179)
				tempOverview += "...";

			let temp_html = `
				<div class="col">
					<div id="${docs[i].movieId}" class="card h-100 main-card" data-bs-toggle="modal" data-bs-target="#infoModal">
						<img src="${docs[i].backdropImage}" class="card-img-top" alt="...">
						<div class="card-body">
							<h3 class="card-title">${docs[i].title}</h3>
							<p class="card-text">${tempOverview}</p>
						</div>
						<div class="card-footer">
							<small class="text-body-secondary">평점 : ${docs[i].voteAverage}</small>
						</div>
					</div>
				</div>
				`;

			$cardsDiv.insertAdjacentHTML("beforeend", temp_html);

			const $card = document.getElementById(docs[i].movieId);
			$card.addEventListener('click', (event) =>
			{
				event.preventDefault();
				clickedCard($card.id);
			})

			cardCount++;
		}

		if (cardCount >= 20)
			break;
	}
}

function clickedCard(movieId)
{
	$modalInneer.innerHTML = "";

	let idx = docs.findIndex((doc) => { return doc['movieId'] == movieId; });

	let temp_html = `
		<div class="row row-cols-1 row-cols-xl-2">
			<div class="col p-4 text-center poster-box">
				<img src="${docs[idx]['posterImage']}" alt="">
			</div>
			<div class="col p-4">
				<h1>${docs[idx]['title']}</h1>
				<h5>${docs[idx]['originalTitle']}</h5>
				<br>
				<p>개봉 일자 : ${docs[idx]['releaseDate']}</p>
				<p>영화 ID : ${docs[idx]['movieId']}</p>
				<p>평균 평점 : ${docs[idx]['voteAverage']}</p>
				<p>평점 수 : ${docs[idx]['voteCount']}</p>
				<p>줄거리 : <br>&emsp;${docs[idx]['overview']}</p>
			</div>
		</div>
		`;

	$modalInneer.insertAdjacentHTML("beforeend", temp_html);
}

function inputEvent() { makeCards($searchBox.value); }

$searchBox.addEventListener('keyup', (event) =>
{
	event.preventDefault();
	inputEvent();
})

$searchButton.addEventListener('click', (event) =>
{
	event.preventDefault();
	inputEvent();
})

$pageLinkButton.forEach((button) =>
{
	button.addEventListener('click', (event) =>
	{
		event.preventDefault();

		if (button.innerHTML != "이전" && button.innerHTML != "다음")
			pageNumber = button.innerHTML;

		$pageLinkButton.forEach((btn) =>
		{
			btn.className = 'page-link';
			if (btn.innerHTML == pageNumber)
				btn.className += ' active';
		});

		makeCards("");
	});
});

getDocs();