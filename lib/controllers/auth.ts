import * as _ from "lodash";
import * as bcrypt from "bcrypt";
import { Request, Response } from 'express';

import { User, validate } from '../models/user';

export class AuthController{
    public async getAuth (req: Request, res: Response) {  
        const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({email:req.body.email});
        if (!user) return res.status(400).send('Invalid email or password.');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        const token = user.generateAuthToken();
        res.header('x-auth-token',token).send(_.pick(user, ['_id','name','email']));
    }
}
