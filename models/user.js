const {Schema,mongoose,model} = require('mongoose')
// const bcrypt = require('bcrypt')
const {createHmac,randomBytes} = require('crypto');
const { error } = require('console');

const userSchema = Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String,
        // required:true
    },
    profileimageurl:{
        type:String,
        required:true,
        default:'/images/user.jpeg'
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    }
},{timestamps:true})
//this will hash the password before saving.
userSchema.pre('save',async function(next){
    const user = this;

    if(!user.isModified('password')) return;
    
    const salt = 'mystring'

    const hashedPass = createHmac('sha256',salt)
    .update(user.password)
    .digest('hex')
    this.salt = salt
    this.password = hashedPass
    next()
})
userSchema.static('matchPassword',async function(email,password){
    const user = await this.findOne({email})
    if(!user){
        throw new error('Something went wrong!')
    }
    console.log(user);
    
    const salt = user.salt
    const hashedPassword = user.password
    const userProvidePass = createHmac('sha256',salt)
    .update(password)
    .digest('hex')

    if(hashedPassword !== userProvidePass){
        throw new Error(`Something went wrong`)
    }

    return user
})

const usermodel = model("user",userSchema)
module.exports = usermodel
