import express from "express"
import router from "./routes/index.js";

const PORT = 8000;
const app = express();

app.use(express.json()); // middlewares



app.use("/api", router);

app.listen(PORT, () => {
    console.log("Server is running at PORT: 8000");
})