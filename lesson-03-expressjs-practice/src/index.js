/** @format */

import express from 'express';
import cors from 'cors';
import authRouter from './router/authRouter.js';
import postRouter from './router/postRouter.js';
import { checkApiKey } from './middleware/post.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(checkApiKey);

app.use('/auth', authRouter);
app.use('/api/v1/posts', postRouter);

app.listen(PORT, (err) => {
	if (!err) {
		console.log(`Server is running on PORT: ${PORT}`);
	}
});
