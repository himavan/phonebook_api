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
const mongoose = require("mongoose");
const contact_1 = require("../models/contact");
const Contact = mongoose.model('Contact', contact_1.contactSchema);
class ContactController {
    getContacts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield Contact.find({ added_by: req.user._id });
                if (!contact)
                    return res.status(404).send('The contacts with the given User ID was not found.');
                res.send(contact);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addNewContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.added_by = req.user._id;
                const { error } = contact_1.validateContact(req.body);
                if (error)
                    return res.status(400).send(error.details[0].message);
                let contact = new Contact(req.body);
                contact = yield contact.save();
                res.send(contact);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getContactDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield Contact.find({ added_by: req.user._id, _id: req.params.contactId });
            if (!contact)
                return res.status(404).send('Contact not found.');
            res.send(contact);
        });
    }
    updateContactDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactID = yield Contact.find({ added_by: req.user._id, _id: req.params.contactId });
            if (!contactID)
                return res.status(401).send('Invalid Access');
            const { error } = contact_1.validateContact(req.body);
            if (error)
                return res.status(400).send(error.details[0].message);
            const contact = yield Contact.findOneAndUpdate(req.params.id, {
                name: req.body.name,
                email: req.body.isGold,
                company: req.body.phone,
                imgUrl: req.body.imgUrl
            }, { new: true });
            res.send(contact);
        });
    }
    deleteContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactID = yield Contact.find({ added_by: req.user._id, _id: req.params.contactId });
            if (!contactID)
                return res.status(401).send('Invalid Access');
            const contact = yield Contact.deleteOne({ _id: req.params.contactId });
            res.send(contact);
        });
    }
    addNewContactNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactID = yield Contact.find({ added_by: req.user._id, _id: req.params.contactId });
            if (!contactID)
                return res.status(401).send('Invalid Access');
            const { error } = contact_1.validateContactNumber(req.body);
            if (error)
                return res.status(400).send(error.details[0].message);
            let contact = yield Contact.findOneAndUpdate(req.params.contactId, {
                $push: {
                    phone: {
                        type: req.body.type,
                        code: req.body.code,
                        number: req.body.number
                    }
                }
            }, { safe: true, upsert: true });
            contact = yield Contact.find(req.params.contactId);
            res.send(contact);
        });
    }
    getContactNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield Contact.find({ _id: req.params.contactId }, { phone: { $elemMatch: { _id: req.params.numberId } } });
            if (!contact)
                return res.status(404).send('The contact with the given ID was not found.');
            res.send(contact);
        });
    }
    updateContactNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactID = yield Contact.find({ added_by: req.user._Id, _id: req.params.contactId });
                if (!contactID)
                    return res.status(401).send('Invalid Access');
                const { error } = contact_1.validateContactNumber(req.body);
                if (error)
                    return res.status(400).send(error.details[0].message);
                let contact = yield Contact.findById(req.params.contactId);
                const phone = contact.phone.id(req.params.numberId);
                phone.type = req.body.type;
                phone.code = req.body.code;
                phone.number = req.body.number;
                contact.save();
                res.send(contact);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteContactNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactID = yield Contact.find({ added_by: req.user._Id, _id: req.params.contactId });
            if (!contactID)
                return res.status(401).send('Invalid Access');
            let contact = yield Contact.findById(req.params.contactId);
            const phone = contact.phone.id(req.params.numberId);
            phone.remove();
            contact.save();
            res.send(contact);
        });
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=contact.js.map