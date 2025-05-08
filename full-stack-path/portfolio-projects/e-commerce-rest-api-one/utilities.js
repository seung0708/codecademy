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

module.exports = {
    passwordHash
}