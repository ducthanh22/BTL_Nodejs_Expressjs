const nodemailer = require('nodemailer');

// Tạo một mã OTP ngẫu nhiên
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Thiết lập Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'phithanh365@gmail.com', // Địa chỉ email của bạn
    pass: 'orxx akfv zbqa krjf', // Mật khẩu email của bạn
  },
});

// Gửi mã OTP qua email
const sendOTP = (email, otp) => {
  const mailOptions = {
    from: 'phithanh365@gmail.com',
    to: email,
    subject: 'Xác nhận đăng ký',
    text: `Mã OTP của bạn là: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Sử dụng
const userEmail = 'recipient@example.com'; // Địa chỉ email của người nhận OTP
const otpCode = generateOTP(); // Tạo mã OTP mới
sendOTP(userEmail, otpCode); // Gửi mã OTP
