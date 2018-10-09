import { AuthController } from "../controllers/auth";

export class Authenticate {       
    
    public userController: AuthController = new AuthController();

    public routes(app): void {          
        app.route('/api/auth')
        .post(this.userController.getAuth);
    }

}