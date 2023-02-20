const middleware = require('./auth');
const jwt = require('jsonwebtoken');

describe('authenticate middleware', () => {
  const req = {
    body: {
      username: 'test_user',
      password: 'test_password',
    },
    session: {},
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set admin_token in session and call next when username and password are correct', () => {
    process.env.USERNAME = 'test_user';
    process.env.SECRET_KEY = 'test_secret';

    middleware.authenticate(req, res, next);

    expect(req.session.admin_token).toBeDefined();
    expect(jwt.verify(req.session.admin_token, process.env.SECRET_KEY)).toEqual('test_user');
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 error when username or password is incorrect', () => {
    process.env.USERNAME = 'test_user';
    process.env.SECRET_KEY = 'test_secret';
    req.body.username = 'wrong_user';

    middleware.authenticate(req, res, next);

    expect(req.session.admin_token).not.toBeDefined();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid username or password' });
    expect(next).not.toHaveBeenCalled();
  });

  afterEach(() => {
    delete process.env.USERNAME;
    delete process.env.SECRET_KEY;
  });
});

describe('ensureAdmin middleware', () => {
  const req = {
    headers: {},
    session: {},
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 error when neither cookie nor session exists', () => {
    middleware.ensureAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'unauthorized' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next when valid cookie exists', () => {
    const token = jwt.sign('test_user', 'test_secret');
    req.headers.authorization = token;

    middleware.ensureAdmin(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(token, process.env.SECRET_KEY);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should call next when valid session exists', () => {
    const token = jwt.sign('test_user', 'test_secret');
    req.session.admin_token = token;

    middleware.ensureAdmin(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(token, process.env.SECRET_KEY);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should return 401 error when cookie is invalid', () => {
    const token = jwt.sign('test_user', 'test_secret');
    req.headers.authorization = token;
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    middleware.ensureAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'unauthorized' });
    expect(next).not.toHaveBeenCalled();
  });
})