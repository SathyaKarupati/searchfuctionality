import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from"../utils/api";


interface Movie{
    id:number,
    title:string,
    poster_path:string
}
interface MovieState{
   
    trendingMovies:Movie [],
     popularMovies:Movie [],
     searchresults:Movie[],
    loading:boolean,
    error:string|null
}
const initialState:MovieState={
  
    trendingMovies:[],
    popularMovies:[],
    searchresults:[],
    loading:false,
    error:null
};
export const fetchTrendingMovies = createAsyncThunk(
    'movie/fetchTrendingMovies',
    async () => {
        const res = await api.get('/trending/movie/day');
        return res.data;

    }
);

export const fetchPopularMovies = createAsyncThunk(
    'movie/fetchPopularMovies',
    async () => {
        const response = await api.get('/movie/popular');
        return response.data;

    }
);
export const searchMoviesAsync = createAsyncThunk(
    'movies/searchMovies',
    async (query: string) => {
      const response = await api.get(`/search/movie?query=${query}`);//[pause]API call for searching movies
      return response.data.results;//[pause]Returns search results
    }
  );


// Removed duplicate declaration of initialState

const MovieSlice = createSlice({
    name: 'movie',
    initialState: initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
           
            .addCase(fetchTrendingMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.trendingMovies = action.payload.results;
                state.error = null;
            })
            .addCase(fetchTrendingMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching trending movies";
            })

            .addCase(fetchPopularMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPopularMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.popularMovies = action.payload.results;
                state.error = null;
            })
            .addCase(fetchPopularMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching popular movies";
            })
            .addCase(searchMoviesAsync.fulfilled, (state, action:PayloadAction<Movie[]>) => {
                state.searchresults = action.payload;
            })
            .addCase(searchMoviesAsync.rejected, (state, action) => {
                state.error = action.error.message || "Error fetching search results";
            })
            .addCase(searchMoviesAsync.pending, (state) => {
                state.loading = true;
            })
    },
});


export default MovieSlice.reducer