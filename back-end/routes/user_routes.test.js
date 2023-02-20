const request = require("supertest");
const app  = require("../app");
const Client = require("../models/user");

describe("Routes", () => {
  test("GET /", async () => {
    console.log(app)
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Welcome to ELI5-AI!" });
  });

  test("GET /newsletter", async () => {
    const mockNewsletter = {
      id: 1,
      date_published: "2023-01-24",
      was_sent: true,
      entries: [
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
    };

    jest
      .spyOn(Client, "getCurrentNewsletter")
      .mockImplementation(() => Promise.resolve(mockNewsletter));

    const response = await request(app).get("/newsletter");
    expect(Client.getCurrentNewsletter).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ newsletter: mockNewsletter });
  });
});
