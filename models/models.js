const express = require('express');
const cors = require('cors');
const { dbConection } = require('../db/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        this.databaseConnect();

        this.middlewares();

        this.routes();
    }

    async databaseConnect() {
        await dbConection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use( express.json());
        this.app.use( express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port , () => {
            console.log('Servidor escuchando en ', this.port);
        } )
    }


}

module.exports = Server;
