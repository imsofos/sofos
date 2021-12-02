const UserInputModel = require('./model/userInputModel');
const UserRepository = require('./userRepository');


class UserController {
    static async find(request, response) {
    }

    static async create(request, response) {
        const userModel = UserInputModel.create(request);
        const user = await UserRepository.create(userModel);
        response.end(user)
    }

    static async update(request, response) {
    }

    static async remove(request, response) {
    }
}


module.exports = UserController