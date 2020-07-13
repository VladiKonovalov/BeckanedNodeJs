const checkAdmin = (req, res, next) => {
    const jwt = require('jsonwebtoken');

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.decode(token, {complete: true});
 if (decoded.payload.isAdmin === true){
  ///      jwt.verify(token, process.env.JWT_KEY);
     
  //console.log(decoded.payload.username);
    //    console.log(decoded.payload.isAdmin);
                next();
 }
    }
    catch (error) {
        res.status(401).json({
            message: "checkAdmin failed"
        })
    }
}

module.exports = checkAdmin;