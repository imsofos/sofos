const PostRepository = require('./postRepository');

class PostController {
    static async find(request, response) {
        let key = 'posts';
        if (request.id) key += `:${request.id}`
        const posts = await PostRepository.find(key);
        response.render('index.html', { posts: [posts] })
    }

    static async create(request, response) {
        const model = {
            title: request.body.title,
            date: request.body.date,
            text: request.body.text,
            image: request.body.image,
            author: request.body.author
        }
        const result = await PostRepository.create('posts', model);
        response.json(result);
    }

    static async update(request, response) {
        const key = `posts:${request.id}`;
        const post = await PostRepository.find(key)
        const model = {
            ...post,
            ...request.body
        }
        const result = await PostRepository.update(key, model);
        response.json(result)
    }

    static async remove(request, response) {
    }
}


module.exports = PostController