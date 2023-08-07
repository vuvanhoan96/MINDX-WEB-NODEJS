import express from 'express';
import logApi from '../middleware/logApi.js'

const commentRouter=express.Router();

commentRouter.get("/", logApi, (req, res)=>{
    res.send("Comment Api")
});

export default commentRouter;