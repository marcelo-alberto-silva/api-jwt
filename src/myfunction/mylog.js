import winston from 'winston';
import { DateTimeNow } from './datetimenow.js';

// Usado na gravacao do log de acesso
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'c:/web/log/api/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'c:/web/log/api/combined.log', level: 'info' }),
    ],
  });

export async function LogApp (mensagem, tipo) {
    let datahora = await DateTimeNow();

    if (tipo == 'info') {
        logger.info(datahora + ' ' + mensagem);
    } else if (tipo == 'erro') {
        logger.error(datahora + ' ' + mensagem);
    }

    return true;
}

export default LogApp;