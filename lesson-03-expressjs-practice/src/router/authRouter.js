import { Router } from "express";
import { users } from '../../data/users.js'
import { usersTwo } from '../../data/users02.js';
import jwt from "jsonwebtoken";
import 'dotenv/config'

const authRouter = Router();

authRouter.post("/login", (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(404).json({
            message: 'Missing required key!'
        });
    }
    const existingUser = usersTwo.find((user) => user.username === username && user.password === password);
    if (!existingUser) {
        return res.json({
            message: 'Invalid username or password'
        })
    }
    const jwtPayload = {
        username: existingUser.username
    }
    const SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign(jwtPayload, SECRET_KEY
        // { expiresIn: "45s" }
    )
    res.json({
        user: jwtPayload,
        accessToken: token
    });
});

authRouter.post("/register ", (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(404).json({
            message: 'Missing required key!'
        });
    }
    const data = {
        username,
        password,
        roles: "member",
        email: "vuhoan9603",
        createdAt: Date.now(),
        lastLoginAt: Date.now(),
    };

    usersTwo.push(data);

    const jwtPayload = {
        username,
        email: "vuhoan9603"
    }
    const SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign(jwtPayload, SECRET_KEY
        // { expiresIn: "45s" }
    )
    res.status(200).json({
        token
    });
});

authRouter.get("/users-detail", (req, res) => {

    const userId = req.query.id;

    if (!userId) {
        return res.json({
            message: 'Missing userId.'
        });
    } else {
        const user = users.find((user) => user.id.toString() === userId);

        if (!user) {
            return res.send("User not found!");
        }
        else {
            res.json(user);
        }
    }
    res.send('Found user!')
})

export default authRouter;