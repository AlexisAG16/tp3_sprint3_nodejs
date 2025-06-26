import{
    obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30, 
    crearSuperheroe, 
    actualizarSuperheroe,
    eliminarSuperHeroe} 
    from '../services/superheroesService.mjs';

import { renderizarSuperheroe,renderizarListaSuperheroes } from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req,res)
{
    /* const superheroeFormateado = renderizarSuperheroe(superheroe);
    console.log(superheroeFormateado);*/
    
    try{
            const { id } = req.params;
            const superheroe = await obtenerSuperheroePorId(id);

            if(!superheroe)
            {
                return res.status(404).send({ mensaje: 'Superheroe no encontrado'});
            }

            const superheroeFormateado = renderizarSuperheroe(superheroe);
            res.status(200).json(superheroeFormateado);
        }
    catch(error)
    {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe',error: error.message });
    }
    
}

export async function obtenerTodosLosSuperheroesController(req,res)
{
    try{
            const superheroes = await obtenerTodosLosSuperheroes();

            res.render('dashboard', { superheroes });
        }
    catch(error)
    {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes',error: error.message });
    }
}

export async function buscarSuperheroesPorAtributoController(req,res)
{
    try{
            const {atributo,valor} = req.params;
            const superheroes = await buscarSuperheroesPorAtributo(atributo,valor);

            if(superheroes.length === 0)
            {
                return res.status(404).send(
                { mensaje:'No se encontraron superheroes con ese atributo'});
            }
            const superheroesFormateados = renderizarListaSuperheroes(superheroes);
            
            //console.log(superheroesFormateados);

            res.status(200).json(superheroesFormateados);
        }
    catch (error)
    {
        res.status(500).send({mensaje: "Error al buscar los superheroes",error: error.message});
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req,res)
{
    try 
    {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if(superheroes.length === 0)
        {
            return res.status(404).send(
                { mensaje : 'No se encontraron superheroes mayores de 30 años'});
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    }
    catch(error)
    {
        res.status(500).send(
            { mensaje: 'Error al obtener superhéroes mayores de 30',error:error.message});
    }
}

// funcion de controlador para crear heroes
export async function agregarHeroController(req,res){
    try
    {
        const body = {
            ...req.body,
            poderes: req.body.poderes || [],
            aliados: req.body.aliados || [],
            enemigos: req.body.enemigos || [],
        };
        const crearSuper = await crearSuperheroe(body);
        console.log(crearSuper);
        res.redirect("http://localhost:3000/api/heroes");
    }
    catch(error)
    {
        res.status(500).send({mensaje:'Error al crear un superheroe nuevo'});
        console.log(error);
    }
}

export async function actualizarHeroController(req,res){
    try
    {
        const {id} = req.params;
        const heroActualizado = {
            ...req.body,
            poderes: req.body.poderes || [],
            aliados: req.body.aliados || [],
            enemigos: req.body.enemigos || [],
        };
        const actualizarSuper = await actualizarSuperheroe(id,heroActualizado);
        console.log(actualizarSuper);
        res.redirect("http://localhost:3000/api/heroes");
    }
    catch(error)
    {
        res.status(500).send({mensaje:'Error al modificar el superheroe'});
        console.log(error);
    }
}

export async function eliminarHeroController(req, res) {
    try {
        const { id } = req.params;

        const superheroeEliminado = await eliminarSuperHeroe(id);

        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado para eliminar.' });
        }

        res.redirect("http://localhost:3000/api/heroes");
    } catch (error) {
        console.error('Error al eliminar superhéroe:', error);
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe.' });
    }
}


export async function confirmarEliminacionController(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ mensaje: 'ID del superhéroe es requerido para confirmar eliminación.' });
        }

        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado para confirmar eliminación.' });
        }

        res.render('confirmarEliminacion', { info: superheroe });

    } catch (error) {
        console.error('Error al cargar la página de confirmación de eliminación:', error);
        res.status(500).send({ mensaje: 'Error interno al cargar la página de confirmación.' });
    }
}

// funciones de controlador para formularios
export async function formAgregarHeroController(req,res){
    res.render('agregarHero');
}

export async function formActualizarHeroeController(req,res){
    try{
    const {id} = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if (!superheroe) {
        return res.status(404).send('Superhéroe no encontrado para editar.');
    }

    res.render('editarHero',{info : superheroe});
    } 
    catch (error) {
        console.error('Error al cargar el formulario de edición:', error);
        res.status(500).send('Error interno al cargar el superhéroe.');
    }
}