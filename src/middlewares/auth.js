import jwt from "jsonwebtoken";
import 'dotenv/config.js';
import { promisify } from "util";

export async function eAdmin (req, res, next) {
    const authHeader = req.headers.authorization;
    //console.log(authHeader);
    if (!authHeader) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Necessário realizar o login antes da requisição: Falta o token A!"
        });
    }

    const [bearer, token] = authHeader.split(' ');

    if (!token) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Necessário realizar o login antes da requisição: Falta o token B!"
        });
    }

    try {
        const decode = await promisify(jwt.verify)(token, process.env.CHAVE_JWT);
        // fazer aqui a recuperaçao de todos os dados do token
        req.userId = decode.id;
        return next();
    } catch (err) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Necessário realizar o login antes da requisição: Token inválido !"
        });
    }
}    

export default eAdmin; 