const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true
})
const User = mongoose.model('User', {
    name: {
        type:String,
        required: true,
        trim: true //remove whitespace left and right
    },
    email:{
        type: String,
        required:true,
        trim: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type:Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive')
            }
        }
    }
})
const me = new User({name: 'Henry ',email:'ben@gmail.com   ', age: 19})
me.save().then(() => {
    console.log(me)
}).catch((error)=>{
    console.log('Error!',error)
})
// const Task = mongoose.model('Task', {
//     description:{
//         type: String
//     }, completed: {
//         type: Boolean
//     } 
// })
// const cleanHouse = new Task({
//     description:'clean the house', 
//     completed: false
// })
// cleanHouse.save().then(() => {
//     console.log(cleanHouse)
// }).catch((error) => {
//         console.log('error',error)
//     })