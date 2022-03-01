const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await Controller.list();
        response.success(req, res, users, 200);
    } catch (error) {
        response.error(req, res, error.message, 500, error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await Controller.get(req.params.id);
        response.success(req, res, user, 200);
    } catch (error) {
        response.error(req, res, error.message, 500, error);
    }
});

router.post('/', async (req, res) => {
    try {
        await Controller.post(req.body, 'create');
        response.success(req, res, req.body, 201);
    } catch (error) {
        response.error(req, res, error.message, 500, error);
    }
});

router.put('/', secure('update'), async (req, res) => {
    try {
        await Controller.post(req.body, 'update');
        response.success(req, res, req.body, 201);
    } catch (error) {
        response.error(req, res, 'Error interno', 500, error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Controller.remove(req.params.id);
        response.success(req, res, req.body, 200);
    } catch (error) {
        response.error(req, res, 'Error interno', 500, error);
    }
});

router.post('/follow/:id', secure('follow'), async (req, res, next) => {
    try {
        const follow = await Controller.follow(req.user.id, req.params.id, 'create');
        response.success(req, res, follow, 200);
    } catch (error) {
        response.error(req, res, 'Error interno', 500, error);
    }
});

router.get('/:id/following', async (req, res, next) => {
    try {
        const follows = await Controller.following(req.params.id)
        response.success(req, res, follows, 200);
    } catch (error) {
        response.error(req, res, error.message, 500, error);
    }
})

module.exports = router;