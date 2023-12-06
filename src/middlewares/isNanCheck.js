const isNanVerify = (req, res, next) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ mensagem: 'Parametro ID inválido' });
        };
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = {
    isNanVerify
}