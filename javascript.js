const $cardsDiv = document.querySelector("#cards");
const $searchBox = document.getElementById("searchBox");
const $searchButton = document.getElementById("searchButton");
const $modalInneer = document.querySelector("#modalInneer");

let docs = new Array();

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzE0MzAzYWIzYzViMDk1Y2RhODZkM2FjNDE3NjQ4MSIsInN1YiI6IjY2Mjc2MGUzZTg5NGE2MDE3ZDNkNDU1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kGzDSaGDQaTJEELIaLkxZDQAZkX-W4RusSOXOhYi6YQ'
	}
};

async function getDocs()
{
	await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
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
			//console.log(response['results']);
		})
		.catch(err => console.error(err));

	makeCards("");
}

function makeCards(searchText)
{
	$cardsDiv.innerHTML = "";
	searchText = searchText.toLowerCase();

	docs.forEach((doc) =>
	{
		let temp_html = `
			<div class="col">
				<div id="${doc.movieId}" class="card h-100 main-card" data-bs-toggle="modal" data-bs-target="#infoModal">
					<img src="${doc.backdropImage}" class="card-img-top" alt="...">
					<div class="card-body">
						<h3 class="card-title">${doc.title}</h3>
						<p class="card-text">${doc.overview}</p>
					</div>
						<div class="card-footer">
						<small class="text-body-secondary">Rating : ${doc.voteAverage}</small>
					</div>
				</div>
			</div>
			`;

		if (doc['title'].toLowerCase().indexOf(searchText) !== -1 || searchText === "")
		{
			$cardsDiv.insertAdjacentHTML("beforeend", temp_html);

			const $card = document.getElementById(doc.movieId);
			$card.addEventListener('click', (event) =>
			{
				event.preventDefault();
				clickedCard($card.id);
			})
		}
	});



	//console.log(searchText);
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
				<h1>${docs[idx]['originalTitle']}</h1>
				<br>
				<p>Release_date : ${docs[idx]['releaseDate']}</p>
				<p>Movie ID : ${docs[idx]['movieId']}</p>
				<p>Vote average : ${docs[idx]['voteAverage']}</p>
				<p>Vote count : ${docs[idx]['voteCount']}</p>
				<p>Overview : <br>&emsp;${docs[idx]['overview']}</p>
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

getDocs();