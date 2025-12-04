import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend rodando com sucesso!');
});

AppDataSource.initialize()
  .then(() => {
    console.log('Banco de Dados conectado com sucesso!');
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar no banco:', error);
  });