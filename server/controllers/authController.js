import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'careerorbit_super_secret_jwt_key_2026';

export const registerUser = async (req, res) => {
  const { name, email, password, targetRole, experienceLevel, preferredLocation } = req.body;
  
  const token = jwt.sign(
    { id: 'user-' + Date.now(), name, email, targetRole },
    JWT_SECRET,
    { expiresIn: '30d' }
  );

  res.status(201).json({
    user: {
      id: 'user-' + Date.now(),
      name: name || 'Alex Morgan',
      email,
      targetRole: targetRole || 'Software Engineer',
      experienceLevel: experienceLevel || 'Entry Level / Fresher',
      preferredLocation: preferredLocation || 'Remote',
      streakDays: 7,
      onboardingCompleted: true,
      themePreference: 'dark'
    },
    token
  });
};

export const loginUser = async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign(
    { id: 'user-demo-123', name: 'Alex Morgan', email: email || 'alex@careerorbit.dev', targetRole: 'Software Engineer' },
    JWT_SECRET,
    { expiresIn: '30d' }
  );

  res.json({
    user: {
      id: 'user-demo-123',
      name: 'Alex Morgan',
      email: email || 'alex@careerorbit.dev',
      targetRole: 'Software Engineer / Frontend Specialist',
      experienceLevel: 'Entry Level / Fresher',
      preferredLocation: 'Remote',
      streakDays: 7,
      onboardingCompleted: true,
      themePreference: 'dark'
    },
    token
  });
};

export const getMe = async (req, res) => {
  res.json({
    user: req.user
  });
};
