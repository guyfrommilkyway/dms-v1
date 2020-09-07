const path = require('path')
const express = require('express')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const { userSignup, userLogin, userLogout } = require('../../services/user')
const authentication = require('../middlewares/authentication')

const router = new express.Router()

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../public/uploads/profile'),
    filename: function (req, file, cb) {
        cb(null, uuidv4())
    }
})
const uploadUserAvatar = multer({ storage: storage })

// User signup
router.post('/user/signup', uploadUserAvatar.any(), async (req, res) => {
    try {
        await userSignup(req.body, req.files)

        res.status(201)
            .redirect('/')
    } catch (e) {
        res.status(400)
            .send()
    }
})

// User login
router.post('/user/login', async (req, res) => {
    try {
        const { user, token } = await userLogin(req.body)

        req.session.user = user
        req.session.token = token

        res.cookie('sessionId', req.session.id)
            .redirect('/home')
    } catch (e) {
        res.status(400)
            .redirect('/')
    }
})

// User logout
router.post('/user/logout', authentication, async (req, res) => {
    try {
        userLogout(req.session.token)

        req.session.destroy()

        res.clearCookie('sessionId')
            .redirect('/')
    } catch (e) {
        res.status(500)
            .send()
    }
})

module.exports = router