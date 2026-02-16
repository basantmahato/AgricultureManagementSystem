import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    mobile: { type: String, required: true },
    customerName: { type: String },
    customerEmail: { type: String },
    paymentMethod: { type: String, default: "COD" },
    status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
