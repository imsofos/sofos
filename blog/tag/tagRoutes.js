const TagController = require('./tagController');


module.exports = {
    'GET /tags': TagController.find,
    'GET /tags/:id': TagController.find,
    'POST /tags': TagController.create,
    'PATCH /tags/:id': TagController.update,
    'DELETE /tags/:id': TagController.remove,
}