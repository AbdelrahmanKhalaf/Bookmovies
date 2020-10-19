const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = async (req , res , next ) => {
    const token = await req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('Access Denied --- NO TOKEN PROVIDED');
    };

    try {
        const decoded = await jwt.verify(token , config.get('jwtPrivatKey'));
        req.user = decoded; 
        next();
    }
    catch (ex) {
        return res.status(400).send('invlid TOKEN');
    };
}