const {Router,path} = require('express')
const usermodel = require('../models/user')

const router = Router()

router.get('/signin',(req,res)=>{
return res.render('signin')
})

router.get('/signup',(req,res)=>{
    return res.render('signup')
    })

router.post('/signup',async(req,res)=>{
    const {fullname,email,password} = req.body
    await usermodel.create({
        fullname,
        email,
        password
    })
    return res.redirect('/')
})

router.post('/signin',async(req,res)=>{
    const {email,password} = req.body
    console.log(email,password);
    
    const user = await usermodel.find({email})
    console.log(user);
    
    console.log(await usermodel.matchPassword(email,password))
    res.redirect('/')
})

module.exports = router