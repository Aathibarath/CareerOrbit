import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'careerorbit_super_secret_jwt_key_2026';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, targetRole, experienceLevel, preferredLocation } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (req.dbConnected) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        password: hashedPassword,
        targetRole: targetRole || 'Software Engineer',
        experienceLevel: experienceLevel || 'Entry Level / Fresher',
        preferredLocation: preferredLocation || 'Remote / Hybrid',
        onboardingCompleted: true
      });

      const token = jwt.sign(
        { id: user._id.toString(), name: user.name, email: user.email, targetRole: user.targetRole },
        JWT_SECRET,
        { expiresIn: '30d' }
      );

      return res.status(201).json({
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          targetRole: user.targetRole,
          experienceLevel: user.experienceLevel,
          preferredLocation: user.preferredLocation,
          streakDays: user.streakDays,
          onboardingCompleted: user.onboardingCompleted,
          themePreference: user.themePreference
        },
        token
      });
    }

    // In-memory fallback mode
    const token = jwt.sign(
      { id: 'user-' + Date.now(), name, email, targetRole },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.status(201).json({
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
  } catch (error) {
    console.error('[Auth Register Error]', error);
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (req.dbConnected) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      if (password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
      }

      const token = jwt.sign(
        { id: user._id.toString(), name: user.name, email: user.email, targetRole: user.targetRole },
        JWT_SECRET,
        { expiresIn: '30d' }
      );

      return res.json({
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          targetRole: user.targetRole,
          experienceLevel: user.experienceLevel,
          preferredLocation: user.preferredLocation,
          streakDays: user.streakDays,
          onboardingCompleted: user.onboardingCompleted,
          themePreference: user.themePreference
        },
        token
      });
    }

    // In-memory fallback mode
    const token = jwt.sign(
      { id: 'user-demo-123', name: 'Alex Morgan', email: email || 'alex@careerorbit.dev', targetRole: 'Software Engineer' },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.json({
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
  } catch (error) {
    console.error('[Auth Login Error]', error);
    res.status(500).json({ message: error.message || 'Login failed' });
  }
};

export const getMe = async (req, res) => {
  try {
    if (req.dbConnected && req.user && req.user.id && !req.user.id.startsWith('demo-') && !req.user.id.startsWith('user-demo-')) {
      const user = await User.findById(req.user.id).select('-password');
      if (user) {
        return res.json({
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            targetRole: user.targetRole,
            experienceLevel: user.experienceLevel,
            preferredLocation: user.preferredLocation,
            streakDays: user.streakDays,
            onboardingCompleted: user.onboardingCompleted,
            themePreference: user.themePreference
          }
        });
      }
    }

    res.json({
      user: req.user
    });
  } catch (error) {
    res.json({ user: req.user });
  }
};

