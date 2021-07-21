const indexController = (request, response) => {
    response.end('OK.')
}

const notFoundController = (request, response) => {
    console.log(request)
    response.end('Not Found.')
}

module.exports = { indexController, notFoundController }