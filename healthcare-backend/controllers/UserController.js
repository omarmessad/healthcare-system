const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');
const UserFactory = require('../Factories/userFactory');

exports.userRegister = async (req, res) => {
    const { name, email, password, role, specialization } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const userDetails = { name, email, password, isAdmin: role === 'Admin' };

        if (role === 'Doctor') {
            userDetails.specialization = specialization;
        }

        user = UserFactory.createUser(role, userDetails);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user.' });
    }
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const passwordChecker = await bcrypt.compare(password, user.password);

        if (!passwordChecker) {
            return res.status(401).json({ error: 'Invalid Credentials.' });
        }

        const payload = {
            user: {
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin  
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
            if (error) {
                console.error('JWT signing error:', error);
                return res.status(500).json({ error: 'Server error.' });
            }
            res.status(200).json({ token });
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error.' });
    }
};



exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('Requested user ID:', userId);

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID.' });
        }

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Server error.' });
    }
};



exports.getAllUsers = async (req, res) => {

    try {

        const users = await User.find().select('-password');
        res.status(200).json(users);

    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ error: 'Server error.' });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true } 
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Server error.' });
    }
};


exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Server error.' });
    }
};


exports.userLogout = async (req, res) => {
    res.status(200).json({ message: 'Logout successful.' });
};