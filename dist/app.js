"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const contact_1 = require("./routes/contact");
const user_1 = require("./routes/user");
const auth_1 = require("./routes/auth");
class App {
    constructor() {
        this.contactsRoutes = new contact_1.Contacts();
        this.userRoutes = new user_1.Users();
        this.authRoutes = new auth_1.Authenticate();
        this.mongoUrl = 'mongodb://localhost/contacts';
        this.app = express();
        this.config();
        this.contactsRoutes.routes(this.app);
        this.userRoutes.routes(this.app);
        this.authRoutes.routes(this.app);
        this.mongoSetup();
    }
    mongoSetup() {
        try {
            mongoose.Promise = global.Promise;
            mongoose.connect(this.mongoUrl, { useNewUrlParser: true, createIndexes: true });
        }
        catch (error) {
            console.log(`Mongo Connection Error ${error}`);
        }
    }
    config() {
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
exports.default = new App().app;
//# sourceMappingURL=app.js.map