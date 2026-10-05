const User = require('../models/User');
const Transaction = require('../models/Transaction');
const bcrypt = require('bcryptjs');

// @desc Add money to wallet
// @route POST /api/wallet/add-money
// @access Private

const addMoney = async (req, res) => {
    // #swagger.security = [{ "bearerAuth": [] }]
    try {
        const { amount, mpin } = req.body;
        const userId = req.user._id;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: 'Amount must be greater than zero'
            });
        }

        if (!mpin) {
            return res.status(400).json({
                message: 'MPIN is required'
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Verify MPIN
        const isMpinMatch = await bcrypt.compare(mpin, user.mpin);

        if (!isMpinMatch) {
            return res.status(401).json({
                message: 'Invalid MPIN'
            });
        }

        // Add money
        user.balance += amount;
        await user.save();

        // Create transaction
        const transaction = await Transaction.create({
            sender: user._id,
            receiver: user._id,
            amount,
            type: 'ADD_MONEY',
            status: 'COMPLETED'
        });

        res.status(200).json({
            message: 'Money added successfully',
            balance: user.balance,
            transaction
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


// @desc Pay bill using wallet
// @route POST /api/wallet/pay-bill
// @access Private

const payBill = async (req, res) => {
    // #swagger.security = [{ "bearerAuth": [] }]
    try {
        const { billerName, amount, mpin } = req.body;
        const userId = req.user._id;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: 'Amount must be greater than zero'
            });
        }

        if (!mpin) {
            return res.status(400).json({
                message: 'MPIN is required'
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Verify MPIN
        const isMpinMatch = await bcrypt.compare(mpin, user.mpin);

        if (!isMpinMatch) {
            return res.status(401).json({
                message: 'Invalid MPIN'
            });
        }

        // Check balance
        if (user.balance < amount) {
            return res.status(400).json({
                message: 'Insufficient Balance'
            });
        }

        // Deduct money
        user.balance -= amount;
        await user.save();

        // Create transaction
        const transaction = await Transaction.create({
            sender: user._id,
            receiver: user._id,
            amount,
            billerName,
            type: 'BILL_PAYMENT',
            status: 'COMPLETED'
        });

        res.status(200).json({
            message: 'Bill paid successfully',
            balance: user.balance,
            transaction
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


module.exports = {
    addMoney,
    payBill
}; 