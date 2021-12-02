const CommentController = require('./CommentController');


module.exports = {
    'GET /comments': CommentController.find,
    'GET /comments/:id': CommentController.find,
    'POST /comments': CommentController.create,
    'PATCH /comments/:id': CommentController.update,
    'DELETE /comments/:id': CommentController.remove,
}