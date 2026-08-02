const crypto = require("crypto");
const Razorpay = require("razorpay");

const getRazorpayInstance = () => {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
        throw new Error("Razorpay credentials are not configured");
    }

    return new Razorpay({
        key_id,
        key_secret,
    });
};

const createOrder = async (req, res) => {
    try {
        const { amount, currency = "INR", receipt } = req.body;

        if (!amount) {
            return res.status(400).json({ message: "Amount is required" });
        }

        const razorpay = getRazorpayInstance();
        const order = await razorpay.orders.create({
            amount: Math.round(Number(amount) * 100),
            currency,
            receipt: receipt || `receipt_${Date.now()}`,
        });

        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const verifyPayments = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: "Missing payment verification data" });
        }

        const body = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            return res.status(400).json({ message: "Invalid payment signature" });
        }

        return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = { createOrder, verifyPayments };