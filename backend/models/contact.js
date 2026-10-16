const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema(
  {
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, required: true },
    address: { type: String, default: "" },
    description: { type: String, required: true },
    image: { type: String, default: "" },
  },
  {
    timestamps: true, // 👈 adds createdAt & updatedAt automatically
  },
);

const Contacts = mongoose.model("Contact", ContactSchema);
module.exports = Contacts;
