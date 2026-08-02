const user = require("../model/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
}

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        //TODO: Implement password hashing before saving the user to the database 
        //TODO: Implement JWT token generation and return it in the response for authentication purposes
        //TODO: OTP verification for email confirmation before allowing login
        //TODO: Implement Password reset functionality with email verification and token expiration
        //TODO: welcome email notification after successful registration

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        // Create a new user
        const newUser = await user.create({ username, email, password: hashedPassword });

        if (newUser) {
           const otp = Math.floor(100000 + Math.random() * 900000).toString()  ;    
            // Generate a 6-digit OTP

            const message = `Welcome to TimeX! ${username}, Thank you for registering. Your account has been successfully created. Your OTP for TimeX registration is: ${otp}`;
            await sendEmail({ email, subject: "Welcome to TimeX - OTP Verification", message });
            res.status(201).json({ 
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                token: generateToken(newUser._id),
                message: "User registered successfully. Please check your email for OTP verification."
             });
            


        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const foundUser = await user.findOne({ email });
        if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
            res.json({
                _id: foundUser._id,
                username: foundUser.username,
                email: foundUser.email,
                role: foundUser.role,
                token: generateToken(foundUser._id),
            });


        }else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await user.find().select("-password"); // Exclude password field from the response    
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = { 
    registerUser,
    loginUser,
    getUsers };
