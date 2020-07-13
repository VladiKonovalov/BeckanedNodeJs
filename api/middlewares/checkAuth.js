const checkAuth = (req, res, next) => {
    const jwt = require('jsonwebtoken');

    try {
        const token = req.headers.authorization.split(' ')[1];
        
        jwt.verify(token, process.env.JWT_KEY);

        next();

    }
    catch (error) {
        res.status(401).json({
            message: "Auth failed"
        })
    }
}

module.exports = checkAuth;