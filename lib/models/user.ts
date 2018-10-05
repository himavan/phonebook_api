import * as config from  "config";
import * as jwt from "jsonwebtoken";
import * as Joi from "joi";
import * as mongoose from "mongoose";

const Schema = mongoose.Schema

export const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50 
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

export const User = mongoose.model('User', userSchema);

export function generateAuthToken (user) {
    const token = jwt.sign({_id:user._id}, config.get('jwtPrivateKey'));
    return token;
}

export function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
}

export function validate(req) {
    const schema ={
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req, schema);
}