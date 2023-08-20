/** @format */

import { Router } from 'express';
import { posts } from '../../data/posts.js';
import { checkApiKey } from '../middleware/post.js'

const postRouter = Router();

postRouter.use(checkApiKey); // middleware global

postRouter.get('/', (req, res) => {
	res.json(posts);
});

postRouter.get('/post-detail', (req, res) => {
	const id = req.query.id;

	const post = posts.find((el) => el.id === parseInt(id));

	if (!id || !post) {
		res.json({
			message: 'Post not found by id',
		});
	}

	res.json(post);
});

postRouter.post('/', (req, res) => {
	//lấy body
	const data = req.body;

	if (!data) {
		res.json({
			message: 'Not data',
		});
	}
	posts.push(data);

	res.json({
		message: 'Add new post successfully!',
		data,
	});
});

postRouter.put('/', (req, res) => {
	const postId = req.query.id;

	if (!postId) {
		res.json({
			message: 'Missing post!',
		});
	}
	const data = req.body;

	if (!data) {
		res.json({
			message: 'Data is not exist!',
		});
	}

	const postIndexBeforeEdit = posts.findIndex(
		(p) => p.id.toString() === postId.toString()
	);

	if (postIndexBeforeEdit < 0) {
		res.json({
			message: 'Missing post!',
		});
	}

	posts[postIndexBeforeEdit] = data;
	res.json({
		message: 'Edit post successfully!',
		post: posts[postIndexBeforeEdit],
	});
});

export default postRouter;
