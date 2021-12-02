const BaseRepository = require('../../baseRepository');

class PostRepository {

    static async create() {
        return await BaseRepository.create()
    }

    static async find(options = {}) {
        return await BaseRepository.find('posts.json', options);
    }

    static async update() {
        return await BaseRepository.update()
    }

    static async remove() {
        return await BaseRepository.remove()
    }
}

module.exports = PostRepository;