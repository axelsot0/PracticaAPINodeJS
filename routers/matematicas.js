const express = require('express');

const { matematicas } = require('../datos/cursos.js').infoCursos;

const routerMatematicas = express.Router();

routerMatematicas.use(express.json());

routerMatematicas.get('/', (req, res) => {
    res.json(matematicas);
});

routerMatematicas.get('/:titulo', (req, res) => {
    const titulo = req.params.titulo;
    const resultados = matematicas.filter(curso => curso.titulo === titulo);

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos de ${titulo}`);
    }
    res.json(resultados);
});

routerMatematicas.post('/', (req, res) => {
    let cursoNuevo = req.body;
    console.log(cursoNuevo); 
    console.log("ID: ", cursoNuevo.id);
    console.log("Titulo: ", cursoNuevo.titulo);
    console.log("Lenguaje: ", cursoNuevo.lenguaje);
    console.log("Vistas: ", cursoNuevo.vistas);
    console.log("Nivel: ", cursoNuevo.nivel);
    if (!cursoNuevo.hashOwnProperty(`titulo`))
    {
        return res.status(404).send(`No se encontro el ${titulo}`);

    }
    

    matematicas.push(cursoNuevo);
    res.json(matematicas);
});

module.exports = routerMatematicas;