const Order = require("../model/Order");
const User = require("../model/User");
const Product = require("../model/Product");

const getadminStats = async (req, res) => {
    try{
        const totalOrders = await Order.countDocuments({});
        const totalUsers = await User.countDocuments({role: 'user'});
        const totalProducts = await Product.countDocuments({});

        const orders = await Order.find({});
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
        res.json({
            totalOrders,
            totalUsers,
            totalProducts,
            totalRevenue
        });

    }
    catch(error){
        res.status(500).json({ message: 'Error fetching admin stats', error });
    }
};

module.exports = { getadminStats };