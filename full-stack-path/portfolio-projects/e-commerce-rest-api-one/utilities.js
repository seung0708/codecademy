const bcrypt = require('bcrypt');

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

module.exports = {
    passwordHash,
    validatePassword
}