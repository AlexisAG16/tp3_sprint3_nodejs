import express from 'express';
import {connectDB} from './config/dbconfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

const app = express();
const PORT = process.env.PORT || 3000;

const loggerMiddleware = (req,res,next) =>
{
    console.log(`Peticion Recibida: ${req.body} ${req.url}`);
    next();
};

app.use(loggerMiddleware);

// para peticiones post en formularios
app.use(bodyParser.urlencoded({ extended: true }));

// convertir metodos de formularios a put o delete
app.use(methodOverride('_method'));

// para traer estilos al server
app.use(express.static('public'));

// parsea los datos JSON que se envian en http
app.use(express.json());

connectDB();

// vistas ejs
app.set('view engine','ejs');

app.use('/api',superHeroRoutes);

app.use((req,res) => {
    res.status(404).send({mensaje:"Ruta no encontrada"});
});

app.listen(PORT,()=>
{
    console.log(`Servidor escuchando en el puerto ${PORT} , en http://localhost:${PORT}`);
});