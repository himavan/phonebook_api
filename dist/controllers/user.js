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
class UserController {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findById(req.user._id).select('-password');
            res.send(user);
        });
    }
    addNewUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = user_1.validateUser(req.body);
                if (error)
                    return res.status(400).send(error.details[0].message);
                let user = yield user_1.User.findOne({ email: req.body.email });
                if (user)
                    return res.status(400).send('User already registered.');
                user = new user_1.User(_.pick(req.body, ['name', 'email', 'password']));
                const salt = yield bcrypt.genSalt(10);
                user.password = yield bcrypt.hash(user.password, salt);
                yield user.save();
                const token = user_1.generateAuthToken(user);
                res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.js.map