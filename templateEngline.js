const fs = require('fs').promises;

const render = (response) => {
    return async (filePath, data) => {
        const template = (await fs.readFile(__dirname + '\\public\\' + filePath)).toString()
        const rendered = template.replace(/{{(.*?)}}/g, (match) => {
            return data[match.split(/{{|}}/).filter(Boolean)[0].trim()]
        })
        response.end(rendered)
    }
}

module.exports = { render }
