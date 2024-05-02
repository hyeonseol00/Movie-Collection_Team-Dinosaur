import { makeReviewObjectInLocalStorage } from "./common-local-storage.js";

let docs = new Array();

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzE0MzAzYWIzYzViMDk1Y2RhODZkM2FjNDE3NjQ4MSIsInN1YiI6IjY2Mjc2MGUzZTg5NGE2MDE3ZDNkNDU1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kGzDSaGDQaTJEELIaLkxZDQAZkX-W4RusSOXOhYi6YQ'
	}
};

async function getDocs(start, end) {
	try {
		for (let i = start; i <= end; i++) {
			const fetchDocs = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${i}`, options);
			const response = await fetchDocs.json();

			response['results'].forEach((doc) => {
				console.log(doc); //MD 확인중
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
				makeReviewObjectInLocalStorage(doc['id']);
			});
		}
	}
	catch (err) { console.error(err) };
}

export { docs, getDocs };