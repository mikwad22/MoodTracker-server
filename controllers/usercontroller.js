const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SIGNUP
router.post('/user/signup', (req, res) => {
    console.log(req.body);
    User.create({
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 10)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET,
            {expiresIn: 60*60*24})
            res.json({
                user: user,
                message: 'user created',
                sessionToken: token
            })
        },
        createError = err => res.send(500, err)
    )
    .catch(err => res.status(500).json({
        error: err
    }))
})

// LOGIN
router.post('/user/login', (req, res) => {
    User.findOne({ 
        where: {
            username: req.body.user.username
        }
    })
        .then(user => {
            if(user){
                bcrypt.compare(req.body.user.password, user.password, (err, matches) => { 
                    if (matches){
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                        res.json({
                            user: user,
                            message: 'user successfully logged in!',
                            sessionToken: token
                        })
                    } else {
                        res.status(502).send({error: 'password did not match'})
                    }
                }) 
            } else {
                res.status(500).send({error: 'failed to authenticate'}) // user not found
            }
        }, err => res.status(501).send({error: 'failed to process'})) // issue somewhere else
})

module.exports = router;