import { AIService } from '../services/AIService.js';
import { initialApplications } from '../services/DemoSeedService.js';

export const getInsights = async (req, res) => {
  const result = await AIService.analyzeApplications(initialApplications);
  res.json(result);
};

export const generateFollowUp = async (req, res) => {
  const result = await AIService.generateFollowUp(req.body);
  res.json(result);
};

export const analyzeResumeMatch = async (req, res) => {
  const { resumeText, jobDescription } = req.body;
  const result = await AIService.resumeMatchAnalysis({ resumeText, jobDescription });
  res.json(result);
};

export const askCopilot = async (req, res) => {
  const { prompt } = req.body;
  const queryLower = (prompt || '').toLowerCase();

  let answer = "Based on your active job search data, you are currently tracking active applications across top tech companies.";
  let actions = ['How should I prepare for a React interview?', 'I have an interview tomorrow. What should I do?', 'How do I follow up with a recruiter?'];

  if (queryLower.includes('react') || queryLower.includes('frontend')) {
    answer = `To prepare thoroughly for a React & Frontend interview:\n\n1. React Fundamentals: Master Virtual DOM, JSX, components & props.\n2. Hooks Deep-Dive: Understand useState, useEffect, useMemo, useCallback, useRef, and custom hooks.\n3. Component Lifecycle & State Management: Review local vs global state (Redux/Context API).\n4. REST API Integration: Practice fetching data, handling loading states, error boundaries & race conditions.\n5. Practical Prep: Be ready to code a live search filter, modal component, or dynamic data grid in React.`;
    actions = ['I have an interview tomorrow. What should I do?', 'Run ATS Resume Matcher'];
  } else if (queryLower.includes('tomorrow') || queryLower.includes('interview day')) {
    answer = `Interview Day Preparation Strategy:\n\n1. Company Research: Review the target company's products, engineering blog, and tech stack.\n2. Job Description Review: Re-read key requirements and match your top project achievements.\n3. Technical Revision: Quickly review core Data Structures, System Architecture & React fundamentals.\n4. Project Explanation: Be prepared to walk through your best project using the STAR method (Situation, Task, Action, Result).\n5. HR & Culture Prep: Practice your 60-second elevator pitch and prepare 2 thoughtful questions for the interviewer.`;
    actions = ['Open STAR Preparation Checklist', 'View Upcoming Interviews'];
  } else if (queryLower.includes('follow up') || queryLower.includes('recruiter')) {
    answer = `Professional Recruiter Follow-up Guide:\n\n1. Timing: Wait 3 to 5 business days after initial application or screening call.\n2. Conciseness: Keep the email under 150 words.\n3. Key Elements: Reiterate enthusiasm for the company, highlight 1 relevant technical strength, and express readiness for next steps.\n4. Subject Line: "Following up - [Job Title] Application - [Your Name]".`;
    actions = ['Open Follow-Up Engine', 'View Target Companies'];
  } else if (queryLower.includes('highest chance') || queryLower.includes('success')) {
    answer = "Your **Zoho** application has high callback momentum in your pipeline — you are in the Final Managerial Round! Applications submitted via **Referrals** (like Freshworks) show a 100% response velocity.";
    actions = ['View Zoho Interview Workspace', 'Explore Live Job Search'];
  } else if (queryLower.includes('resume') || queryLower.includes('ats')) {
    answer = "To pass ATS screening, align exact keywords from the job description in your skills section, quantify project impact with percentages, and keep formatting clean.";
    actions = ['Open ATS Resume Matcher', 'Upload New Resume Version'];
  }

  res.json({
    reply: answer,
    suggestedActions: actions,
    timestamp: new Date()
  });
};
