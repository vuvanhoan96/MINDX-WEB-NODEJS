import express from 'express';
import logApi from '../middleware/logApi.js';
import postsRouter from './postsRouter.js';
import userRouter from "./usersRouter.js";
import commentRouter from './commentRouter.js';
import authRouter from "./authRouter.js";
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(logApi); // middleware global.

router.use("/auth", authRouter)
router.use("/posts", authMiddleware, postsRouter);
router.use("/users", userRouter);
router.use("/comments", commentRouter);

export default router;