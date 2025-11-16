import express from 'express';
import { router as moviesRouter } from './routes/movies.js';

const PORT = 8080;

const app = express();
app.use(express.json());

const router = express.Router();
router.use("/movies", moviesRouter);

app.use("/api/v1", router);

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
