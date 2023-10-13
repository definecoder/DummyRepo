const db = require('../config/db');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
        //required: [true, "password is required"],
    },

    email: {
        type: String,
        lowercase: true,
        required: true,
        //required: [true, "userName can't be empty"],
        // @ts-ignore
        // match: [
        //     /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        //     "userName format is not correct",
        // ],
        unique: true,
    },
    password: {
        type: String,
        lowercase: true,
        required: true,
        //required: [true, "password is required"],
    }
});
//},{timestamps:true});


// used while encrypting user entered password
userSchema.pre("save",async function(){
    
    // if(!user.isModified("password")){
    //     return
    // }
    var user = this;
    try{
        
        //const salt = await (bcrypt.genSalt(10));
        const hash = user.password;

        user.password = hash;
    }catch(err){
        throw err;
    }
});


// //used while signIn decrypt
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        console.log('----------------no password',this.password);
        
        // @ts-ignore
        const isMatch = candidatePassword === this.password;
        console.log(candidatePassword)
        return isMatch;
    } catch (error) {
        throw error;
    }
};

const UserModel = db.model('mydata',userSchema);
module.exports = UserModel;