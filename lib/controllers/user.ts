import * as mongoose from 'mongoose';
import * as _ from "lodash";
import * as bcrypt from "bcrypt";


import { User,validateUser,generateAuthToken } from '../models/user';
import { Request, Response } from 'express';


    export class UserController{

        public async getUser (req, res) {
            const user = await User.findById(req.user._id).select('-password');
            res.send(user);
        }

        public async addNewUser (req: Request, res: Response) {  
            try {
                const { error } = validateUser(req.body);
                if(error) return res.status(400).send(error.details[0].message);

                let user = await User.findOne({email:req.body.email});
                if (user) return res.status(400).send('User already registered.');

                user = new User(_.pick(req.body,['name','email','password']));
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
                await user.save();
           
                const token = generateAuthToken(user);
                res.header('x-auth-token',token).send(_.pick(user, ['_id','name','email']));
            } catch (error) {
                console.log(error);
            }
        }
    }
