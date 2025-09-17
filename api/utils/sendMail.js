// Utility to send styled emails (activation, notifications) using nodemailer
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

  const mainGradient = 'linear-gradient(90deg, #3b82f6 0%, #a78bfa 100%)';
  const buttonGradient = 'linear-gradient(90deg, #3b82f6 0%, #a78bfa 100%)';

  let html;
  if (isActivation) {
    html = `
      <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 40px 0;">
        <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px #0001; overflow: hidden;">
          <div style="background: ${mainGradient}; padding: 28px 0; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 2rem; letter-spacing: 1px;">The Smart Cart</h1>
          </div>
          <div style="padding: 32px;">
            <h2 style="color: #3b82f6; margin-top: 0; font-size: 1.3rem;">Activate your ${entityLabelLower}</h2>
            <p style="color: #374151; font-size: 1rem;">
              Hello <b>${options.name || 'there'}</b>,
            </p>
            <p style="color: #374151; font-size: 1rem;">
              Welcome to our marketplace! 🎉 Click below to activate your ${entityLabelLower}.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${options.activationUrl}"
                style="background: ${buttonGradient}; color: #fff; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: bold; font-size: 1rem; display: inline-block; box-shadow: 0 2px 8px #a78bfa33; transition: filter 0.2s; letter-spacing: 0.5px;"
                onmouseover="this.style.filter='brightness(0.95)'"
                onmouseout="this.style.filter='none'"
              >
                Activate ${entityLabel}
              </a>
            </div>
            <p style="color: #6b7280; font-size: 0.95rem;">
              If you did not create a ${entityLabelLower}, you can safely ignore this email.
            </p>
          </div>
          <div style="background: #f3f4f6; padding: 16px; text-align: center; color: #9ca3af; font-size: 0.9rem;">
            &copy; ${new Date().getFullYear()} The Smart Cart. All rights reserved worldwide.
          </div>
        </div>
      </div>
    `;
  } else {
    html = `
      <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 40px 0;">
        <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px #0001; overflow: hidden;">
          <div style="background: ${mainGradient}; padding: 28px 0; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 2rem; letter-spacing: 1px;">The Smart Cart</h1>
          </div>
          <div style="padding: 32px;">
            <p style="color: #374151; font-size: 1rem;">
              ${options.message}
            </p>
            ${
              options.buttonUrl
                ? `<div style=\"text-align: center; margin: 32px 0;\"><a href=\"${
                    options.buttonUrl
                  }\" style=\"background: ${buttonGradient}; color: #fff; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: bold; font-size: 1rem; display: inline-block; box-shadow: 0 2px 8px #a78bfa33; transition: filter 0.2s; letter-spacing: 0.5px;\" onmouseover=\"this.style.filter='brightness(0.95)'\" onmouseout=\"this.style.filter='none'\">${
                    options.buttonText || 'View Details'
                  }</a></div>`
                : ''
            }
          </div>
          <div style="background: #f3f4f6; padding: 16px; text-align: center; color: #9ca3af; font-size: 0.9rem;">
            &copy; ${new Date().getFullYear()} The Smart Cart. All rights reserved worldwide.
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
