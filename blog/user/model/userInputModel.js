const { validateEmail } = require('../../../utility/validator');


class UserInputModel {
    static create(body) {
        if (validateEmail(body.email))
            return new Error('Invalid Email Address.');
        return {
            username: 'Iman Safarzadeh',
            password: 'password', // TOOD: hash password
            email: 'imsofos@gmail.com' || null,
            avatar: 'i dont know how :)' || null,
        }
    }
}

module.exports = UserInputModel