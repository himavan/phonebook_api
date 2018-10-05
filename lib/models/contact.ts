import * as Joi from 'joi';
import * as objectID from 'joi-objectid';
Joi.objectId = objectID(Joi);
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const contactSchema = new Schema({
   
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:50
    },
    email: {
        type: String ,
        minlength: 5,
        maxlength: 255,       
    },
    company: {
        type: String            
    },
    phone: [{
        type:{
            type: String,
            required: true,
            minlength: 1,
            maxlength:15 
        },
        code:{
            type: String,
            required: true,
            minlength: 1,
            maxlength:5 
        },
        number:{
            type: String,
            required: true,
            minlength: 10,
            maxlength:15 
        }
    }],
    imgUrl: {
        type: String,
        minlength: 5,
        maxlength:50
    },
    added_by: mongoose.Schema.Types.ObjectId
});

const numberschema ={
    type:Joi.string().min(1).max(15),
    code:Joi.string().min(1).max(5),
    number:Joi.string().min(10).max(15).required()
};

export function validateContact(contact) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).email(),
      company: Joi.string().min(5).max(50),
      phone: Joi.array().items( Joi.object(numberschema)),
      imgUrl:Joi.string().min(5).max(50),
      added_by:Joi.objectId().required()

    };
    return Joi.validate(contact, schema);
}

export function validateContactNumber(number){ 
  return Joi.validate(number, numberschema);
}


