const fs = require('fs/promises');
const handlebars = require('handlebars');

const htmlCompiler = async (file, context) => {
    try {
        const html = await fs.readFile(file);
        const compilador = handlebars.compile(html.toString());
        const htmlString = compilador(context);
        return htmlString
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = htmlCompiler