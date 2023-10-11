import { RequestHandler } from "express";
import mongoose from "mongoose";
import ReferralModel from "../models/referral";
import createHttpError from "http-errors";

export const getReferrals: RequestHandler = async (req, res, next) => {
    
    // Get the page number from the query parameters (default to page 1)
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;
    const search = req.query.search as string;
    
    // Calculate the start and end indexes for the current page
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    try {
        let referrals;

        // Search for referrals if search query is present
        if (search) {
            referrals = await ReferralModel.find({
                $or: [
                    { firstname: { $regex: search, $options: 'i' } },
                    { lastname: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { phone: { $regex: search, $options: 'i' } },
                    { addressline1: { $regex: search, $options: 'i' } },
                    { addressline2: { $regex: search, $options: 'i' } },
                    { suburb: { $regex: search, $options: 'i' } },
                    { state: { $regex: search, $options: 'i' } },
                    { postcode: { $regex: search, $options: 'i' } },
                    { country: { $regex: search, $options: 'i' } },
                ]
            }).exec();
        } else {
            referrals = await ReferralModel.find().exec();
        }

        // Slice the items array to get the items for the current page
        const pageItems = referrals.slice(startIndex, endIndex);

        res.status(200).json({
            total: referrals.length,
            countPerPage: pageItems.length,
            currentPage: page,
            items: pageItems,
        });
    } catch (error) {
        next(error);
    }
}

export const getReferral: RequestHandler = async (req, res, next) => {
    const referralId = req.params.referralId;

    try {
        // check for valid ID
        if (!mongoose.isValidObjectId(referralId)) {
            throw createHttpError(400, "Invalid referral ID");
        }

        const referral = await ReferralModel.findById(referralId).exec();

        // check if referral exists
        if (!referral) {
            throw createHttpError(404, "Referral not found");
        }

        res.status(200).json(referral);
    }
    catch (error) {
        next(error);
    }
};

interface CreateReferralBody {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    addressline1?: string;
    addressline2?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
    country?: string;
}

const requiredFields: (keyof CreateReferralBody)[] = [
    'firstname',
    'lastname',
    'email',
    'phone',
    'addressline1',
    'suburb',
    'state',
    'postcode',
    'country',
];

function validateRequiredFields(body: CreateReferralBody): string[] {
    const missingFields: string[] = [];
    for (const field of requiredFields) {
        if (!body[field]) {
        missingFields.push(field);
        }
    }
    return missingFields;
}

export const createReferral: RequestHandler<unknown, unknown, CreateReferralBody, unknown> = async (req, res, next) => {
    const referralData = req.body;
    try {
        // check for required fields
        const missingFields = validateRequiredFields(referralData);

        if (missingFields.length > 0) {
            const errorMessage = `Missing required fields: ${missingFields.join(', ')}`;
            return next(createHttpError(400, errorMessage));
        }

        const newReferral = await ReferralModel.create(referralData);
        res.status(201).json(newReferral);
    } catch (error) {
        next(error);
    }
}

interface UpdateReferralParams {
    referralId: string;
}

interface UpdateReferralBody {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    addressline1?: string;
    addressline2?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
    country?: string;
}

export const updateReferral: RequestHandler<UpdateReferralParams, unknown, UpdateReferralBody, unknown> = async (req, res, next) => {
    const referralId = req.params.referralId;
    const { firstname, lastname, email, phone, addressline1, addressline2, suburb, state, postcode, country } = req.body;

    try {
        // check for valid ID
        if (!mongoose.isValidObjectId(referralId)) {
            throw createHttpError(400, "Invalid referral ID");
        }

        const referral = await ReferralModel.findById(referralId).exec();

        // check if referral exists
        if (!referral) {
            throw createHttpError(404, "Referral not found");
        }

        // update referral
        if (firstname) referral.firstname = firstname;
        if (lastname) referral.lastname = lastname;
        if (email) referral.email = email;
        if (phone) referral.phone = phone;
        if (addressline1) referral.addressline1 = addressline1;
        if (addressline2) referral.addressline2 = addressline2;
        if (suburb) referral.suburb = suburb;
        if (state) referral.state = state;
        if (postcode) referral.postcode = postcode;
        if (country) referral.country = country;
        
        const updatedReferral = await referral.save();

        res.status(200).json(updatedReferral);
    } catch (error) {
        next(error);
    }
}

export const deleteReferral: RequestHandler = async (req, res, next) => {
    const referralId = req.params.referralId;

    try {
        // check for valid ID
        if (!mongoose.isValidObjectId(referralId)) {
            throw createHttpError(400, "Invalid referral ID");
        }

        const referral = await ReferralModel.findById(referralId).exec();

        // check if referral exists
        if (!referral) {
            throw createHttpError(404, "Referral not found");
        }

        await referral.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}