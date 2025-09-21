// utils/sendMail.js
const SibApiV3Sdk = require('sib-api-v3-sdk');

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendMail(options) {
  const isActivation = !!options.activationUrl;
  const isSeller =
    options.subject && options.subject.toLowerCase().includes('seller');
  const entityLabel = isSeller ? 'Seller Account' : 'Account';
  const entityLabelLower = isSeller ? 'seller account' : 'account';

  const mainGradient = 'linear-gradient(90deg, #3b82f6 0%, #a78bfa 100%)';
  const buttonGradient = 'linear-gradient(90deg, #3b82f6 0%, #a78bfa 100%)';

  let html;
  if (isActivation) {
    html = `
      <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 40px 0;">
        <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px #0001; overflow: hidden;">
          <div style="background: ${mainGradient}; padding: 28px 0; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 2rem;">The Smart Cart</h1>
          </div>
          <div style="padding: 32px;">
            <h2 style="color: #3b82f6; margin-top: 0;">Activate your ${entityLabelLower}</h2>
            <p>Hello <b>${options.name || 'there'}</b>,</p>
            <p>Welcome to our marketplace 🎉 Click below to activate your ${entityLabelLower}:</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${options.activationUrl}"
                 style="background: ${buttonGradient}; color: #fff; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: bold;">
                 Activate ${entityLabel}
              </a>
            </div>
            <p>If you did not create a ${entityLabelLower}, you can safely ignore this email.</p>
          </div>
          <div style="background: #f3f4f6; padding: 16px; text-align: center; font-size: 0.9rem; color: #9ca3af;">
            &copy; ${new Date().getFullYear()} The Smart Cart. All rights reserved.
          </div>
        </div>
      </div>
    `;
  } else {
    html = options.html || `<p>${options.message}</p>`;
  }

  const emailData = new SibApiV3Sdk.SendSmtpEmail();
  emailData.sender = {
    email: process.env.BREVO_FROM_EMAIL,
    name: process.env.BREVO_FROM_NAME || 'Your App',
  };
  emailData.to = [{ email: options.email }];
  emailData.subject = options.subject;
  emailData.htmlContent = html;

  try {
    const result = await tranEmailApi.sendTransacEmail(emailData);
    console.log('✅ Email sent:', result.messageId || result);
    return result;
  } catch (error) {
    console.error('❌ Email failed:', error.response?.text || error.message);
    throw new Error('Email sending failed');
  }
}

module.exports = sendMail;
