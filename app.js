﻿const express = require('express');
const app = express();

const { infoCursos } = require('./datos/cursos.js');
app.use(express.json()); 


const routerProgramacion = require('./routers/programacion.js');
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas', routerMatematicas);


app.get('/', (req, res) => {
	res.send('Mi primer servidor con Express.');
});

app.get('/api/cursos/', (req, res) => {
	res.json(infoCursos);
});



const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
	console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});
//Axel Soto 2022-2184
//Andy Daniel 2023-0972
//Angel Naut 2023-0955
//Angelo Bonifacio 2023-0939