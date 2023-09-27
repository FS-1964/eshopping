import { google } from "googleapis";

var nodemailer = require("nodemailer");
const CLIENT_ID: string = 'YOUR CLIENT ID';
const CLEINT_SECRET: string = 'YOUR CLIENT SECRET';
const REDIRECT_URI: string = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN: string = 'YOUR REFRESH TOKEN';

const oAuth2Client = new google.auth.OAuth2(
CLIENT_ID,
CLEINT_SECRET,
REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(): Promise<any> {
try {
  const accessToken = await oAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'yours authorised email address',
      clientId: CLIENT_ID,
      clientSecret: CLEINT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: 'SENDER NAME <yours authorised email address@gmail.com>',
    to: 'to email address here',
    subject: 'Hello from gmail using API',
    text: 'Hello from gmail email using API',
    html: '<h1>Hello from gmail email using API</h1>',
  };

  const result = await transport.sendMail(mailOptions);
  return result;
} catch (error) {
  return error;
}
}

sendMail()
.then((result) => console.log('Email sent...', result))
.catch((error) => console.log(error.message));
