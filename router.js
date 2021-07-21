const { indexController, notFoundController } = require('./controllers');

const routeTable = {
    '/': indexController
};

const router = (request, response) => {
    const url = request.url
    if (typeof routeTable[url] === 'function') {
        routeTable[url](request, response)
    } else {
        notFoundController(request, response)
    }
}

module.exports = { router };