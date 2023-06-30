const express= require('express')
const multer = require("multer")
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// Create user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
         const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }
    catch (e){
        res.status(400).send(e)
    }   
})

// Login user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {   
        res.status(400).send()
    }
})

// Logout user
router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

// Logout all user tokens
router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch (e) {
        res.status(500).send()
    }
})

// Read user profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// Update user profile
router.patch('/users/me', auth, async (req, res) => {
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// Delete the authenticated user
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.deleteOne() // Trigger the middleware to delete associated tasks
    res.send(req.user)
  } catch (e) {
    console.error(e.message)
    res.status(500).send(e)
  }
})

// User's avatar upload
const upload = multer({
  limits: {
    fileSize: 1000000, // number in byte, 1MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)/)){
        return cb(new Error("Please upload an image"));
    }
    cb(undefined, true)
  }
})
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save();
  res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// Delete user's avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()   
})

// Get user image by id
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router