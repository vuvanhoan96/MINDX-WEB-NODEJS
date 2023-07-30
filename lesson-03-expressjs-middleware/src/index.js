import express from 'express';
import router from '../router/app.js';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/", (req, res) => {

    res.end(`<h1>hi everyone</h1>`);
})

app.use("/api/v1", router)

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})