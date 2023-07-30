import { Router } from "express";
import routerPosts from "../router/posts.js";

const router = Router();

router.use("/posts", routerPosts)

export default router;