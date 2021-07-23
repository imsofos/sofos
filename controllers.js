const fs = require('fs').promises;


const indexController = async (request, response) => {
    await serveFile({filePath: 'index.html'}, response)
}

const notFoundController = async (request, response) => {
    response.end('Not Found.')
}

const serveFile = async (request, response) => {
    const filePath = __dirname + '\\public\\' + request.filePath
    const file = await fs.readFile(filePath)
    response.end(file)
}

module.exports = {
    indexController,
    notFoundController,
    serveFile
}