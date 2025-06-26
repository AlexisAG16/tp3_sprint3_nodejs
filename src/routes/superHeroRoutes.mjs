import express from 'express';
import { validacionHeroe } from '../validation/validacionHeroes.mjs';
import { handleValidationErrors } from '../validation/errorMiddleware.mjs';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,

    formAgregarHeroController,
    formActualizarHeroeController,
    confirmarEliminacionController,

    agregarHeroController,
    actualizarHeroController,
    eliminarHeroController

} from '../controllers/superheroesController.mjs';

const router = express.Router();

// endpoints de lectura
router.get('/heroes',obtenerTodosLosSuperheroesController);
router.get('/heroes/mayores-30',obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/:id',obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor',buscarSuperheroesPorAtributoController);

// Formularios
router.get('/formAgregarHero',formAgregarHeroController);
router.get('/formEditarHero/:id',formActualizarHeroeController);
router.get('/confirmarEliminar/:id', confirmarEliminacionController);

// Ruta: Create
router.post('/AgregarHero',
    validacionHeroe(),
    handleValidationErrors ,
    agregarHeroController);

// Ruta: Update
router.put('/ActualizarHero/:id',
    validacionHeroe(),
    handleValidationErrors ,
    actualizarHeroController);

// Ruta: Delete
router.delete('/EliminarHero/:id', eliminarHeroController);


export default router;