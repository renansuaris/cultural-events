import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import { generateOpenAPI } from './config/openapi'; 
import { errorMiddleware } from './middlewares/errorMiddleware';
import { User } from './entities/User';
import { UserRoles } from './constants/roles';
import { hash } from 'bcryptjs';

const app = express();
const PORT = Number(process.env.port) || 3000;

app.use(cors()); 
app.use(express.json());
app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(generateOpenAPI()));

app.use(errorMiddleware);

AppDataSource.initialize()
  .then(async () => {

    const userRepository = AppDataSource.getRepository(User);
    const adminExists = await userRepository.findOneBy({ email: 'admin@email.com' });

    if (!adminExists) {
      console.log('Criando admin padrão');
      const passwordHash = await hash('admin', 10); 

      const admin = userRepository.create({
        name: 'Admin',
        email: 'admin@email.com',
        password: passwordHash,
        role: UserRoles.ADMIN
      });

      await userRepository.save(admin);
      console.log('Admin Criado com sucesso');
    } 
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  });