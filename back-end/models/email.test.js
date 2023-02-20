const Email = require('./email');
const nodemailer = require('nodemailer');
const db = require('../db');

jest.mock('nodemailer');

describe('Email', () => {
  const fakeTransporter = {
    sendMail: jest.fn(),
  };
  nodemailer.createTransport.mockReturnValue(fakeTransporter);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendConfirmationEmail', () => {
    it('should send a confirmation email', async () => {
      const email = 'test@example.com';
      const code = '12345';
      await Email.sendConfirmationEmail(email, code);

      expect(nodemailer.createTransport).toHaveBeenCalledWith({
        service: 'gmail',
        auth: {
          user: 'ELI5.AI.News@gmail.com',
          pass: process.env.MAIL_PASSWORD,
        },
      });

      expect(fakeTransporter.sendMail).toHaveBeenCalledWith({
        from: '"ELI5-AI 💻 🧠" <ELI5.AI.News@gmail.com>',
        to: email,
        subject: 'ELI5-AI: Confirm Subscription',
        html: expect.stringContaining(`${URL}confirm-email?code=${code}`),
      });
    });
  });

  describe('unsubscribe', () => {
    it('should mark the subscriber as unsubscribed', async () => {
      const code = '12345';
      const mockQueryResult = {
        rows: [{ confirmation_code: code }],
      };
      db.query.mockResolvedValueOnce(mockQueryResult);
      db.query.mockResolvedValueOnce({});

      const result = await Email.unsubscribe(code);

      expect(db.query).toHaveBeenCalledWith(
        'SELECT * FROM subscribers WHERE confirmation_code = $1',
        [code],
      );

      expect(db.query).toHaveBeenCalledWith(
        'UPDATE subscribers SET subscription_status = false WHERE confirmation_code = $1',
        [code],
      );

      expect(result).toBeUndefined();
    });

    it('should return false if the confirmation code is invalid', async () => {
      const code = '12345';
      const mockQueryResult = {
        rows: [],
      };
      db.query.mockResolvedValueOnce(mockQueryResult);

      const result = await Email.unsubscribe(code);

      expect(db.query).toHaveBeenCalledWith(
        'SELECT * FROM subscribers WHERE confirmation_code = $1',
        [code],
      );

      expect(db.query).not.toHaveBeenCalledWith(
        'UPDATE subscribers SET subscription_status = false WHERE confirmation_code = $1',
        [code],
      );

      expect(result).toBe(false);
    });
  });
});