const mongoose= require('../db/mongoose')
// const mongoose = require('mongoose');
// const validator = require('validator');

// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true
// })


//TASKS model

const Task=mongoose.model('Task',{
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})



module.exports=Task;