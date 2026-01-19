import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import { generateOpenAPI } from './config/openapi'; 
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();
const PORT = Number(process.env.port) || 3000;

app.use(cors()); 
app.use(express.json());
app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(generateOpenAPI()));

app.use(errorMiddleware);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  });