const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

const User  = mongoose.model('User',{

    name:{
        type: String,
        required: true,
        trim:true,
        validate(value)
        {
            if(!validator.isAlpha(value))
            {
                throw new Error("Name Should only contain letters");
            }
            else if(validator.isEmpty(value))
            {
                throw new Error("Name Should not be empty");
            }

        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('Enter the correct email format')
            }

        }

    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlenght:7,
        validate(value){
            if(!validator.isAlphanumeric(value))
            {
                throw new Error('Password should contain numbers and letters only')
            }
            else if(value.includes('password'))
            {
                throw new Error(`Password should contain word "Password"`);

            }
            else if(value.length<=6)
            {
                throw new Error('Password lenght should be greater than 6')

            }
        }
    },
    age:{
        type: Number,
        default:0,
        
        validate(value){
            if(value<0)
            {
                throw new Error("age must be a positive number");
            }

        }
    }
})

module.exports=User;

// const user1 = new User({
//     name:'john',
//     email:'johnwoch@gmail.com',
//     password:'pass',
//     age: 5
//   })

// user1.save().then((u)=>{
//     console.log(u);

// }).catch((error)=>{
//     console.log(error);
// })
