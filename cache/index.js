const express = require('express');

const bodyParser = require('body-parser');

const config = require('../config');
const router = require('./network');

const app = express();

app.use(bodyParser.json());

app.use('/', router);

app.listen(config.cache_service.port, () => {
    console.log('Servicio de cache escuchar en el puerto ', config.cache_service.port);
});