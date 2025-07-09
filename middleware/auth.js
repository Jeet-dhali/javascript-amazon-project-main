const jwt = require('jsonwebtoken');
const secretId = "121506";

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, secretId);
}

function getUser(token) {
    if (!token) {
        return null;
    }
    return jwt.verify(token, secretId);
}

module.exports = {
    setUser,
    getUser
}