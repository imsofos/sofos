const Redis = require("ioredis");
const redis = new Redis();

class BaseRepository {

    static async create(key, value) {
        return await redis.set(key, JSON.stringify(value))
    }

    static async find(key) {
        return JSON.parse((await redis.get(key)))
    }

    static async update(key, value) {
        return await redis.set(key, JSON.stringify(value))
    }

    static async remove(key) {
        return await redis.unlink(key)
    }
}

module.exports = BaseRepository;