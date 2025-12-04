import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend Cultural Events rodando com sucesso!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});