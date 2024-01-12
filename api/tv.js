import axios from 'axios'
import { apiKey } from '../constants';
import { apiCall } from './moviesdb';

// category endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndPoint =(pageNo=1)=> `${apiBaseUrl}/trending/movie/day?page=${pageNo}&api_key=${apiKey}&include_adult=true`;
const airingTodayTVEndPoint =(pageNo=1)=> `${apiBaseUrl}/tv/airing_today?page=${pageNo}&api_key=${apiKey}&include_adult=true`;
const onTheAirTVEndPoint =(pageNo=1)=> `${apiBaseUrl}/tv/on_the_air?page=${pageNo}&api_key=${apiKey}&include_adult=true`;
const topRatedTVEndPoint =(pageNo=1)=> `${apiBaseUrl}/tv/top_rated?page=${pageNo}&api_key=${apiKey}&include_adult=true`;
const popularTVEndPoint =(pageNo=1)=> `${apiBaseUrl}/tv/popular?page=${pageNo}&api_key=${apiKey}&include_adult=true`;

// fetch genres
const genresTVEndPoint = `${apiBaseUrl}/genre/tv/list?api_key=${apiKey}&include_adult=true`;
const dynamicGenreTVEndPoint = id => `${apiBaseUrl}/discover/tv?with_genres=${id}&page=1&sort_by=popularity.desc&api_key=${apiKey}&include_adult=true`;
const genreTVPageNoEndPoint = (id, pageNo=1) => `${apiBaseUrl}/discover/tv?with_genres=${id}&page=${pageNo}&sort_by=popularity.desc&api_key=${apiKey}&include_adult=true`;

// fetch TV series details
const tvDetailsEndPoint = id => `${apiBaseUrl}/tv/${id}?api_key=${apiKey}`;
const tvCreditsEndpoint = id=> `${apiBaseUrl}/tv/${id}/credits?api_key=${apiKey}`;
const similarTVEndpoint = id=> `${apiBaseUrl}/tv/${id}/similar?api_key=${apiKey}`;

// person details endpoint
const personTVEndpoint =id=>`${apiBaseUrl}/person/${id}/tv_credits?api_key=${apiKey}`


export const fetchAiringTodayTV = (pageNo)=>{
    return apiCall(airingTodayTVEndPoint(pageNo));
}
export const fetchOnTheAirTV = (pageNo)=>{
    return apiCall(onTheAirTVEndPoint(pageNo));
}
export const fetchTopRatedTV = (pageNo)=>{
    return apiCall(topRatedTVEndPoint(pageNo));
}
export const fetchPopularTV = (pageNo)=>{
    return apiCall(popularTVEndPoint(pageNo));
}

export const fetchGenresTv = ()=>{
    return apiCall(genresTVEndPoint);
}
export const fetchDynamicGenresTV = (id) =>{
    return apiCall(dynamicGenreTVEndPoint(id));
}
export const fetchGenreTVPageNo = (id, pageNo) =>{
    return apiCall(genreTVPageNoEndPoint(id, pageNo));
}

export const fetchTVDetails = (id) => {
    return apiCall(tvDetailsEndPoint(id));
}
export const fetchTVCredits = (id) => {
    return apiCall(tvCreditsEndpoint(id));
}
export const fetchSimilarTV = (id) => {
    return apiCall(similarTVEndpoint(id));
}

export const fetchPersonTV = (id) => {
    return apiCall(personTVEndpoint(id));
}


