const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const passwordHash = async (password, saltRounds) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch(error) {
        console.log(error)
    }
    return null;
}

const validatePassword = async (password, storedPassword) => {
    try {
        return await bcrypt.compare(password, storedPassword)
    } catch (error) {
        console.log(error)
    }
}

const checkUserAccess = (targetUserId, loggedInUserId) => {
    if (targetUserId !== loggedInUserId) {
        return false
    }
    return true;
}

module.exports = {
    passwordHash,
    validatePassword,
    checkUserAccess
}