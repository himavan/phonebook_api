import {Request, Response, NextFunction} from "express";
import { ContactController } from "../controllers/contact";
import {checkAuth} from "../middleware/auth";

export class Contacts {       
    
    public contactController: ContactController = new ContactController();

    public routes(app): void {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            // res.status(200).send({
            //     message: 'GET request successfulll!!!!'
            // })
            res.status(200).render("./index.pug");
        }) 
        
        // Get all contacts by user           
        app.route('/api/contacts') 
        .get(checkAuth,this.contactController.getContacts);
        
        app.route('/api/contact') 
        .post(checkAuth,this.contactController.addNewContact);

        // Specife Contact Detials
        app.route('/api/contact/:contactId')
        .get(checkAuth,this.contactController.getContactDetails)
        .post(checkAuth,this.contactController.addNewContactNumber)
        .put(checkAuth,this.contactController.updateContactDetails)
        .delete(checkAuth,this.contactController.deleteContact);

        // Specife Contact Number
        app.route('/api/contact/:contactId/:numberId')
        .get(checkAuth,this.contactController.getContactNumber)
        .put(checkAuth,this.contactController.updateContactNumber)
        .delete(checkAuth,this.contactController.deleteContactNumber);
    }
}