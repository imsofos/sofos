const fs = require('fs').promises;

const notFound = async (request, response) => {
    response.end('Not Found.')
}

const serveFile = async (request, response) => {
    const filePath = __dirname + (request.url.startsWith('/public') ? '\\public\\' : '\\uploads\\') + request.filePath
    const file = await fs.readFile(filePath)
    response.end(file)
}

module.exports = {
    notFound,
    serveFile
}