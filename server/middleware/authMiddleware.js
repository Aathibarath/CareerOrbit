import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'careerorbit_super_secret_jwt_key_2026';

export const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token || token === 'demo-token') {
    // Provide default demo user context
    req.user = {
      id: 'demo-user-123',
      name: 'Alex Morgan',
      email: 'alex@careerorbit.dev',
      targetRole: 'Software Engineer / Frontend Specialist',
    };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Graceful fallback to demo user if token expired/invalid in dev
    req.user = {
      id: 'demo-user-123',
      name: 'Alex Morgan',
      email: 'alex@careerorbit.dev',
      targetRole: 'Software Engineer',
    };
    next();
  }
};
