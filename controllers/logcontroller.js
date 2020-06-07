const router = require('express').Router()
const Log = require('../db').import('../models/log');

// POST - CREATE MOOD LOG
router.post('/log', (req, res) => {
    const logFromRequest = {
        date: req.body.date,
        timeOfDay: req.body.timeOfDay,
        mood: req.body.mood,
        comment: req.body.comment
    }
    Log.create(logFromRequest)
    .then(log => res.status(200).json({
        log: log
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
});

// GET - ALL LOGS FOR USER
router.get('/log', (req, res) => {
    Log.findAll({
        where: {
            id: req.user.id
        }
    })
    .then(logs => res.status(200).json({
        logs: logs
    }))
    .catch(err = res.status(500).json({
        error: err
    }))
});

// GET LOG BY ID
router.get('/log/:id', (req, res) => {
    Log.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(log => res.status(200).json({
        log: log
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
})

// UPDATE LOG BY USER ID: PUT METHOD
router.put('/log/:id', (req, res) => {
    Log.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(log => res.status(200).json({
        log: log
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
})

// DELETE LOG
router.delete('/log/:id', (req, res) => {
    Log.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(log => res.status(200).json({
        log: log
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
})

module.exports = router;