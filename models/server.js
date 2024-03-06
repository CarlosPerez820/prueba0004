const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
const path = require('path');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //PATH'S
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.barredoresPath = '/api/barredores';
        this.encuestasPath = '/api/encuestas';
        this.seguimientoPath = '/api/seguimiento';
        //Conectar a BD
        this.conectarBD();
        //Middlewares 
        this.middlewares();
        //Rutas de aplicacion
        this.routes();

    }

    async conectarBD(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuario'));
        this.app.use(this.barredoresPath, require('../routes/barredor'));
        this.app.use(this.encuestasPath, require('../routes/encuesta'));
        this.app.use(this.seguimientoPath, require('../routes/seguimiento'));

        // Regla de reescritura para Angular (al final)
        this.app.get('/*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/', 'index.html'));
        });
    }
    
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Corriendo en el puerto", this.port);
        });
    }

}

module.exports = Server;