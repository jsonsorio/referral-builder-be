import express from 'express';
import * as ContactsController from '../controllers/contacts';

const router = express.Router();

router.get('/', ContactsController.getContacts);

router.get('/:contactId', ContactsController.getContact);

router.post('/', ContactsController.createContact);

router.patch('/:contactId', ContactsController.updateContact);

router.delete('/:contactId', ContactsController.deleteContact);

export default router;
