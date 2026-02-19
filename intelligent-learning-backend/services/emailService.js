const nodemailer = require("nodemailer");

// Proper Gmail SMTP configuration (very important)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection with Gmail
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ EMAIL LOGIN FAILED:", error);
  } else {
    console.log("✅ EMAIL SERVER READY");
  }
});

// Function to send reminder email
exports.sendReminderEmail = async (to, topicName, action) => {
  try {
    const mailOptions = {
      from: `"Intelligent Learning System" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Study Reminder - Intelligent Learning System",
      html: `
        <h2>📚 Learning Reminder</h2>
        <p>Hello Student,</p>
        <p>You are currently struggling with the topic:</p>
        <h3 style="color:red;">${topicName}</h3>
        <p><b>Recommended Action:</b> ${action}</p>
        <p>Please revise today to improve your performance.</p>
        <br/>
        <small>This is an automated email from Intelligent Learning Difficulty Prediction System</small>
      `,
    };

    // Send mail and print response
    const info = await transporter.sendMail(mailOptions);
    console.log("📨 EMAIL SENT:", info.response);

  } catch (error) {
    console.log("❌ EMAIL SENDING FAILED:", error);
  }
};
