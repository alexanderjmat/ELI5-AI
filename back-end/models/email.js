const nodemailer = require("nodemailer");
const db = require("../db")
const URL = "http://localhost:3000"

class Email {
  static async sendConfirmationEmail(email, code) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ELI5.AI.News@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let template = (
      `<div style={{"display": "flex", "flexDirection": "column"}}>
        <h1>Confirm your subscription to ELI5-AI below!</h1>
        <a href="${URL}/confirm-email?code=${code}"><button>Subscribe</button></a>
        <p>
          If you did not sign up to receive email from ELI5-AI, you can just
          ignore this message.
        </p>
      </div>`
    );

    let info = await transporter.sendMail({
      from: '"ELI5-AI 💻 🧠" <ELI5.AI.News@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "ELI5-AI: Confirm Subscription", // Subject link
      html: template, // html body
    });
  }

  static async unsubscribe(code) {
    const request = await db.query("SELECT * FROM subscribers WHERE confirmation_code = $1", [code])
    if (request.rows[0]) {
      const unsubscribe = db.query("UPDATE subscribers SET subscription_status = false WHERE confirmation_code = $1", [code])
    } else return false;
  } 
}

module.exports = Email;
