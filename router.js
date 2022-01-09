const { serveFile, notFound } = require('./baseController');
const postRoutes = require('./blog/post/postRoutes');
const commentRoutes = require('./blog/comment/commentRoutes');
const tagRoutes = require('./blog/tag/tagRoutes');
const userRoutes = require('./blog/user/userRoutes');

const { pathToRegexp } = require("path-to-regexp");
const querystring = require('querystring');
const { render } = require('./templateEngine')



function dispather(routeTableInput) {
    const routeTable = new Map();
    const routes = Object.keys(routeTableInput);
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const temp = route.split(' ')
        const method = temp[0]
        if (!routeTable.has(method)) routeTable.set(method, new Map());
        const keys = [];
        routeTable.get(method).set(pathToRegexp(temp[1], keys), { keys, controller: routeTableInput[route] })
    }
    return async (request, response) => {
        const myUrl = request.url.split('?')
        const methodRoutes = routeTable.get(request.method);
        if (!methodRoutes) return notFound(request, response)
        const routes = methodRoutes.keys()
        for (let i = 0; i < methodRoutes.size; i++) {
            const route = routes.next().value;
            const exec = route.exec(myUrl[0]);
            if (!exec) continue
            const { keys, controller } = methodRoutes.get(route);
            for (let j = 0; j < keys.length; j++) request[keys[j].name] = exec[j + 1]
            request.params = { ...querystring.parse(myUrl[1]) };
            request.body = '';
            request.on('data', (data) => {
                request.body += data;
            });
            request.on('end', () => {
                try {
                    request.body = JSON.parse(request.body)
                } catch (err) { }
                response.render = render(response);
                response.json = output => {
                    response.writeHead(200, 'OK', {
                        'Content-Type': 'application/json'
                    })
                    return response.end(JSON.stringify(output))
                }
                return controller(request, response).catch(error => {
                    console.error(error);
                    response.writeHead(500)
                    response.end('Internal Error')
                })
            });
        }
    }
}

const routeTable = {
    ...postRoutes,
    ...commentRoutes,
    ...tagRoutes,
    ...userRoutes,
    'GET /public/:filePath(.*)': serveFile,
    'GET /uploads/:filePath(.*)': serveFile,
}

module.exports = {
    router: dispather(routeTable)
}
