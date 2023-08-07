import 'dotenv/config';
import express from 'express';
import router from './routes/index.js';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use("/api/v1", router);

app.listen(PORT, ()=>{
    console.log(`Server is comming on ${PORT}`);
})