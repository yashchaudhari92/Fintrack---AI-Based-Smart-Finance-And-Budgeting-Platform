const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const dashboardRoutes = require("./routes/dashboardRoutes");
const extractRoute = require('./routes/extractRoute');
const emailReceipt = require('./routes/emailReceipt');
const reportRoute = require('./routes/reportRoute');
const budgetAIRoute = require('./routes/budgetAI');
const questionRoute = require('./routes/questionRoute');

// const bodyParser = require('body-parser');


dotenv.config(); 
const port = process.env.PORT;

main().then(() => {
    console.log("Successfully Connected to Database");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
};

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', transactionRoutes);
app.use('/api', reportRoute);
app.use('/api', extractRoute);
app.use('/api', emailReceipt);
app.use('/api', budgetAIRoute);
app.use('/api', questionRoute);
app.use('/api/budget', budgetRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.get("/api", (req, res) => {
    res.json({ message: "Welcome to Smart Finance API 🚀" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});