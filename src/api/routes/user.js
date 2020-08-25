const express = require('express')
const { userSignup, userLogin } = require('../../services/user')

const router = new express.Router()

// User signup
router.post('/user/signup', async (req, res) => {
    try {
        await userSignup(req.body)

        req.method = 'get'
        res.redirect('/')
    } catch (e) {
        res.status(400).send()
    }
})

// User login
router.post('/user/login', async (req, res) => {
    try {
        const { user, token } = await userLogin(req.body)

        res.cookie('accessToken', token)
            .redirect('/home')
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router