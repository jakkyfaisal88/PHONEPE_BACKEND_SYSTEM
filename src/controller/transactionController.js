
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//@desc Send money from one user to another
//@route Post /api /transaction/send
//@access Private
const sendMoney = async (req, res) => {
    // #swagger.security = [{ "bearerAuth": [] }]
    // #swagger.autoHeaders = false
    try {
        const { phone, amount, mpin } = req.body;
        const senderId = req.user._id;

        if (!mpin) {
            return res.status(400).json({ message: 'MPIN is required' });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than zero' });
        }

        const sender = await User.findById(senderId);

        if (!sender) {
            return res.status(404).json({ message: 'Sender not found' });
        }

        const isMpinMatch = await bcrypt.compare(mpin, sender.mpin);

        if (!isMpinMatch) {
            return res.status(401).json({ message: 'Invalid MPIN' });
        }

        // user Id ko phone se find out kr ke laya
        const receiver = await User.findOne({ phone });

        if (!receiver) {
            return res.status(400).json({ message: 'Receiver not found' });
        }

        //if receiver Exixts
        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        //TRANSFER LOGIC
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save();
        await receiver.save();

        const transaction = await Transaction.create({
            sender: sender._id,
            receiver: receiver._id,
            amount,
            type: 'TRANSFER',
            status: 'COMPLETED'
        });

        res.json({
            message: 'Money sent successfully',
            transaction
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


const getTransactionHistory = async (req, res) => {
    // #swagger.security = [{ "bearerAuth": [] }]
    // #swagger.autoHeaders = false
    try {
        const userId = req.user._id;

        const transactions = await Transaction.find({
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        })
            .populate('sender', 'name email phone')
            .populate('receiver', 'name email phone')
            .sort({ timestamp: -1 });

        res.json(transactions);

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


module.exports = {
    sendMoney,
    getTransactionHistory
};

