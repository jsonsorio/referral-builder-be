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
  },
  phone: {
    type: String,
    required: true,
  },
}, {timestamps: true});

type Contact = InferSchemaType<typeof contactSchema>;

export default model<Contact>("Contact", contactSchema);
