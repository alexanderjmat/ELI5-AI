const request = require("supertest");
const app = require("../app");
const Client = require("./user");
const db = require("../db");

describe("Client", () => {
  describe("getCurrentNewsletter()", () => {
    it("should return the current newsletter from the database", async () => {
      // mock the db.query function to return a predetermined result
      const mockQuery = jest.fn().mockResolvedValue({
        rows: [
          {
            id: 8,
            news_articles_id: 6,
            newsletter_id: 1,
            title:
              "Revolutionize Generative AI with PhotoRoom: Join Our Fullstack Engineering Team in Paris",
            article:
              "PhotoRoom is a fast-growing startup based in San Francisco, and they are looking for a full-time Senior Software Engineer. The ideal candidate has extensive experience in distributed systems, cloud computing, and data engineering. They will be responsible for developing, deploying, and maintaining solutions for a variety of cloud platforms. In addition, they should be able to collaborate with other engineers to design and implement solutions. This position offers an opportunity to work in a fast-paced environment and to be part of a team that is dedicated to creating innovative solutions. If you have the skills and experience to join the PhotoRoom team, apply now!",
            url: "https://jobs.lever.co/photoroom/29260c53-a84f-4d4f-a322-3bdc8540cdb7?lever-origin=applied&lever-source%5B%5D=yc",
            date_sent: "2023-01-24",
            was_sent: true,
          },
        ],
      });
      db.query = mockQuery;

      const result = await Client.getCurrentNewsletter();
      expect(result).toEqual({
        id: 8,
        news_articles_id: 6,
        newsletter_id: 1,
        title:
          "Revolutionize Generative AI with PhotoRoom: Join Our Fullstack Engineering Team in Paris",
        article:
          "PhotoRoom is a fast-growing startup based in San Francisco, and they are looking for a full-time Senior Software Engineer. The ideal candidate has extensive experience in distributed systems, cloud computing, and data engineering. They will be responsible for developing, deploying, and maintaining solutions for a variety of cloud platforms. In addition, they should be able to collaborate with other engineers to design and implement solutions. This position offers an opportunity to work in a fast-paced environment and to be part of a team that is dedicated to creating innovative solutions. If you have the skills and experience to join the PhotoRoom team, apply now!",
        url: "https://jobs.lever.co/photoroom/29260c53-a84f-4d4f-a322-3bdc8540cdb7?lever-origin=applied&lever-source%5B%5D=yc",
        date_sent: "2023-01-24",
        was_sent: true,
      });
      expect(mockQuery).toHaveBeenCalledWith(
        "SELECT newsletter.*, json_agg(newsletter_entries.*) as entries, json_agg(news_articles.*) as articles FROM newsletter LEFT JOIN news_articles ON newsletter.id = news_articles.newsletter_id LEFT JOIN newsletter_entries ON news_articles.id = newsletter_entries.news_articles_id WHERE newsletter.was_sent = true GROUP BY newsletter.id"
      );
    });

    it("should return an error if there is a problem with the query", async () => {
      // mock the db.query function to return a rejected promise
      const mockQuery = jest.fn().mockRejectedValue(new Error("Query failed"));
      db.query = mockQuery;

      const result = await Client.getCurrentNewsletter();
      expect(result).toEqual(new Error("Query failed"));
    });
  });

  describe("getNewsletters()", () => {
    it("should return all newsletters from the database", async () => {
      // mock the db.query function to return a predetermined result
      const mockQuery = jest.fn().mockResolvedValue({
        rows: [
          { id: 1, title: "Newsletter 1" },
          { id: 2, title: "Newsletter 2" },
        ],
      });
      db.query = mockQuery;

      const result = await Client.getNewsletters();
      expect(result).toEqual([
        { id: 1, title: "Newsletter 1" },
        { id: 2, title: "Newsletter 2" },
      ]);
      expect(mockQuery).toHaveBeenCalledWith(
        "SELECT newsletter.*, json_agg(newsletter_entries.*) as entries, json_agg(news_articles.*) as articles FROM newsletter LEFT JOIN news_articles ON newsletter.id = news_articles.newsletter_id LEFT JOIN newsletter_entries ON news_articles.id = newsletter_entries.news_articles_id WHERE newsletter.was_sent = true GROUP BY newsletter.id"
      );
    });
  });
});
