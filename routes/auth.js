const User = require('../entites/User');
const router = require('express').Router()
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res) => {

    //Checking if the email exists
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists){
        return res.status(400).send('Email already exists')
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }
    catch(err){
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {


    //Checking email exists or not
    const emailExists = await User.findOne({email: req.body.email})
    if(!emailExists){
        return res.status(400).send('Email not found!')
    }
    //jwt
    const token = jwt.sign({_id: emailExists._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token)

})

module.exports = router;