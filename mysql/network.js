const express = require('express');

const response = require('../network/response');
const store = require('../store/mysql');

const router = express.Router();

router.get('/:table', async (req, res, next) => {
    try {
        const data = await store.list(req.params.table);
        response.success(req, res, data, 200);
    } catch (error) {
        response.error(req, res, 'Hubo un problema en el servidor', 500, error);
    }
});

router.get('/:table/:id', async (req, res, next) => {
    try {
        const data = await store.get(req.params.table, req.params.id);
        response.success(req, res, data, 200);
    } catch (error) {
        response.error(req, res, 'Hubo un problema en el servidor', 500, error);
    }
});

router.post('/:table', async (req, res, next) => {
    try {
        const data = await store.insert(req.params.table, req.body);
        response.success(req, res, data, 200);
    } catch (error) {
        response.error(req, res, 'Hubo un problema en el servidor', 500, error);
    }
});

router.put('/:table', async (req, res, next) => {
    try {
        const data = await store.update(req.params.table, req.body);
        response.success(req, res, data, 200);
    } catch (error) {
        response.error(req, res, 'Hubo un problema en el servidor', 500, error);
    }
});


module.exports = router;