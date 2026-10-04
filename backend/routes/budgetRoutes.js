const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const Transaction = require('../models/transaction');
const { verifyToken } = require('../middleware/authMiddleware');

// Helper to format YYYY-MM
function getMonthString(date = new Date()) {
  return date.toISOString().slice(0, 7);
}

// Set or Update Budget
router.post('/set', verifyToken, async (req, res) => {
  let { month, amount } = req.body;
  const userId = req.userId;

  if (!amount) {
    return res.status(400).json({ message: 'Amount is required' });
  }

  if (!month) {
    month = getMonthString();
  }

  try {
    const existing = await Budget.findOne({ userId, month });
    if (existing) {
      existing.amount = amount;
      await existing.save();
      return res.json({ message: 'Budget updated successfully.' });
    }
    await Budget.create({ userId, amount, month });
    res.json({ message: 'Budget set successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Budget and Remaining
router.get('/:month', verifyToken, async (req, res) => {
  const month = req.params.month || getMonthString();
  const userId = req.userId;

  try {
    const budget = await Budget.findOne({ userId, month });
    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    const startDate = new Date(`${month}-01T00:00:00Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const expenses = await Transaction.aggregate([
      {
        $match: {
          userId: budget.userId,
          type: 'expense',
          date: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const spent = expenses.length > 0 ? expenses[0].total : 0;
    const remaining = budget.amount - spent;

    res.json({
      month: budget.month,
      amount: budget.amount,
      spent,
      remaining
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
