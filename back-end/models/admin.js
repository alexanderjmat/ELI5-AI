const db = require("../db");
const axios = require("axios");
const OpenAI = require("../models/openai");

class Admin {
  static async fetchNewsData() {
    try {
      const date = new Date().toISOString().slice(0, 10);
      const createNewsletter = await db.query(
        "INSERT INTO newsletter (date_published) VALUES ($1) RETURNING id, date_published",
        [date]
      );
      const newsletterId = createNewsletter.rows[0].id;
      const response = await axios.get(
        `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API_KEY}&keywords=AI&categories=technology&languages=en&sort=published_desc&limit=8`
      );
      const rawData = response.data.data;

      const insertPromises = rawData.map(async (entry) => {
        const published = new Date(entry.published_at)
          .toISOString()
          .slice(0, 10);
        const checkIfURLExists = await db.query(
          "SELECT url FROM news_articles WHERE url=$1",
          [entry.url]
        );
        if (checkIfURLExists.rowCount > 0) return;
        return db.query(
          "INSERT INTO news_articles (title, url, date_published, newsletter_id) VALUES ($1, $2, $3, $4)",
          [entry.title, entry.url, published, newsletterId]
        );
      });
      await Promise.all(insertPromises);

      const currentEdition = await db.query(
        "SELECT newsletter.*, json_agg(news_articles.*) as articles FROM newsletter LEFT JOIN news_articles ON newsletter.id = news_articles.newsletter_id WHERE newsletter.id=$1 GROUP BY newsletter.id",
        [newsletterId]
      );
      return currentEdition.rows;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  static async generateNewsletter() {
    try {
      const date = new Date().toISOString().slice(0, 10);
      const currentEdition = await db.query(
        "SELECT newsletter.*, json_agg(news_articles.*) as articles FROM newsletter LEFT JOIN news_articles ON newsletter.id = news_articles.newsletter_id WHERE newsletter.date_published=$1 GROUP BY newsletter.id",
        [date]
      );
      const id = currentEdition.rows[0].id;
      const articles = currentEdition.rows[0].articles;
      const generations = articles.map(async (article) => {
        const headline = await OpenAI.generateHeadline(article.title);
        const summary = await OpenAI.generateSummary(article.url);
        return db.query(
          "INSERT INTO newsletter_entries (news_articles_id, newsletter_id, title, article, url, date_sent) VALUES ($1, $2, $3, $4, $5, $6)",
          [article.id, id, headline, summary, article.url, date]
        );
      });
      await Promise.all(generations);

      const newsletter = await db.query(
        "SELECT newsletter.*, json_agg(newsletter_entries.*) as entries, json_agg(news_articles.*) as articles FROM newsletter LEFT JOIN news_articles ON newsletter.id = news_articles.newsletter_id LEFT JOIN newsletter_entries ON news_articles.id = newsletter_entries.news_articles_id WHERE newsletter.id=$1 GROUP BY newsletter.id",
        [id]
      );
      return newsletter.rows;
    } catch (e) {
      return e;
    }
  }

  static async getNewsletters() {
    try {
      const newsletters = await db.query(
        "SELECT newsletter.*, json_agg(newsletter_entries.*) as entries, json_agg(news_articles.*) as articles FROM newsletter LEFT JOIN news_articles ON newsletter.id = news_articles.newsletter_id LEFT JOIN newsletter_entries ON news_articles.id = newsletter_entries.news_articles_id GROUP BY newsletter.id"
      );
      return newsletters.rows;
    } catch (e) {
      return e;
    }
  }

  static async getNewsletter(id) {
    try {
      const newsletter = await db.query(
        "SELECT newsletter.*, json_agg(newsletter_entries.*) as entries, json_agg(news_articles.*) as articles FROM newsletter LEFT JOIN news_articles ON newsletter.id = news_articles.newsletter_id LEFT JOIN newsletter_entries ON news_articles.id = newsletter_entries.news_articles_id WHERE newsletter.id=$1 GROUP BY newsletter.id",
        [id]
      );
      return newsletter.rows[0];
    } catch (e) {
      return e;
    }
  }

  static async publishNewsletter(id) {
    try {
      const publishNewsletter = await db.query(
        "UPDATE newsletter SET was_sent = true WHERE id = $1;",
        [id]
      );
      const publishArticles = await db.query(
        "UPDATE news_articles SET was_sent = true FROM newsletter WHERE newsletter.id = news_articles.newsletter_id AND newsletter.id = $1;",
        [id]
      );
      const publishEntries = await db.query(
        "UPDATE newsletter_entries SET was_sent = true FROM news_articles WHERE news_articles.id = newsletter_entries.news_articles_id AND news_articles.newsletter_id = $1;",
        [id]
      );
      const newsletter = await db.query(
        "SELECT newsletter.*, json_agg(newsletter_entries.*) as entries, json_agg(news_articles.*) as articles FROM newsletter LEFT JOIN news_articles ON newsletter.id = news_articles.newsletter_id LEFT JOIN newsletter_entries ON news_articles.id = newsletter_entries.news_articles_id WHERE newsletter.id=$1 GROUP BY newsletter.id",
        [id]
      );
      return newsletter.rows[0];
    } catch (e) {
      return e;
    }
  }

  static async deleteNewsletter(id) {
    try {
      const newsletter = await db.query(
        "DELETE FROM newsletter, newsletter_entries, news_articles USING newsletter LEFT JOIN news_articles ON newsletter.id = news_articles.newsletter_id LEFT JOIN newsletter_entries ON news_articles.id = newsletter_entries.news_articles_id WHERE newsletter.id=$1",
        [id]
      );
    } catch (e) {
      return e;
    }
  }
}

module.exports = Admin;
