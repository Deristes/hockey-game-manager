import express from "express";
import startRoutes from "./routes/routes";
import {PORT} from "./lib/constants";

const app = express();

startRoutes(app);

app.listen(PORT, () => {
    console.log(`ISHD cache is running on port: ${PORT}.`);
});