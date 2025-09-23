const nodemailer = require('nodemailer');

const sendMail = async (options) => {
  const isActivation = !!options.activationUrl;
  const isSeller =
    options.subject && options.subject.toLowerCase().includes('seller');
  const entityLabel = isSeller ? 'Seller Account' : 'Account';
  const entityLabelLower = isSeller ? 'seller account' : 'account';

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const mainBg = '#ffffff';
  const headingBg = 'linear-gradient(90deg, #6a11cb, #2575fc)';
  const textColor = '#374151';
  const buttonBg = 'linear-gradient(90deg, #2575fc, #6a11cb)';
  const buttonHover = 'linear-gradient(90deg, #6a11cb, #2575fc)';

  let html;

  if (isActivation) {
    html = `
      <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 40px 0;">
        <div style="max-width: 600px; margin: auto; background: ${mainBg}; border-radius: 10px; box-shadow: 0 4px 16px #0000001a; overflow: hidden;">
          
          <!-- Header -->
          <div style="background: ${headingBg}; padding: 28px 0; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 2rem; letter-spacing: 1px;">
              The Smart Cart
            </h1>
          </div>
          
          <!-- Body -->
          <div style="padding: 36px;">
            <h2 style="color: ${textColor}; margin-top: 0;">Activate your ${entityLabelLower}</h2>
            <p style="color: ${textColor}; font-size: 1rem; line-height: 1.6;">
              Hello <b>${options.name || 'there'}</b>,
            </p>
            <p style="color: ${textColor}; font-size: 1rem; line-height: 1.6;">
              Thank you for registering on our marketplace! Please click the button below 
              to activate your ${entityLabelLower}.
            </p>
            
            <!-- Button -->
            <div style="text-align: center; margin: 36px 0;">
              <a href="${options.activationUrl}"
                style="background: ${buttonBg}; color: #fff; padding: 14px 36px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 1rem; display: inline-block; transition: background 0.3s;"
                onmouseover="this.style.background='${buttonHover}'"
                onmouseout="this.style.background='${buttonBg}'"
              >
                Activate ${entityLabel}
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 0.95rem; line-height: 1.5;">
              If you did not create a ${entityLabelLower}, you can safely ignore this email.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background: #f9fafb; padding: 18px; text-align: center; color: #9ca3af; font-size: 0.9rem; border-top: 1px solid #e5e7eb;">
            &copy; ${new Date().getFullYear()} The Smart Cart. All rights reserved.
          </div>
        </div>
      </div>
    `;
  } else {
    html = `
      <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 40px 0;">
        <div style="max-width: 600px; margin: auto; background: ${mainBg}; border-radius: 10px; box-shadow: 0 4px 16px #0000001a; overflow: hidden;">
          
          <!-- Header -->
          <div style="background: ${headingBg}; padding: 28px 0; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 2rem; letter-spacing: 1px;">
              The Smart Cart
            </h1>
          </div>
          
          <!-- Body -->
          <div style="padding: 36px;">
            <p style="color: ${textColor}; font-size: 1rem; line-height: 1.6;">
              ${options.message}
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background: #f9fafb; padding: 18px; text-align: center; color: #9ca3af; font-size: 0.9rem; border-top: 1px solid #e5e7eb;">
            &copy; ${new Date().getFullYear()} The Smart Cart. All rights reserved.
          </div>
        </div>
      </div>
    `;
  }

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message || options.text,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
