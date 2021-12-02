const PORT = process.env.PORT || 10000
const { createServer } = require('http')
const { router } = require('./router')

createServer(async (request, response) => {
    console.log(new Date(), request.method, request.url)
    await router(request, response)
}).listen(PORT, () => {
    console.log(`Listening at http://127.0.0.1:${PORT}`)
});