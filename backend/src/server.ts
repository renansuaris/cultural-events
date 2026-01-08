import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());
app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar no banco:', error);
  });