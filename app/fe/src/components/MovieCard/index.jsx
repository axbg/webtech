import { useState } from "react";

import {
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  Typography,
  TextField,
} from "@mui/material";

const MovieCard = ({ movie, onUpdate, onDelete }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [movieDetails, setMovieDetails] = useState({ ...movie });

  const confirmDelete = (movie) => {
    if (window.confirm(`Do you want to delete ${movie.title}?`)) {
      onDelete(movie);
    }
  };

  const updateMovieDetail = (event) => {
    setMovieDetails({
      ...movieDetails,
      [event.target.name]: event.target.value,
    });
  };

  const cancelUpdate = () => {
    setMovieDetails({ ...movie });
    setIsEditable(false);
  };

  const updateMovie = (event) => {
    event.preventDefault();

    onUpdate(movieDetails);
    setIsEditable(false);
  };

  return (
    <Card variant="outlined" sx={{ marginTop: 2 }}>
      {isEditable ? (
        <CardContent>
          <form onSubmit={updateMovie}>
            <Box display="flex" gap={1} flexDirection="column">
              <TextField
                label="Title"
                value={movieDetails.title}
                error={!movieDetails.title}
                onChange={updateMovieDetail}
                type="text"
                id="title"
                name="title"
                required
              />
              <br />
              <TextField
                label="Year"
                value={movieDetails.year}
                error={!movieDetails.year}
                InputProps={{ inputProps: { min: 1930, max: 2100 } }}
                onChange={updateMovieDetail}
                type="number"
                id="year"
                name="year"
                required
              />
              <br />
              <TextField
                label="Director"
                value={movieDetails.director}
                error={!movieDetails.director}
                onChange={updateMovieDetail}
                type="text"
                id="director"
                name="director"
                required
              />
              <br />
              <TextField
                label="Genre"
                value={movieDetails.genre}
                error={!movieDetails.genre}
                onChange={updateMovieDetail}
                type="text"
                id="genre"
                name="genre"
                required
              />
              <br />
              <TextField
                multiline
                rows={4}
                label="Synopsis"
                value={movieDetails.synopsis}
                onChange={updateMovieDetail}
                id="synopsis"
                name="synopsis"
              />
              <br />
              <TextField
                label="Duration (minutes)"
                value={movieDetails.duration}
                onChange={updateMovieDetail}
                type="number"
                id="duration"
                name="duration"
              />
              <br />
              <TextField
                label="Poster URL"
                value={movieDetails.poster}
                onChange={updateMovieDetail}
                type="url"
                id="poster"
                name="poster"
              />
              <br />
            </Box>
            <Box display="flex" gap={1} mt={2} justifyContent="flex-end">
              <Button type="submit" variant="contained" color="warning">
                Save
              </Button>
              <Button variant="contained" color="error" onClick={cancelUpdate}>
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      ) : (
        <CardContent>
          <Grid container columns={12} wrap="nowrap">
            <Grid item size={4} textAlign="center">
              <img
                alt="movie-img"
                style={{ height: "auto", width: "80%" }}
                src={movie.poster}
              />
            </Grid>
            <Grid item size={8} padding="20px">
              <Box
                height="100%"
                display="flex"
                flexDirection="column"
                flexWrap="nowrap"
                gap={2}
              >
                <Box display="flex" flexWrap="wrap">
                  <Typography variant="h6">
                    {`${movie.title} (${movie.year})`}
                  </Typography>
                  <Box marginLeft="auto" display="flex" gap="5px">
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => setIsEditable(true)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => confirmDelete(movie)}
                    >
                      X
                    </Button>
                  </Box>
                </Box>
                <Typography fontStyle="italic">
                  {`${movie.genre} • ${movie.duration} minutes • ${movie.director}`}
                </Typography>
                <Box
                  flexGrow={1}
                  display="flex"
                  flexDirection="column"
                  borderRadius={5}
                  justifyContent="center"
                  backgroundColor="warning.main"
                  p={2}
                  color="white"
                >
                  {movie.synopsis}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      )}
    </Card>
  );
};

export { MovieCard };
