import { InferSchemaType, Schema, model } from "mongoose";

const contactSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  addressline1:
  {
    type: String,
    required: true,
  },
  addressline2:
  {
    type: String,
  },
  suburb: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
}, {timestamps: true});

type Contact = InferSchemaType<typeof contactSchema>;

export default model<Contact>("Contact", contactSchema);
