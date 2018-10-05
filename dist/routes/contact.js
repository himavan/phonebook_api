"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = require("../controllers/contact");
const auth_1 = require("../middleware/auth");
class Contacts {
    constructor() {
        this.contactController = new contact_1.ContactController();
    }
    routes(app) {
        app.route('/', auth_1.checkAuth)
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        // Get all contacts by user           
        app.route('/contacts')
            .get(auth_1.checkAuth, this.contactController.getContacts);
        app.route('/contact')
            .post(auth_1.checkAuth, this.contactController.addNewContact);
        // Specife Contact Detials
        app.route('/contact/:contactId')
            .get(auth_1.checkAuth, this.contactController.getContactDetails)
            .post(auth_1.checkAuth, this.contactController.addNewContactNumber)
            .put(auth_1.checkAuth, this.contactController.updateContactDetails)
            .delete(auth_1.checkAuth, this.contactController.deleteContact);
        // Specife Contact Number
        app.route('/contact/:contactId/:numberId')
            .get(auth_1.checkAuth, this.contactController.getContactNumber)
            .put(auth_1.checkAuth, this.contactController.updateContactNumber)
            .delete(auth_1.checkAuth, this.contactController.deleteContactNumber);
    }
}
exports.Contacts = Contacts;
//# sourceMappingURL=contact.js.map