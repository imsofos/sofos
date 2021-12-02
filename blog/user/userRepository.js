const BaseRepository = require('../../baseRepository');

class UserRepository {

    static async create(userModel) {
        return await BaseRepository.create('users.json', userModel)
    }

    static async find(options = {}) {
        return await BaseRepository.find('users.json', options);
    }

    static async update() {
        return await BaseRepository.update()
    }

    static async remove() {
        return await BaseRepository.remove()
    }
}

module.exports = UserRepository;