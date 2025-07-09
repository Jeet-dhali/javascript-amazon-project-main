const {getUser} = require('./auth');

async function restrictToLoggedInUser(req, res, next) {
    const jwtId = req.cookies?.jwt;
    if (!jwtId) {
        return res.json({message: 'log in first'});
    }

    const user = getUser(jwtId);
    if (!user) {
        return res.json({message: 'log in first'});
    }
    req.user = user;
    next();
}

module.exports = {restrictToLoggedInUser};