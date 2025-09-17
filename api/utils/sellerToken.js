// Utility to send seller JWT token in HTTP-only cookie for authentication
const sendSellerToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };

  res.status(statusCode).cookie('seller_token', token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendSellerToken;
