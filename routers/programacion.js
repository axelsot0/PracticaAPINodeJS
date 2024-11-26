
const express = require('express');

const { programacion } = require('../datos/cursos.js').infoCursos;

const routerProgramacion = express.Router();

// Procesar el cuerpo de la solicitud.
routerProgramacion.use(express.json());

routerProgramacion.get('/', (req, res) => {
    res.json(programacion);
});

routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje);

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos de ${lenguaje}.`);
    }

    if (req.query.ordenar === 'vistas') {
        return res.send(resultados.sort((a, b) => b.vistas - a.vistas));
    }

    res.json(resultados);
});

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;

    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

    if (resultados.length === 0) {
        return res.status(204).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
    }
    res.json(resultados);
});

routerProgramacion.post('/', (req, res) => {
    let cursoNuevo = req.body;
    console.log(cursoNuevo);
    console.log("ID: ", cursoNuevo.id);
    console.log("Titulo: ", cursoNuevo.titulo);
    console.log("Lenguaje: ", cursoNuevo.lenguaje);
    console.log("Vistas: ", cursoNuevo.vistas); 
    console.log("Nivel: ", cursoNuevo.nivel);
   
    if (!cursoNuevo.id  || !cursoNuevo.titulo  || !cursoNuevo.lenguaje || !cursoNuevo.visitas || !cursoNuevo.nivel) {
        console.log("faltan campos");
        return res.status(400).send('Faltan campos requeridos (id, titulo, lenguaje, visitas, nivel)');
    }

    
    const existingCurso = programacion.find(curso => curso.id === cursoNuevo.id);
    if (existingCurso) {
        return res.status(400).send('Ya existe un curso con ese id');
    }

    programacion.push(cursoNuevo);

    
    res.json(programacion);
});


routerProgramacion.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);
    
    if (indice >= 0) {
        console.log("curso encontrado")
        cursoActualizado.id = id;
        programacion[indice] = cursoActualizado;
    }
    else {
        console.log("curso no encontrado")
        return res.status(400).send('No existe un curso con ese id');
    }
    res.json(programacion);
});


routerProgramacion.patch('/:id', (req, res) => {
    const infoNueva = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0) {
        const cursoAModificar = programacion[indice];
        Object.assign(cursoAModificar, infoNueva);
    }
    res.json(programacion);
});

routerProgramacion.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0) {
        programacion.splice(indice, 1);
    }
    res.json(programacion);
});

module.exports = routerProgramacion;