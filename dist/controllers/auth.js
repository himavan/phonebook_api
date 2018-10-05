"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const bcrypt = require("bcrypt");
const user_1 = require("../models/user");
class AuthController {
    getAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = user_1.validate(req.body);
            if (error)
                return res.status(400).send(error.details[0].message);
            let user = yield user_1.User.findOne({ email: req.body.eamil });
            if (!user)
                return res.status(400).send('Invalid email or password.');
            const validPassword = yield bcrypt.compare(req.body.password, user.password);
            if (!validPassword)
                return res.status(400).send('Invalid email or password.');
            const token = user.generateAuthToken();
            res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
            res.send(user);
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.js.map