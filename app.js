import dotenv from "dotenv";
import express, { urlencoded, json } from "express";

import hotels from "./routes/hotels.js";

dotenv.config();

const app = express();

const BASE_URL = "api";

const PORT = process.env.PORT;

app.use(urlencoded({ extended: false }));
app.use(json());

app.use(`/${BASE_URL}/hotels`, hotels);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});