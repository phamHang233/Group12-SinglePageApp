
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const productSchema = new Schema(
    {
      product_id: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product_category_name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
    { _id: false } // Tắt tự động tạo _id cho phần tử trong mảng
  );
  
const orderSchema = new Schema({
    products: [productSchema],
    customer_id: {
      type: String,
      required: true,
    },
    order_purchase_timestamp: {
      type: Date,
    },
  });
  
  module.exports = mongoose.model("orders", orderSchema);