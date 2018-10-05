"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
class Authenticate {
    constructor() {
        this.userController = new auth_1.AuthController();
    }
    routes(app) {
        app.route('/')
            .post(this.userController.getAuth);
    }
}
exports.Authenticate = Authenticate;
//# sourceMappingURL=auth.js.map