export const checkApiKey = (req, res, next) => {
    const apiKey = req.headers.apikey;

    if (!apiKey) {
        res.send({
            data: [],
            message: 'Missing Api Key!'
        });
        return
    }
    next();
}