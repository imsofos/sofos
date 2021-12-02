const PostRepository = require('./postRepository');

class PostController {
    static async find(request, response) {
        const options = {}
        if (request.id) options.filter = { id: +request.id }
        const posts = await PostRepository.find(options);
        response.render('index.html', { posts })
    }

    static async create(request, response) {
    }

    static async update(request, response) {
    }

    static async remove(request, response) {
    }
}


module.exports = PostController