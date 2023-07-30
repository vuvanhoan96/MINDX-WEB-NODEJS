import { Router } from "express";
import { posts } from '../utils/mockData.js';
import { v4 } from "uuid";

const routerPosts = Router();

// Get all post
routerPosts.get("/", (req, res) => {

    res.json({
        data: posts
    })
});

// Get post by id
routerPosts.get("/:id", (req, res) => {

    // Get id from client
    const postId = +req.params.id;

    // Find post by id in database
    const findPost = posts.find((post) => post.id === postId);

    // Validate
    if (!findPost) {
        return res.json({
            message: "Resource is not exist",
        })
    }

    // response to client
    return res.json({
        data: findPost
    })
});

// Create new post
routerPosts.post("/", (req, res) => {

    const body = req.body;

    const newPost = {
        id: v4(),
        ...body
    }

    posts.push(newPost);

    res.json({
        message: "Create a new post!"
    })
})

export default routerPosts;