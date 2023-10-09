import { RequestHandler } from "express";
import mongoose from "mongoose";
import ContactModel from "../models/contact";
import createHttpError from "http-errors";

export const getContacts: RequestHandler = async (req, res, next) => {
    try {
        const contacts = await ContactModel.find().exec();
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}

export const getContact: RequestHandler = async (req, res, next) => {
    const contactId = req.params.contactId;

    try {
        // check for valid ID
        if (!mongoose.isValidObjectId(contactId)) {
            throw createHttpError(400, "Invalid contact ID");
        }

        const contact = await ContactModel.findById(contactId).exec();

        // check if contact exists
        if (!contact) {
            throw createHttpError(404, "Contact not found");
        }

        res.status(200).json(contact);
    }
    catch (error) {
        next(error);
    }
};

interface CreateContactBody {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
}

export const createContact: RequestHandler<unknown, unknown, CreateContactBody, unknown> = async (req, res, next) => {
    const { firstname, lastname, email, phone } = req.body;
    try {
        // check for required fields
        if (!firstname || !lastname || !phone) {
            throw createHttpError(400, "Missing one or more of required fields: firstname, lastname, phone number");
        }

        const newContact = await ContactModel.create({ firstname, lastname, email, phone });
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
}

interface UpdateContactParams {
    contactId: string;
}

interface UpdateContactBody {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
}

export const updateContact: RequestHandler<UpdateContactParams, unknown, UpdateContactBody, unknown> = async (req, res, next) => {
    const contactId = req.params.contactId;
    const { firstname, lastname, email, phone } = req.body;

    try {
        // check for valid ID
        if (!mongoose.isValidObjectId(contactId)) {
            throw createHttpError(400, "Invalid contact ID");
        }

        const contact = await ContactModel.findById(contactId).exec();

        // check if contact exists
        if (!contact) {
            throw createHttpError(404, "Contact not found");
        }

        if (firstname) {
            contact.firstname = firstname;
        }

        if (lastname) {
            contact.lastname = lastname;
        }

        if (email) {
            contact.email = email;
        }

        if (phone) {
            contact.phone = phone;
        }

        const updatedContact = await contact.save();

        res.status(200).json(updatedContact);
    } catch (error) {
        next(error);
    }
}

export const deleteContact: RequestHandler = async (req, res, next) => {
    const contactId = req.params.contactId;

    try {
        // check for valid ID
        if (!mongoose.isValidObjectId(contactId)) {
            throw createHttpError(400, "Invalid contact ID");
        }

        const contact = await ContactModel.findById(contactId).exec();

        // check if contact exists
        if (!contact) {
            throw createHttpError(404, "Contact not found");
        }

        await contact.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}