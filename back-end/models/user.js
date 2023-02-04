const db = require("../db");
const axios = require("axios");
const md5 = require("md5")
const nodemailer = require("nodemailer")
const crypto = require("crypto")
const Email = require("./email")

class Client {
  static async getCurrentNewsletter() {
    try {
      const newsletter = await db.query(
        "SELECT newsletter.*, json_agg(newsletter_entries.*) as entries, json_agg(news_articles.*) as articles, json_agg(overviews.*) as overviews FROM newsletter LEFT JOIN news_articles ON newsletter.id = news_articles.newsletter_id LEFT JOIN newsletter_entries ON news_articles.id = newsletter_entries.news_articles_id LEFT JOIN overviews ON newsletter.id = overviews.newsletter_id WHERE newsletter.was_sent = true GROUP BY newsletter.id"
      );
      return newsletter.rows[newsletter.rows.length - 1];
    } catch (e) {
      return e;
    }
  }

  static async getNewsletters() {
    try {
      const newsletters = await db.query(
        "SELECT newsletter.*, json_agg(newsletter_entries.*) as entries, json_agg(news_articles.*) as articles FROM newsletter LEFT JOIN news_articles ON newsletter.id = news_articles.newsletter_id LEFT JOIN newsletter_entries ON news_articles.id = newsletter_entries.news_articles_id WHERE newsletter.was_sent = true GROUP BY newsletter.id"
      );
      return newsletters.rows;
    } catch (e) {
      return e;
    }
  }

  static async subscribe(email) {
    try {
      const code = crypto.randomBytes(64).toString('hex').slice(0, 64)
      const query = await db.query("SELECT * FROM subscribers WHERE email = $1", [email]);
      if (query.rows[0] && query.rows[0].subscription_status == true) {
        return false
      } else if (query.rows[0] && query.rows[0].subscription_status == false) {
        const sendConfirmationEmail = await Email.sendConfirmationEmail(email, query.rows[0].confirmation_code) 
        return true
      } else {
        const subscribe = await db.query("INSERT INTO subscribers (email, confirmation_code) VALUES ($1, $2)", [email, code])
        const sendConfirmationEmail = await Email.sendConfirmationEmail(email, code)
        return true
      }
    } catch(e) {
      return e
    }
  }

  static async confirmSubscription(code) {
    try {
      const request = await db.query("SELECT * FROM subscribers WHERE confirmation_code=$1", [code])
      if (request.rows[0] && request.rows[0].subscription_status == false) {
        const email = request.rows[0].email;
        const updateSubscriber = await db.query("UPDATE subscribers SET subscription_status = true WHERE email=$1", [email])
        return request.rows[0].email
      } else return false;
    } catch(e) {
      return e
    }
  }
}

module.exports = Client;
