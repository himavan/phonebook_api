import { UserController } from "../controllers/user";
import {checkAuth} from "../middleware/auth";

export class Users {       
    
    public userController: UserController = new UserController();

    public routes(app): void {          
        app.route('/api/me')
        .get(checkAuth,this.userController.getUser);
                 
        app.route('/api/register')   
        .post(this.userController.addNewUser);
    }
}