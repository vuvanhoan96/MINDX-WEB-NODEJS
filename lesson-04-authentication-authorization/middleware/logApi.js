const logApi = (req, res, next) => {
    const currentData = new Date();
    console.log(`API is comming at ${currentData}`);
    next();
};

export default logApi;