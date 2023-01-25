const assert = require("assert");
const db = require("../db");
const Admin = require("../models/admin");

describe("Admin", () => {
  beforeEach(async () => {
    await db.query(`INSERT INTO newsletter (date_published, was_sent) 
                        VALUES ('03-12-2023', false)`);
    await db.query(`INSERT INTO news_articles (title, url, date_published, newsletter_id, was_sent)
                        VALUES ('Test Article', 'www.testedarticle.com', '03-12-2023', 1, false)`);
    await db.query(`INSERT INTO newsletter_entries (news_articles_id, newsletter_id, title, article, url, date_sent, was_sent)
                        VALUES (1, 1, 'Test Entry for Test Article', 'This is a test entry for the test article', 'www.testedarticle.com', 1, false)`);
  });

  afterEach(async () => {
    await db.query(`DELETE FROM newsletter WHERE date_published='03-12-2023'`);
    await db.query(`DELETE FROM news_articles WHERE title='Test Article'`);
    await db.query(`DELETE FROM newsletter_entries where title='Test Entry for Test Article'`);
  });

  describe("getNewsletters()", () => {
    it("should return an array of newsletters", async () => {
      const newsletters = await Admin.getNewsletters();
      assert.equal(Array.isArray(newsletters), true);
      assert.equal(newsletters.length, 1);
      assert.equal(newsletters[0].title, "Test Newsletter");
      assert.equal(newsletters[0].entries.length, 1);
      assert.equal(newsletters[0].articles.length, 1);
    });
  });

  describe("getNewsletter()", () => {
    it("should return a single newsletter", async () => {
      const newsletter = await Admin.getNewsletter(1);
      assert.equal(newsletter.title, "Test Newsletter");
      assert.equal(newsletter.entries.length, 1);
      assert.equal(newsletter.articles.length, 1);
    });
  });

  describe("publishNewsletter()", () => {
    it("should update the was_sent column to true for the newsletter and its related articles and entries", async () => {
      const newsletter = await Admin.publishNewsletter(1);
      assert.equal(newsletter.was_sent, true);
      assert.equal(newsletter.entries[0].was_sent, true);
      assert.equal(newsletter.articles[0].was_sent, true);
    });
  });

  describe("deleteNewsletter()", () => {
    it("should delete the newsletter, its related articles, and its related entries", async () => {
      await Admin.deleteNewsletter(1);
      const newsletters = await Admin.getNewsletters();
      assert.equal(newsletters.length, 0);
    });
  });
});
