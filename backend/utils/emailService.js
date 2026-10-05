const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

async function sendReceiptEmail(toEmail, filePath, data) {
    try {
        console.log("📤 Preparing receipt email...");
        console.log("📧 Recipient:", toEmail);
        console.log("📎 Attachment:", filePath);
        console.log("👤 Email user configured:", !!process.env.EMAIL_USER);
        console.log("🔐 Email password configured:", !!process.env.EMAIL_PASS);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        console.log("🔌 Verifying Gmail SMTP connection...");

        await transporter.verify();

        console.log("✅ Gmail SMTP connection verified.");

        const htmlBody = `
            <h3>Your Expense Receipt</h3>
            <p><strong>Amount:</strong> ₹${data.amount}</p>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Category:</strong> ${data.category}</p>
            ${data.note ? `<p><strong>Note:</strong> ${data.note}</p>` : ''}
            <p>Thank you for using our Expense Tracker!</p>
        `;

        console.log("📨 Sending receipt email...");

        const info = await transporter.sendMail({
            from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: 'Your Expense Receipt',
            html: htmlBody,
            attachments: [
                {
                    filename: 'receipt.pdf',
                    path: filePath
                }
            ]
        });

        console.log("✅ Receipt email sent:", info.response);

    } catch (error) {
        console.error("🚨 Receipt email error:");
        console.error("Code:", error.code);
        console.error("Command:", error.command);
        console.error("Response:", error.response);
        console.error("Response Code:", error.responseCode);
        console.error("Message:", error.message);

        throw error;
    }
}

const sendReportEmail = async (toEmail, filePath, range) => {
    try {
        console.log("📤 Preparing email...");

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // your email
                pass: process.env.EMAIL_PASS  // your app password
            }
        });

        const attachment = fs.readFileSync(filePath);
        console.log("📎 Attachment loaded from file path.");

        const info = await transporter.sendMail({
            from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: `Your ${range} Transaction Report`,
            text: `Attached is your ${range} transaction report.`,
            attachments: [
                {
                    filename: `Transaction_Report_${range}.pdf`,
                    content: attachment,
                    contentType: 'application/pdf'
                }
            ]
        });

        console.log("✅ Email sent response:", info.response);
    } catch (err) {
        console.error("🚨 Error sending email:", err);
        throw err;
    }
};

module.exports = { sendReceiptEmail, sendReportEmail };



