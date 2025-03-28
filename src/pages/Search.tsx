import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { searchMoviesAsync } from "../redux/MovieSlice";
import MovieCard from "../component/Moviecard";
import { useLocation } from "react-router-dom";
import { Container, Typography, Grid } from "@mui/material";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search: React.FC = () => {
  const query = useQuery();
  const searchQuery = query.get("query");
  const dispatch = useDispatch<AppDispatch>();
  const { searchresults, loading } = useSelector((state: RootState) => state.movie);

  useEffect(() => {
    console.log("Search Query:", searchQuery);
    if (searchQuery) {
      dispatch(searchMoviesAsync(searchQuery));
    }
  }, [searchQuery, dispatch]);

  useEffect(() => {
    console.log("Search Results:", searchresults);
  }, [searchresults]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Results for "{searchQuery}"
      </Typography>
      <Grid container spacing={3}>
        {searchresults.length > 0 ? (
          searchresults.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No results found.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Search;