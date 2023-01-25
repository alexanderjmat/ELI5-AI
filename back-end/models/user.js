const db = require("../db");
const axios = require("axios");

class Client {
  static async getCurrentNewsletter() {
    try {
      const newsletter = await db.query(
        "SELECT newsletter.*, json_agg(newsletter_entries.*) as entries, json_agg(news_articles.*) as articles FROM newsletter LEFT JOIN news_articles ON newsletter.id = news_articles.newsletter_id LEFT JOIN newsletter_entries ON news_articles.id = newsletter_entries.news_articles_id WHERE newsletter.was_sent = true GROUP BY newsletter.id"
      );
      return newsletter.rows[0];
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
}

module.exports = Client;
