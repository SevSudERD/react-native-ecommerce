import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
});

const Payment = mongoose.model('Payment', paymentSchema);
