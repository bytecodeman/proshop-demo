import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(
  __dirname,
  process.env.MAILER_HOST,
  process.env.MAILER_PORT,
  process.env.MAILER_USER,
  process.env.MAILER_PASS
);

const transport = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

const mailOptions = {
  from: '"Example Team" <tonysilvestri@bytecodeman.com>',
  to: "silvestri@stcc.edu, tonysilvestri@bytecodeman.com",
  subject: "Nice Nodemailer test",
  text: "Hey there, it’s our first message sent with Nodemailer ",
  html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br /><img src="cid:uniq-mailtrap.png" alt="mailtrap" />',
  attachments: [
    {
      filename: "mailtrap-logo.svg",
      path: __dirname + "/images/mailtrap-logo.svg",
      cid: "uniq-mailtrap-logo.svg",
    },
  ],
};

transport.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("Message sent: %s", info.messageId);
});
