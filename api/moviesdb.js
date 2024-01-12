import axios from 'axios'
import { apiKey } from '../constants';

// category endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndPoint =(pageNo=1)=> `${apiBaseUrl}/trending/movie/day?page=${pageNo}&api_key=${apiKey}&include_adult=true`;
const nowPlayingMoviesEndPoint =(pageNo=1)=> `${apiBaseUrl}/movie/now_playing?page=${pageNo}&api_key=${apiKey}&include_adult=true`;
const upcomingMoviesEndPoint =(pageNo=1)=> `${apiBaseUrl}/movie/upcoming?page=${pageNo}&api_key=${apiKey}&include_adult=true`;
const topRatedMoviesEndPoint =(pageNo=1)=> `${apiBaseUrl}/movie/top_rated?page=${pageNo}&api_key=${apiKey}&include_adult=true`;
const popularMoviesEndPoint =(pageNo=1)=> `${apiBaseUrl}/movie/popular?page=${pageNo}&api_key=${apiKey}&include_adult=true`;

// fetch genres
const genresMoviesEndPoint = `${apiBaseUrl}/genre/movie/list?api_key=${apiKey}&include_adult=true`;
const dynamicGenreEndPoint = id => `${apiBaseUrl}/discover/movie?with_genres=${id}&page=1&sort_by=popularity.desc&api_key=${apiKey}&include_adult=true`;
const genreMoviesEndPoint = (id, pageNo=1) => `${apiBaseUrl}/discover/movie?with_genres=${id}&page=${pageNo}&sort_by=popularity.desc&api_key=${apiKey}&include_adult=true`;

//dynamic endpoints
const movieDetailsEndPoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

// person details endpoint
const personDetailsEndpoint =id=>`${apiBaseUrl}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint =id=>`${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`

// search movies endpoint
const searchMoviesEndpoint =`${apiBaseUrl}/search/movie?api_key=${apiKey}`;

// Images endpoints
export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

// fallback images endpoints
export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

export const apiCall = async(endpoint, params)=>{
    const options = {
            method: 'GET',
            url: endpoint,
            params: params ? params : {},
        };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error:',error);
        return {};
    }
}

// fetching data 

export const fetchTrendingMovies = (pageNo)=>{
    return apiCall(trendingMoviesEndPoint(pageNo));
}
export const fetchNowPlayingMovies = (pageNo)=>{
    return apiCall(nowPlayingMoviesEndPoint(pageNo));
}
export const fetchUpcomingMovies = (pageNo)=>{
    return apiCall(upcomingMoviesEndPoint(pageNo));
}
export const fetchTopRatedMovies = (pageNo)=>{
    return apiCall(topRatedMoviesEndPoint(pageNo));
}
export const fetchPopularMovies = (pageNo)=>{
    return apiCall(popularMoviesEndPoint(pageNo));
}

export const fetchGenres = ()=>{
    return apiCall(genresMoviesEndPoint);
}
export const fetchDynamicGenres = (id) =>{
    return apiCall(dynamicGenreEndPoint(id));
}
export const fetchGenreMovies = (id, pageNo) =>{
    return apiCall(genreMoviesEndPoint(id, pageNo));
}

export const fetchMovieDetails = (id) => {
    return apiCall(movieDetailsEndPoint(id));
}
export const fetchMovieCredits = (id) => {
    return apiCall(movieCreditsEndpoint(id));
}
export const fetchSimilarMovies = (id) => {
    return apiCall(similarMoviesEndpoint(id));
}

export const fetchPersonDetails = (id) => {
    return apiCall(personDetailsEndpoint(id));
}
export const fetchPersonMovies = (id) => {
    return apiCall(personMoviesEndpoint(id));
}

export const searchMovies = (params) => {
    return apiCall(searchMoviesEndpoint, params);
}