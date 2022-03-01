const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const data = await Controller.login(req.body.username, req.body.password)
        response.success(req, res, data, 200);
    } catch (error) {
        response.error(req, res, 'Hubo un problema en el servidor', 500, error);
    }

})

module.exports = router;