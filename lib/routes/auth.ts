import { AuthController } from "../controllers/auth";

export class Authenticate {       
    
    public userController: AuthController = new AuthController();

    public routes(app): void {          
        app.route('/')
        .post(this.userController.getAuth);
    }

}