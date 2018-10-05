"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.userSchema = new Schema({
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
exports.User = mongoose.model('User', exports.userSchema);
function generateAuthToken(user) {
    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    return token;
}
exports.generateAuthToken = generateAuthToken;
function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
}
exports.validateUser = validateUser;
function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req, schema);
}
exports.validate = validate;
//# sourceMappingURL=user.js.map