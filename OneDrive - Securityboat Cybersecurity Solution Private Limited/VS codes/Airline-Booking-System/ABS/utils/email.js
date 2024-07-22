const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Send verification email
const sendVerificationEmail = async (user) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Generate a verification token
  const token = crypto.randomBytes(32).toString('hex');
  user.verificationToken = token;
  await user.save();

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: 'noreply@example.com',
    to: user.email,
    subject: 'Verify your email',
    text: `Hello ${user.username}, please verify your email by clicking the following link: ${verificationUrl}`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
