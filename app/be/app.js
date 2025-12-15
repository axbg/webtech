import express from "express";
import { router } from "./routes/config.js";
import { synchronizeDatabase } from "./models/config.js";
import cors from "cors";

const PORT = 8080;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

const server = app.listen(PORT, async () => {
  try {
    await synchronizeDatabase();
  } catch (ex) {
    console.log("The connection to database did not work");
    server.close();
  }

  console.log(`Server started on http://localhost:${PORT}`);
});
