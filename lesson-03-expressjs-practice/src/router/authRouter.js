import { Router } from "express";
import {users} from '../../data/users.js'

const authRouter = Router();

authRouter.get("/", (req, res) => {

    res.json({
        data: users
    })
})

export default authRouter;