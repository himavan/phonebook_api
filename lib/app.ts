
import * as express from "express";
import * as mongoose from "mongoose";
import * as config from "config";

import { Contacts } from "./routes/contact";
import { Users } from "./routes/user";
import { Authenticate } from "./routes/auth";

class App {

    public app: express.Application;
    public contactsRoutes: Contacts = new Contacts();
    public userRoutes: Users = new Users();
    public authRoutes: Authenticate = new Authenticate();
    public mongoUrl: string = 'mongodb://localhost/contacts';

    constructor() {
        this.app = express();
        this.config(); 
        this.contactsRoutes.routes(this.app);
        this.userRoutes.routes(this.app);
        this.authRoutes.routes(this.app);   
        this.mongoSetup();        
    }

    private mongoSetup(): void{
        try {
            mongoose.Promise = global.Promise;
            mongoose.connect(this.mongoUrl,{ useNewUrlParser: true , createIndexes : true});   
        } catch (error) {
            console.log(`Mongo Connection Error ${error}` );
        }
    }

    private config(): void{
        // support application/json type post data
        this.app.use(express.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({ extended: false }));

        if (!config.get('jwtPrivateKey')) {
            console.error('FATAL ERROR: jwtPrivateKey is not defined.');
            process.exit(1);
          }
    }

}

export default new App().app;