import express  from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import 'dotenv/config.js';
import router from './router.js';
import { LogApp } from './myfunction/mylog.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(process.env.PORT_HTTP || 3007, async () => {      
    await LogApp('Api atendimento whatsapp rodando em http na versão 2024-09-A ...', 'info');
  }
);

https.createServer({
    cert: fs.readFileSync('./src/ssl/code.crt'),
    key: fs.readFileSync('./src/ssl/code.key')
}, app).listen(process.env.PORT_HTTPS || 3008, async () => {    
    await LogApp('Api atendimento whatsapp rodando em https na versão 2024-09-A ...', 'info');
  }
);