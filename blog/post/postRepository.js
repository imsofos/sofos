const BaseRepository = require('../../baseRepository');
const uuid = require('uuid').v4;
class PostRepository {

    static async create(key, value) {
        const id = uuid();
        value.id = id;
        await BaseRepository.create(`${key}:${id}`, value)
        return value
    }

    static async find(key) {
        return await BaseRepository.find(key);
    }

    static async update(key, value) {
        await BaseRepository.update(key, value)
        return value
    }

    static async remove(key) {
        return await BaseRepository.remove(key)
    }
}

module.exports = PostRepository;