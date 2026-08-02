const Order = require("../model/Order");
const sendEmail = require("../utils/sendEmail");

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;

        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({ message: "Order items cannot be empty" });
        }

        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            address,
            paymentId
        });

        await order.save();

        const message = 'Dear ' + req.user.username + ',\n\nYour order has been successfully created. Here are the details:\n\nOrder ID: ' + order._id + '\nTotal Amount: ' + order.totalAmount + '\nShipping Address: ' + order.address + '\n\nThank you for shopping with us!\n\nBest regards,\nTimeX Team';

        await sendEmail({
            email: req.user.email,
            subject: "Order Created",
            message
        });

        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate("items.productId", "name price");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' ,error});
    }
};
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user","id name");      res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' ,error});
    }
};
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.orderId);
        if (order) {
            order.status = status;
            await order.save();
            res.status(200).json({ message: "Order status updated successfully", order });

        }
        else {
            res.status(404).json({ message: "Order not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating order status', error });
    }
};
module.exports = { createOrder, myOrders, getOrders, updateOrderStatus };
