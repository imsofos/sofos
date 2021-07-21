const PORT = process.env.PORT || 10000
const { createServer } = require('http')
const { router } = require('./router');

createServer(router).listen(PORT, () => {
    console.log(`Listening at *:${PORT}`)
});