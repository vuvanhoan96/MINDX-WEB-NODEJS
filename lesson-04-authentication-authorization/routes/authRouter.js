import express from 'express';
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

const userMockData = [
    {
        id: '1',
        username: 'Hoan',
        password: 'hoan9603',
        fullname: 'Vu Van Hoan'
    },
    {
        id: '2',
        username: 'alice',
        password: 'alice123',
        fullname: 'alice lyly'
    },
    {
        id: '3',
        username: 'bobs',
        password: 'bobs123',
        fullname: 'Henry Bobs'
    }
]
authRouter.post("/login", (req, res) => {

    const { username, password } = req.body;

    //  1, Validation
    if (!username || !password) {
        return res.status(400).json({
            message: 'Missing required keys.'
        });
    }

    //  2. Check authentication
    const existingUser = userMockData.find((user) => user.username === username && user.password === password);

    if (!existingUser) {
        return res.json({
            message: 'Invalid usename or password!'
        })
    }

    //  3. Generate access token ( JWT )
    //    - Header: Thuật toán mã hóa + loại token
    //    - Body(payload): Chứa thông tin mà developer muốn đính kèm.
    //    - Footer: Chứa thông tin về chữ kí (Khóa bí mật --> SECRET_KEY)
    //    Mỗi thành phần cách nhau bởi dấu " . "

    const jwtPayload = {
        username: existingUser.username,
        id: existingUser.id,
        fullname: existingUser.fullname
    };

    const SECRET_KEY = process.env.SECRET_KEY;

    const token = jwt.sign(jwtPayload, SECRET_KEY, {
        expiresIn: "30s"
    })

    res.json({
        user: jwtPayload,
        accessToken: token
    });
})

export default authRouter;