import { PrismaClient } from '@prisma/client';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './routes';

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors, {
    // origin: ['http://localhost:3000'],
});
app.register(appRoutes);

const port = 3333;
const host = '0.0.0.0' || 'localhost';

//Rota pora pegar todos os registros do banco.
app.get('/', async () => {
    const habits = await prisma.habit.findMany({
        where: {
            title: {
                startsWith: 'Beber',
            },
        },
    });

    return habits;
});

//Listagem da porta que fica rodando o servidor
app.listen({  
    port,
    host,
}).then(() => {
    console.log(`HTTP Server running on port ${port}`);
});
