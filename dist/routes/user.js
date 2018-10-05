"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllers/user");
const auth_1 = require("../middleware/auth");
class Users {
    constructor() {
        this.userController = new user_1.UserController();
    }
    routes(app) {
        app.route('/me')
            .get(auth_1.checkAuth, this.userController.getUser);
        app.route('/register')
            .post(this.userController.addNewUser);
    }
}
exports.Users = Users;
//# sourceMappingURL=user.js.map