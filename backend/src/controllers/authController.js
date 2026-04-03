import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register a new user (customer or farmer)
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password, address, pincode, role, farmName, farmingMethod, profileImage, farmImage } = req.body;

        const userExists = await User.findOne({ 
            $or: [{ email }, { mobile }] 
        });

        if (userExists) {
            res.status(400).json({ message: 'User with this email or mobile already exists' });
            return;
        }

        const user = await User.create({
            name,
            email,
            mobile,
            password,
            address,
            pincode,
            role,
            farmName,
            farmingMethod,
            profileImage,
            farmImage
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                address: user.address,
                pincode: user.pincode,
                farmName: user.farmName,
                farmingMethod: user.farmingMethod,
                profileImage: user.profileImage,
                farmImage: user.farmImage,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: error.message || 'Server error during registration' });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                address: user.address,
                pincode: user.pincode,
                farmName: user.farmName,
                farmingMethod: user.farmingMethod,
                profileImage: user.profileImage,
                farmImage: user.farmImage,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            address: user.address,
            pincode: user.pincode,
            role: user.role,
            farmName: user.farmName,
            farmingMethod: user.farmingMethod,
            profileImage: user.profileImage,
            farmImage: user.farmImage,
            rating: user.rating
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Get all farmers
// @route   GET /api/auth/farmers
// @access  Public
const getFarmers = async (req, res) => {
    try {
        const farmers = await User.find({ role: 'farmer' }).select('-password -tokens');
        res.json(farmers);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get farmer by ID
// @route   GET /api/auth/farmers/:id
// @access  Public
const getFarmerById = async (req, res) => {
    try {
        const farmer = await User.findById(req.params.id).select('-password -tokens');
        if (farmer && farmer.role === 'farmer') {
            res.json(farmer);
        } else {
            res.status(404).json({ message: 'Farmer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.mobile = req.body.mobile || user.mobile;
            user.address = req.body.address || user.address;
            user.pincode = req.body.pincode || user.pincode;
            user.profileImage = req.body.profileImage || user.profileImage;
            
            if (user.role === 'farmer') {
                user.farmName = req.body.farmName || user.farmName;
                user.farmingMethod = req.body.farmingMethod || user.farmingMethod;
                user.farmImage = req.body.farmImage || user.farmImage;
            }

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                mobile: updatedUser.mobile,
                role: updatedUser.role,
                address: updatedUser.address,
                pincode: updatedUser.pincode,
                farmName: updatedUser.farmName,
                farmingMethod: updatedUser.farmingMethod,
                profileImage: updatedUser.profileImage,
                farmImage: updatedUser.farmImage,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Profile Update Error:', error);
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

export { registerUser, loginUser, getUserProfile, getFarmers, getFarmerById, updateUserProfile };
