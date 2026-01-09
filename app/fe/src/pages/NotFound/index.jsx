import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./style.css";

const NotFound = () => {
  const movies = useSelector((state) => state.movies.data);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Page not found.</h1>
      <div>
        {`However, you can explore ${movies.length} movies`}{" "}
        <span className="pointer" onClick={() => navigate("/movies")}>here</span>
      </div>
    </div>
  );
};

export { NotFound };
