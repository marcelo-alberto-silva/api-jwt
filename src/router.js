import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DateTimeNow } from './myfunction/datetimenow.js'
import 'dotenv/config.js';
import { eAdmin } from "./middlewares/auth.js";

const router = Router();

router.get('/', eAdmin, async (req, res) => {
    let dataAtual = await DateTimeNow();
    res.status(200).json({
        erro: false,
        mensagem: "Api Atendimento WhatsApp funcionando corretamente: " + dataAtual,
        usuario: req.userId
    })
});

router.post('/cadastrar', async (req, res) => {
    // $2a$08$7sIM3eyOEclxpDRo9p7IJOPkizRp6Nn2sbykGsh6/2Azo7J2chXSO
    const password = await bcrypt.hash("123456", 8);

    console.log(password);

    return res.status(200).json({
        erro: false,
        mensagem: "Cadastrar aqui o usuario com a senha criptografada"
    })
});

router.post('/login', async (req, res) => {
    console.log(req.body);

    if (req.body.email != "marcelo.programador@gmail.com") {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou senha inválidos. E-mail Inválido !!!"
        });
    }

    if (!(await bcrypt.compare(req.body.senha, "$2a$08$7sIM3eyOEclxpDRo9p7IJOPkizRp6Nn2sbykGsh6/2Azo7J2chXSO"))) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou senha inválidos. Senha Inválida !!!"
        }); 
    }

    var token = jwt.sign(
        {
            // coloque aqui todos os dados que serão criptografados com o token, como instancia, mt, etc.
            id: 1
        }, 
        process.env.CHAVE_JWT, 
        {
            expiresIn: 600
        }
    );

    return res.status(200).json({
        erro: false,
        mensagem: "Login do usuario efetuado com sucesso",
        token
    })
});

export default router;