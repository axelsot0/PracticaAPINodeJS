const express = require('express');
const app = express();

const { infoCursos } = require('./datos/cursos.js');
const routerProgramacion = require('./routers/programacion.js');
const routerMatematicas = require('./routers/matematicas.js');

app.use('/api/cursos/programacion', routerProgramacion);
app.use('/api/cursos/matematicas', routerMatematicas);

app.get('/', (req, res) => {
	res.send('Mi primer servidor con Express.js 🚀');
});

app.get('/api/cursos', (req, res) => {
	res.json(infoCursos);
});

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
	console.log(`El servidor está escuchando en el puerto ${PUERTO}...`);
});
