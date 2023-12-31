const jwt = require('jsonwebtoken');
const secretKey = "THANH125202";
// Middleware để kiểm tra và xác thực token
const authenticateToken = (req, res, next) => {
    if (
        req.path === '/account/login' ||
        req.path === '/categories/getall' ||
        req.path === '/products/getcategories' ||
        req.path === '/products/getnewproduct' ||
        req.path.startsWith('/products/getbyid/')
      ) {
        return next();
      }
      

    const tokenHeader  = req.header('Authorization');
    console.log('tokenHeader',tokenHeader)
    if (!tokenHeader ) {
        return res.status(401).json({ error: 'Unauthorized: Token is missing' });
    }

    const [tokenType, token] = tokenHeader.split(' ');

    if (tokenType !== 'Bearer') {
        return res.status(401).json({ error: 'Unauthorized: Invalid token type' });
    }
    console.log('totokenTypeken',tokenType)
    console.log('token',token)


    // Xác thực token
    jwt.verify(token, secretKey, (err, user) => {
        try{ if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
            }
            req.user = user;
            next();}
        catch(error){
            throw error;
        }
       
    });
};

module.exports = authenticateToken;