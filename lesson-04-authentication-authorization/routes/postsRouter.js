import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { posts } from '../utils/mockData.js';

const postsRouter = express.Router();

postsRouter.get("/", (req, res) => {

    res.json({
        data: posts
    })
});

postsRouter.get("/:id", (req, res) => {
    const currentDate = new Date();
    const postId = req.params.id;

    const existingPost = posts.find((post) => post.id === postId);

    if (!existingPost) {
        return res.json({
            message: 'Resource is not exist.'
        });
    }
    return res.json({
        data: existingPost,
    });
});

postsRouter.post("/", (req, res) => {
    const bodyPost = req.body;

    const newPost = {
        ...bodyPost,
        id: uuidv4()
    }

    posts.push(newPost);

    res.json({
        message: 'Create new post successfully!',
        data: posts,
    })
});

postsRouter.put("/:id", (req, res) => {

    const postId = req.params.id;
    const bodyPost = req.body;

    const existingPostIndex = posts.findIndex((post) => post.id.toString() === postId);

    if (existingPostIndex < 0) {
        return res.json({
            message: 'Resource is not exist!'
        });
    }
    // console.log(posts[existingPostIndex]);
    // console.log(bodyPost);
    const updatedPost = {
        ...posts[existingPostIndex],
        ...bodyPost,
    };
    // console.log(updatedPost);
    posts[existingPostIndex] = updatedPost;

    return res.json({
        message: "Update successfully",
    });
});

postsRouter.delete("/:id", (req, res) => {
    const postId = req.params.id;
    const existingPostIndex = posts.findIndex((p) => p.id === postId);

    if (existingPostIndex < 0) {
        return res.json({
            message: "Resource is not exist"
        })
    }

    posts.splice(existingPostIndex, 1);
    return res.json({
        message: 'Delete successfully!'
    });
});

export default postsRouter;