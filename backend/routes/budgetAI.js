const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require('dotenv');

dotenv.config();
const API_KEY_G = process.env.API_KEY;

router.post("/ai-budget-suggestion", async (req, res) => {
    const { income, fixedExpenses, variableExpenses } = req.body;

    const prompt = `
User has a monthly income of ₹${income}.
Fixed expenses: ₹${fixedExpenses}, Variable expenses: ₹${variableExpenses}.
Suggest a monthly budget plan using categories: Needs, Wants, Savings.
Give a JSON output like:
{
  "budget": {
    "Needs": "...",
    "Wants": "...",
    "Savings": "..."
  },
  "advice": "..."
}
`;

    try {
        const geminiRes = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${API_KEY_G}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            }
        );

        const text = geminiRes.data.candidates[0].content.parts[0].text;

        // Ensure it's valid JSON before parsing
        const jsonStart = text.indexOf("{");
        const jsonEnd = text.lastIndexOf("}") + 1;
        const cleanJSON = text.slice(jsonStart, jsonEnd);

        const data = JSON.parse(cleanJSON);
        res.json(data);

    } catch (err) {
        console.error("Gemini API Error:", err.response?.data || err.message);
        res.status(500).json({ error: "Failed to fetch budget suggestion" });
    }
});

module.exports = router;