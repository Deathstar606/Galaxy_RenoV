const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    toolId: { type: String, required: true },
    duration: { type: String, required: true },
    pickupMethod: { type: String, required: true },
    charge: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    location: {
      type: Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function (value) {
          if (typeof value === "string") {
            return ["Ottawa", "Toronto", "Quebec", ""].includes(value); // Ensure string is one of the predefined locations
          }
          if (typeof value === "object") {
            return (
              value.hasOwnProperty("latitude") &&
              value.hasOwnProperty("longitude") &&
              typeof value.latitude === "number" &&
              typeof value.longitude === "number"
            );
          }
          return false;
        },
        message:
          "Location must be a string (Ottawa, Toronto, Quebec) or an object with latitude and longitude.",
      },
    },
    trackingStatus: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    tracking: {
      isTracking: { type: Boolean, default: false },
      currentLocation: {
        latitude: Number,
        longitude: Number,
        updatedAt: Date,
      },
    },
  },
  { timestamps: true },
);

const Rent = mongoose.model("Rent", RentSchema);
module.exports = Rent;
