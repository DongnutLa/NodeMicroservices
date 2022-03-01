const express = require('express');

const bodyParser = require('body-parser');

const config = require('../config');
const router = require('./network');

const app = express();

app.use(bodyParser.json());

app.use('/', router);

app.listen(config.mysql_service.port, () => {
    console.log('Servicio de Mysql escuchar en el puerto ', config.mysql_service.port);
});