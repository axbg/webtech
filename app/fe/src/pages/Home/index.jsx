import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setMovies } from '../../actions/movies';
import "./style.css";

const SERVER_URL = "http://localhost:8080/api/v1";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${SERVER_URL}/movies`)
      .then((res) => res.json())
      .then((data) => dispatch(setMovies(data.records)));
  }, []);

  return (
    <div className="home">
      <h1>Explore movies</h1>
      <button className="custom-button" onClick={() => navigate("/movies")}>
        Start now
      </button>
      <br />
      <h1>Explore the latest series</h1>
      <button className="custom-button" onClick={() => navigate("/series")}>
        Start now
      </button>
    </div>
  );
};

export { Home };
