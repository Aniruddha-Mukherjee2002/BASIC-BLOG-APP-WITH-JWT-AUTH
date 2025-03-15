const express = require('express')
const app = express()
const path = require('path')
const userRouter = require('./routes/user')
const mongoose = require('mongoose')

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))
app.use(express.urlencoded({ extended:true }))

//connecting mongodb
mongoose.connect(`mongodb://127.0.0.1:27017/blogify`)
.then(()=>console.log(`MongoDB is connected`))
.catch((erro)=>console.error(`Failed to connect to MongoDB`))

app.get('/',(req,res)=>{
    res.render("index.ejs")
})
app.use('/user',userRouter)

app.listen(8000,()=>console.log('Server is running on 8000')
)