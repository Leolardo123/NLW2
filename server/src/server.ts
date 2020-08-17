import express from 'express';
import routes from './routes';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

var port = 3000;

//localhost:users


// Corpo (Request Body): Dados para criação ou atualização de um registro
// Route Params : identificar Qual recurso eu quero atualziar ou deletar
// Query Params : paginação, filtros, ordenação

app.listen(port, function () {
    console.log("Escutando na porta "+port)
})