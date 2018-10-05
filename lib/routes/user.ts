import { UserController } from "../controllers/user";
import {checkAuth} from "../middleware/auth";

export class Users {       
    
    public userController: UserController = new UserController();

    public routes(app): void {          
        app.route('/me')
        .get(checkAuth,this.userController.getUser);
                 
        app.route('/register')   
        .post(this.userController.addNewUser);
    }
}