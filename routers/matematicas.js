const express = require('express');

const { matematicas } = require('../datos/cursos.js').infoCursos;

const routerMatematicas = express.Router();

routerMatematicas.use(express.json());




routerMatematicas.get('/', (req, res) => {
    res.json(matematicas);
});

routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema;
    const resultados = matematicas.filter(curso => curso.tema === tema);

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos de ${tema}`);
    }
    res.json(resultados);
});

routerMatematicas.post('/', (req, res) => {
    let cursoNuevo = req.body;
    console.log(cursoNuevo); 
    console.log("ID: ", cursoNuevo.id);
    console.log("Titulo: ", cursoNuevo.titulo);
    console.log("Tema: ", cursoNuevo.tema);
    console.log("Vistas: ", cursoNuevo.vistas);
    console.log("Nivel: ", cursoNuevo.nivel);

    if(!cursoNuevo.id || !cursoNuevo.titulo || !cursoNuevo.tema || !cursoNuevo.visitas || !cursoNuevo.nivel)
    {
        return res.status(404).send(`Campos de la propiedad invalidos o faltantes `);

    }
    const existingCurso = matematicas.find(curso => curso.id === cursoNuevo.id);
    if (existingCurso) {
        return res.status(400).send('Ya existe un curso con ese id');
    }

    matematicas.push(cursoNuevo);
    res.json(matematicas);
});

module.exports = routerMatematicas;
//Axel Soto 2022-2184
//Andy Daniel 2023-0972
//Angel Naut 2023-0955
//Angelo Bonifacio 2023-0939