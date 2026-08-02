const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            }

        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        fullname : { type: String, required: true },
        street : { type: String, required: true },
        city : { type: String, required: true },
        state : { type: String, required: true },
        postalCode : { type: String, required: true },
        country : { type: String, required: true }
    },
    paymentId: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending"
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (_document, order) => {
            // MongoDB stores this as `_id`; expose a descriptive API field instead.
            order.orderId = order._id.toString();
            delete order._id;
            delete order.__v;
            return order;
        }
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
