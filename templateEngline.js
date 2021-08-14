const fs = require('fs').promises;


const render = (response) => {
    return async (filePath, context) => {
        let generatedCode = `return () => {\nlet output = '';\n`;
        for (let i = 0; i < Object.keys(context).length; i++) {
            const key = Object.keys(context)[i];
            generatedCode += `
                var thing = ${JSON.stringify(context[key])};
                let ${key} = thing;
            `
        }
        const oprationStack = [];
        const template = (await fs.readFile(__dirname + '\\public\\' + filePath)).toString()
        const tokens = template.split(/({{.*?}}|{%.*?%}|{#.*?#})/s).map(token => !['\n'].includes(token) ? token : null).filter(token => Boolean(token))
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token.startsWith('{#')) {
                continue;
            } else if (token.startsWith('{{')) {
                generatedCode += `output += ${token.slice(2, token.length - 2).trim()};\n`;
            } else if (token.startsWith('{%')) {
                const words = token.slice(2, token.length - 2).trim().split(' '); // TODO: replace spliter with regex (whitespace)
                if (words[0].startsWith('if')) {
                    if (words.length != 2) throw `Don't understand if ${token}`;
                    oprationStack.push('if');
                    generatedCode += `if (${words[1]}) {\n`
                } else if (words[0].startsWith('for')) {
                    if (words.length != 4) throw `Don't understand for ${token}`;
                    oprationStack.push('for');
                    generatedCode += `for (${words[1]} of ${words[3]}) {\n`;
                } else if (words[0].startsWith('end')) {
                    if (words.length != 1) throw `Don't understand end ${token}`;
                    if (!oprationStack.length) throw `Too many ends ${token}`;
                    const endWhat = words[0].slice(3, words[0].length);
                    const startWhat = oprationStack.pop();
                    if (endWhat != startWhat) throw `Mismatched end tag ${token}`
                    generatedCode += `}\n`
                } else {
                    throw 'unexpected token' + words[0];
                }
            } else {
                generatedCode += 'output += `' + token.trim() + '`;\n';
            }
        }
        if (oprationStack.length) throw `Unmatched action tag ${oprationStack[oprationStack.length - 1]}`
        generatedCode += `return output\n}`
        response.end(new Function(generatedCode)()());
    }
}

module.exports = { render }