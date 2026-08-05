const Order = require("../model/Order");
const sendEmail = require("../utils/sendEmail");

// Create Order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;

        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({
                message: "Order items cannot be empty"
            });
        }

        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            address,
            paymentId
        });

        await order.save();

        const message = `
Dear ${req.user.username},

Your order has been placed successfully.

Order ID: ${order._id}
Total Amount: ₹${order.totalAmount}

Thank you for shopping with TimeX.

Regards,
TimeX Team
`;

        await sendEmail({
            email: req.user.email,
            subject: "Order Created Successfully",
            message
        });

        return res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Logged-in User Orders
const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        }).populate("items.productId", "name price imageUrl");

        return res.status(200).json(orders);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
};

// Admin - Get All Orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("user", "username email")
            .populate("items.productId", "name price imageUrl");

        return res.status(200).json(orders);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
};

// Admin - Update Order Status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.status = status;

        await order.save();

        return res.status(200).json({
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error updating order status",
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus
};