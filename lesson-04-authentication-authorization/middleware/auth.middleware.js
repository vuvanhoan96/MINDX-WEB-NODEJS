import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {

    const token = req.headers["x-access-token"];
    const SECRET_KEY = process.env.SECRET_KEY;

    if (!token) {
        return res.json({
            message: 'Missing access token'
        })
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        next();
    } 
    catch (error) {
        console.log(error);
        return res.json({ error })
    }

}

export default authMiddleware;