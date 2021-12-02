const PostController = require('./postController');


module.exports = {
    'GET /posts': PostController.find,
    'GET /posts/:id': PostController.find,
    'POST /posts': PostController.create,
    'PATCH /posts/:id': PostController.update,
    'DELETE /posts/:id': PostController.remove,
}