const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');
const secure = require('./secure');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const data = await Controller.list();
        response.success(req, res, data, 200);
    } catch (error) {
        response.error(req, res, 'Hubo un problema en el servidor', 500, error);
    }

});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await Controller.get(req.params.id);
        response.success(req, res, data, 200);
    } catch (error) {
        response.error(req, res, 'Hubo un problema en el servidor', 500, error);
    }

});

router.post('/', async (req, res, next) => {
    try {
        const data = await Controller.post(req.body, 'create');
        response.success(req, res, data, 200);
    } catch (error) {
        response.error(req, res, 'Hubo un problema en el servidor', 500, error);
    }

});

router.put('/', secure('update'), async (req, res, next) => {
    try {
        const data = await Controller.post(req.body, 'update');
        response.success(req, res, data, 200);
    } catch (error) {
        response.error(req, res, 'Hubo un problema en el servidor', 500, error);
    }

});

router.get('/user/:id', async (req, res, next) => {
    try {
        const data = await Controller.getByUser(req.params.id);
        response.success(req, res, data, 200);
    } catch (error) {
        response.error(req, res, 'Hubo un problema en el servidor', 500, error);
    }

});

module.exports = router;