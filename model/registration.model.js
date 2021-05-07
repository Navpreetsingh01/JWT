const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

var registerSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    phone:{
        type:'number',
        required: true,
        unique: true
    },
    password:{
        type:'string'
    },
    cpassword:{
        type:'string'
    },
    tokens:[{
        token:{
            type:'string',
            required: true
        }
    }]
});

registerSchema.methods.generateToken = async function(){
    try {
        const token = jwt.sign( {_id: this._id.toString()}, process.env.SECRET_KEY )
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token
    } catch (error) {
        console.log(error)
    }
}

registerSchema.pre("save", async function (next) {
    
        if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
        console.log(this.password)
        }

        next()
    
})


const Register = mongoose.model('Register', registerSchema);

module.exports = Register;


 