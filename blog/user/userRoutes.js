const UserController = require('./userController');


module.exports = {
    'GET /users': UserController.find,
    'GET /users/:id': UserController.find,
    'POST /users': UserController.create,
    'PATCH /users/:id': UserController.update,
    'DELETE /users/:id': UserController.remove,
}