import * as mongoose from 'mongoose';
import { contactSchema,validateContact,validateContactNumber } from '../models/contact';
import { Request, Response } from 'express';

const Contact = mongoose.model('Contact', contactSchema);
export class ContactController{

    public async getContacts (req, res) {           
        try {     
            const contact = await Contact.find({added_by:req.user._id});
            if (!contact) return res.status(404).send('The contacts with the given User ID was not found.');
            res.send(contact);
        } catch (error) {
            console.log(error);
        }
    }

    public async addNewContact (req, res) {  
        try {
            req.body.added_by = req.user._id;
            const { error } = validateContact(req.body);
            if(error) return res.status(400).send(error.details[0].message);
    
            let contact = new Contact(req.body);
            contact = await contact.save();
    
            res.send(contact)
        } catch (error) {
            console.log(error);
        }
    }

    public async getContactDetails (req, res) { 
        const contact = await Contact.find({added_by:req.user._id, _id:req.params.contactId});
        if (!contact) return res.status(404).send('Contact not found.');
        res.send(contact);
    }

    public async updateContactDetails (req, res) {  
        
        const contactID = await Contact.find({added_by:req.user._id, _id:req.params.contactId});
        if (!contactID) return res.status(401).send('Invalid Access');

        const { error } =  validateContact(req.body); 
        if (error) return res.status(400).send(error.details[0].message);     

        const contact = await Contact.findOneAndUpdate(req.params.id,
            {
                name: req.body.name,
                email: req.body.isGold,
                company: req.body.phone,
                imgUrl:req.body.imgUrl
            }, { new: true });

        res.send(contact);
    }

    public async deleteContact (req, res) {   
        const contactID = await Contact.find({added_by:req.user._id, _id:req.params.contactId});
        if (!contactID) return res.status(401).send('Invalid Access');

        const contact = await Contact.deleteOne({ _id: req.params.contactId } );
        res.send(contact);
    }

    public async addNewContactNumber (req, res) {  
        const contactID = await Contact.find({added_by:req.user._id, _id:req.params.contactId});
        if (!contactID) return res.status(401).send('Invalid Access');

        const { error } = validateContactNumber(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let contact = await Contact.findOneAndUpdate(req.params.contactId,{
            $push:{
                phone:{
                    type:req.body.type,
                    code:req.body.code,
                    number:req.body.number
                }
            }
        },{safe: true, upsert: true});
       contact = await Contact.find(req.params.contactId);
        res.send(contact)
    }

    public async getContactNumber (req: Request, res: Response) {           
        const contact = await Contact.find({_id:req.params.contactId},{phone:{$elemMatch:{_id:req.params.numberId}}});
        if (!contact) return res.status(404).send('The contact with the given ID was not found.');
        res.send(contact);
    }

    public async updateContactNumber (req, res) {  
        try {
            
            const contactID = await Contact.find({added_by:req.user._Id, _id:req.params.contactId});
            if (!contactID) return res.status(401).send('Invalid Access');
    
            const { error } =  validateContactNumber(req.body); 
            if (error) return res.status(400).send(error.details[0].message);     

            let contact = await Contact.findById(req.params.contactId);

            const phone = contact.phone.id(req.params.numberId);
            phone.type = req.body.type;
            phone.code = req.body.code;
            phone.number = req.body.number;

            contact.save();
    
            res.send(contact);
        } catch (error) {
            console.log(error)
        }
    }

    public async deleteContactNumber (req, res) {           
        const contactID = await Contact.find({added_by:req.user._Id, _id:req.params.contactId});
        if (!contactID) return res.status(401).send('Invalid Access');

        let contact = await Contact.findById(req.params.contactId);
        const phone = contact.phone.id(req.params.numberId);
        phone.remove();
        contact.save();
        res.send(contact);
    }

}
    