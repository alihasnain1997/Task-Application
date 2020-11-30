const mongoose= require('../db/mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');



const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new Error("Name Should only contain letters");
            }
            else if (validator.isEmpty(value)) {
                throw new Error("Name Should not be empty");
            }

        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Enter the correct email format')
            }

        }

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlenght: 7,
        validate(value) {
            if (value.includes('password')) {
                throw new Error(`Password should contain word "Password"`);

            }
            else if (value.length <= 6) {
                throw new Error('Password lenght should be greater than 6')

            }
        }
    },
    age: {
        type: Number,
        default: 0,

        validate(value) {
            if (value < 0) {
                throw new Error("age must be a positive number");
            }

        }
    },
    avatar:{
        type: Buffer
    }
},{
    timestamps:true
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('no user exist against this email!');
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('password is invalid')
    }
    return user;

}

userSchema.virtual('tasks',{
    ref: 'Task', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'owner', // 
})

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'testCode')
   // user.tokens = user.tokens.concat({ token });
    await user.save();
     return token;
    //return user.tokens

}
userSchema.methods.toJSON = function () {
    const user = this;
    const userobj = user.toObject();
    delete userobj.password;
    delete userobj.tokens;
    delete userobj.avatar;
   
    return userobj;
}

//hash plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
})


userSchema.pre('remove',async function(next){
    const user = this;
    await Task.deleteMany({owner:user._id})
    next()
})
// })
// let {password}=req.body;
// //  console.log(password);
//   let hashPass = await bcrypt.hash(password,8)
//   //console.log(hashPass);
//   req.body.password = hashPass;


const User = mongoose.model('User', userSchema)

module.exports = User;

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
