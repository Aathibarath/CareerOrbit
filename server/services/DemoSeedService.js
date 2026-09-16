// Realistic seed data generator for CareerOrbit

const now = new Date();
const daysAgo = (days) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
const daysAhead = (days) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

export const initialCompanies = [
  { id: 'comp-1', name: 'NovaTech', industry: 'Cloud & AI Infrastructure', location: 'San Francisco, CA / Remote', companySize: '1000-5000', rating: 4.8, website: 'https://novatech.io', logoUrl: '' },
  { id: 'comp-2', name: 'PixelForge', industry: 'Design Systems & Developer Tools', location: 'New York, NY / Hybrid', companySize: '51-200', rating: 4.6, website: 'https://pixelforge.dev', logoUrl: '' },
  { id: 'comp-3', name: 'CloudNest', industry: 'SaaS Platforms', location: 'Austin, TX / Remote', companySize: '201-1000', rating: 4.5, website: 'https://cloudnest.app', logoUrl: '' },
  { id: 'comp-4', name: 'Finora', industry: 'Fintech & Modern Banking', location: 'Chicago, IL / Remote', companySize: '201-1000', rating: 4.7, website: 'https://finora.co', logoUrl: '' },
  { id: 'comp-5', name: 'OrbitLabs', industry: 'AI & Data Science Services', location: 'Seattle, WA / Hybrid', companySize: '51-200', rating: 4.9, website: 'https://orbitlabs.ai', logoUrl: '' },
  { id: 'comp-6', name: 'ByteCraft', industry: 'E-commerce Engineering', location: 'Boston, MA / On-site', companySize: '5000+', rating: 4.3, website: 'https://bytecraft.io', logoUrl: '' },
  { id: 'comp-7', name: 'Vertex Systems', industry: 'Cybersecurity Platforms', location: 'San Jose, CA / Remote', companySize: '1000-5000', rating: 4.4, website: 'https://vertexsys.com', logoUrl: '' },
  { id: 'comp-8', name: 'CodeSphere', industry: 'EdTech & Learning', location: 'Denver, CO / Remote', companySize: '51-200', rating: 4.6, website: 'https://codesphere.edu', logoUrl: '' },
];

export const initialContacts = [
  { id: 'cont-1', name: 'Sarah Jenkins', role: 'Senior Technical Recruiter', company: 'NovaTech', email: 'sarah.j@novatech.io', linkedIn: 'linkedin.com/in/sarahjenkins-tech', phone: '+1 415 555 0192', relationship: 'Recruiter', lastContactDate: daysAgo(2), nextFollowUpDate: daysAhead(5), notes: 'Reached out after initial resume screening. Very responsive.' },
  { id: 'cont-2', name: 'Marcus Vance', role: 'Engineering Manager - Frontend', company: 'PixelForge', email: 'mvance@pixelforge.dev', linkedIn: 'linkedin.com/in/marcusvance-dev', relationship: 'Hiring Manager', lastContactDate: daysAgo(4), nextFollowUpDate: daysAhead(2), notes: 'Met during the technical screen. Loved my React component library projects.' },
  { id: 'cont-3', name: 'Elena Rostova', role: 'Talent Acquisition Lead', company: 'CloudNest', email: 'elena.r@cloudnest.app', linkedIn: 'linkedin.com/in/elena-rostova-hr', relationship: 'Recruiter', lastContactDate: daysAgo(10), nextFollowUpDate: daysAhead(1), notes: 'Scheduled System Design round for next Tuesday.' },
  { id: 'cont-4', name: 'David Chen', role: 'Staff Software Engineer', company: 'OrbitLabs', email: 'dchen@orbitlabs.ai', linkedIn: 'linkedin.com/in/davidchen-ai', relationship: 'Referral / Peer', lastContactDate: daysAgo(12), nextFollowUpDate: daysAhead(7), notes: 'Submitted employee referral for Full Stack role.' },
  { id: 'cont-5', name: 'Priya Sharma', role: 'University Relations Specialist', company: 'Finora', email: 'priya.s@finora.co', linkedIn: 'linkedin.com/in/priyasharma-recruiter', relationship: 'Recruiter', lastContactDate: daysAgo(3), nextFollowUpDate: daysAhead(3), notes: 'Discussed fresher onboarding package & hybrid schedule.' },
];

export const initialApplications = [
  {
    id: 'app-1',
    company: 'NovaTech',
    jobTitle: 'Frontend Developer (React / Next.js)',
    location: 'San Francisco, CA (Remote)',
    workMode: 'Remote',
    employmentType: 'Full-Time',
    salaryMin: 110000,
    salaryMax: 135000,
    currency: 'USD',
    applicationDate: daysAgo(14),
    deadline: daysAhead(10),
    stage: 'Interview',
    priority: 'Urgent',
    source: 'LinkedIn',
    recruiterName: 'Sarah Jenkins',
    recruiterEmail: 'sarah.j@novatech.io',
    recruiterLinkedIn: 'linkedin.com/in/sarahjenkins-tech',
    jobDescription: 'Seeking a talented Frontend Engineer skilled in React 19, TypeScript, Tailwind CSS, and state management. You will build high-frequency web dashboards for our enterprise AI monitoring suite.',
    notes: 'Completed technical coding round cleanly! Next is team fit interview.',
    resumeUsed: 'Frontend Engineer Resume v3.pdf',
    coverLetterUsed: 'NovaTech Frontend Cover Letter.pdf',
    tags: ['React', 'TypeScript', 'Remote', 'High Pay'],
    isFavorite: true,
    isArchived: false,
    timeline: [
      { id: 't1', title: 'Application Created', description: 'Saved position details from LinkedIn', type: 'created', date: daysAgo(14) },
      { id: 't2', title: 'Status Moved → Applied', description: 'Submitted custom resume via portal', type: 'stage_change', date: daysAgo(14) },
      { id: 't3', title: 'Recruiter Outreach', description: 'Sarah Jenkins scheduled 30-min call', type: 'recruiter_contacted', date: daysAgo(10) },
      { id: 't4', title: 'Status Moved → Screening', description: 'Passed initial Recruiter Screen', type: 'stage_change', date: daysAgo(8) },
      { id: 't5', title: 'Technical Interview Completed', description: 'Built dynamic data grid in React with zero bugs', type: 'interview_scheduled', date: daysAgo(2) },
      { id: 't6', title: 'Status Moved → Interview', description: 'Advanced to Final Managerial Round', type: 'stage_change', date: daysAgo(1) },
    ]
  },
  {
    id: 'app-2',
    company: 'PixelForge',
    jobTitle: 'Full Stack Engineer (Node + React)',
    location: 'New York, NY',
    workMode: 'Hybrid',
    employmentType: 'Full-Time',
    salaryMin: 105000,
    salaryMax: 125000,
    currency: 'USD',
    applicationDate: daysAgo(18),
    deadline: daysAhead(5),
    stage: 'Offer',
    priority: 'High',
    source: 'Referral',
    recruiterName: 'Marcus Vance',
    recruiterEmail: 'mvance@pixelforge.dev',
    jobDescription: 'Build scalable full-stack features using Node.js, Express, MongoDB, and Tailwind UI components.',
    notes: 'Received initial verbal offer of $115,000 + stock options! Reviewing benefit package.',
    resumeUsed: 'Full Stack Engineer Resume.pdf',
    coverLetterUsed: 'PixelForge Referral Letter.pdf',
    tags: ['Full Stack', 'Offer Received', 'Hybrid'],
    isFavorite: true,
    isArchived: false,
    timeline: [
      { id: 't21', title: 'Applied via Referral', description: 'Referred by Marcus Vance', type: 'created', date: daysAgo(18) },
      { id: 't22', title: 'Status Moved → Interview', description: 'Completed 3 interview rounds', type: 'stage_change', date: daysAgo(6) },
      { id: 't23', title: 'Offer Letter Extended', description: '$115,000 base salary offer received', type: 'stage_change', date: daysAgo(1) },
    ]
  },
  {
    id: 'app-3',
    company: 'CloudNest',
    jobTitle: 'Software Engineering Intern - Web',
    location: 'Austin, TX',
    workMode: 'Remote',
    employmentType: 'Internship',
    salaryMin: 45,
    salaryMax: 55,
    currency: 'USD',
    applicationDate: daysAgo(10),
    deadline: daysAhead(14),
    stage: 'Assessment',
    priority: 'High',
    source: 'Company Website',
    recruiterName: 'Elena Rostova',
    recruiterEmail: 'elena.r@cloudnest.app',
    jobDescription: '12-week summer engineering internship focused on RESTful microservices, API integration, and front-end performance.',
    notes: 'Received HackerRank assessment link. Must complete within 7 days.',
    resumeUsed: 'Software Engineer Resume v2.pdf',
    coverLetterUsed: 'CloudNest Internship Cover Letter.pdf',
    tags: ['Internship', 'HackerRank', 'Remote'],
    isFavorite: false,
    isArchived: false,
    timeline: [
      { id: 't31', title: 'Applied on Portal', description: 'Submitted application on CloudNest Careers page', type: 'created', date: daysAgo(10) },
      { id: 't32', title: 'Assessment Link Received', description: '90-min coding assessment assigned', type: 'assessment_received', date: daysAgo(3) }
    ]
  },
  {
    id: 'app-4',
    company: 'Finora',
    jobTitle: 'Associate Software Engineer',
    location: 'Chicago, IL',
    workMode: 'Remote',
    employmentType: 'Full-Time',
    salaryMin: 95000,
    salaryMax: 115000,
    currency: 'USD',
    applicationDate: daysAgo(7),
    deadline: daysAhead(20),
    stage: 'Screening',
    priority: 'Medium',
    source: 'LinkedIn',
    recruiterName: 'Priya Sharma',
    recruiterEmail: 'priya.s@finora.co',
    jobDescription: 'Entry-level software engineering role in financial technologies. Great mentorship and rapid growth opportunities.',
    notes: 'Screening call scheduled with HR next Thursday.',
    resumeUsed: 'Fresher Software Developer Resume.pdf',
    coverLetterUsed: 'Finora Cover Letter.pdf',
    tags: ['Entry Level', 'Fintech', 'Fresher Friendly'],
    isFavorite: false,
    isArchived: false,
    timeline: [
      { id: 't41', title: 'Applied on LinkedIn', description: 'Submitted via 1-click LinkedIn Apply', type: 'created', date: daysAgo(7) },
      { id: 't42', title: 'Screening Call Scheduled', description: 'Priya Sharma emailed interview slot link', type: 'stage_change', date: daysAgo(2) }
    ]
  },
  {
    id: 'app-5',
    company: 'OrbitLabs',
    jobTitle: 'AI Web Interface Developer',
    location: 'Seattle, WA',
    workMode: 'Hybrid',
    employmentType: 'Full-Time',
    salaryMin: 120000,
    salaryMax: 145000,
    currency: 'USD',
    applicationDate: daysAgo(22),
    deadline: daysAgo(2),
    stage: 'Applied',
    priority: 'Medium',
    source: 'Referral',
    recruiterName: 'David Chen',
    jobDescription: 'Build next-gen LLM playground interfaces with React, Canvas, and WebSockets.',
    notes: 'Waiting for recruiter response. Need to send a follow-up email.',
    resumeUsed: 'AI Frontend Engineer Resume.pdf',
    tags: ['AI', 'React', 'Referral'],
    isFavorite: true,
    isArchived: false,
    timeline: [
      { id: 't51', title: 'Application Submitted', description: 'Referred by David Chen', type: 'created', date: daysAgo(22) }
    ]
  },
  {
    id: 'app-6',
    company: 'ByteCraft',
    jobTitle: 'Frontend Engineer - Checkout Team',
    location: 'Boston, MA',
    workMode: 'On-site',
    employmentType: 'Full-Time',
    salaryMin: 100000,
    salaryMax: 120000,
    currency: 'USD',
    applicationDate: daysAgo(25),
    deadline: daysAgo(5),
    stage: 'Wishlist',
    priority: 'Low',
    source: 'Indeed',
    jobDescription: 'Optimize checkout flow UI, increase web conversion rates, and implement responsive design.',
    notes: 'Saved for later. Preparing custom cover letter.',
    tags: ['Wishlist', 'E-commerce'],
    isFavorite: false,
    isArchived: false,
    timeline: [
      { id: 't61', title: 'Saved to Wishlist', description: 'Saved from Indeed job board', type: 'created', date: daysAgo(25) }
    ]
  },
  {
    id: 'app-7',
    company: 'Vertex Systems',
    jobTitle: 'Junior Security Engineer',
    location: 'San Jose, CA',
    workMode: 'Remote',
    employmentType: 'Full-Time',
    salaryMin: 98000,
    salaryMax: 112000,
    currency: 'USD',
    applicationDate: daysAgo(30),
    deadline: daysAgo(10),
    stage: 'Rejected',
    priority: 'Low',
    source: 'LinkedIn',
    jobDescription: 'Implement secure auth tokens, audit API endpoints, and assist with SOC2 compliance tooling.',
    notes: 'Company decided to proceed with senior candidate. Received polite rejection email.',
    tags: ['Security', 'Closed'],
    isFavorite: false,
    isArchived: true,
    timeline: [
      { id: 't71', title: 'Application Sent', description: 'Applied via LinkedIn', type: 'created', date: daysAgo(30) },
      { id: 't72', title: 'Status → Rejected', description: 'Position closed for junior tier', type: 'stage_change', date: daysAgo(10) }
    ]
  },
  {
    id: 'app-8',
    company: 'CodeSphere',
    jobTitle: 'React / Frontend Developer Intern',
    location: 'Denver, CO',
    workMode: 'Remote',
    employmentType: 'Internship',
    salaryMin: 35,
    salaryMax: 45,
    currency: 'USD',
    applicationDate: daysAgo(4),
    deadline: daysAhead(18),
    stage: 'Applied',
    priority: 'Medium',
    source: 'College Placement',
    jobDescription: 'Build interactive coding playground components and student dashboard widgets.',
    notes: 'Submitted resume through University Placement Portal.',
    tags: ['EdTech', 'React', 'College Campus'],
    isFavorite: false,
    isArchived: false,
    timeline: [
      { id: 't81', title: 'Campus Application', description: 'Submitted via University Portal', type: 'created', date: daysAgo(4) }
    ]
  }
];

export const initialInterviews = [
  {
    id: 'int-1',
    applicationId: 'app-1',
    company: 'NovaTech',
    jobTitle: 'Frontend Developer (React / Next.js)',
    interviewType: 'Final Round',
    date: daysAhead(2),
    time: '02:00 PM EST',
    meetingLink: 'https://meet.google.com/nov-atech-fit',
    interviewerName: 'Sarah Jenkins & Engineering Director',
    roundNumber: 3,
    status: 'Scheduled',
    prepChecklist: [
      { text: 'Research NovaTech AI product suite', completed: true },
      { text: 'Review React 19 Server Actions & Hooks', completed: true },
      { text: 'Prepare STAR story on handling state performance bottleneck', completed: true },
      { text: 'Prepare questions about team roadmap and culture', completed: false },
      { text: 'Test web camera & mic connection', completed: false }
    ],
    questionsToAsk: [
      'What are the biggest architecture challenges facing the frontend team this quarter?',
      'How does cross-functional collaboration work between product design and engineering?'
    ],
    notes: 'Focus on demonstrating enthusiasm for building high-density telemetry dashboards.',
    reflection: ''
  },
  {
    id: 'int-2',
    applicationId: 'app-4',
    company: 'Finora',
    jobTitle: 'Associate Software Engineer',
    interviewType: 'HR Screening',
    date: daysAhead(4),
    time: '11:30 AM EST',
    meetingLink: 'https://zoom.us/j/9812739182',
    interviewerName: 'Priya Sharma',
    roundNumber: 1,
    status: 'Scheduled',
    prepChecklist: [
      { text: 'Practice 60-second elevator pitch', completed: true },
      { text: 'Review salary expectation range ($95k-$115k)', completed: false },
      { text: 'Prepare response for "Why Finora?"', completed: false }
    ],
    questionsToAsk: ['What does the training and onboarding program look like for new associate engineers?'],
    notes: 'Be concise and articulate career goals.',
    reflection: ''
  },
  {
    id: 'int-3',
    applicationId: 'app-2',
    company: 'PixelForge',
    jobTitle: 'Full Stack Engineer',
    interviewType: 'System Design',
    date: daysAgo(5),
    time: '01:00 PM EST',
    status: 'Completed',
    prepChecklist: [
      { text: 'Diagram microservice architecture', completed: true },
      { text: 'Review Redis caching strategies', completed: true }
    ],
    notes: 'Felt very confident. Interviewer was impressed by the data flow diagram.',
    reflection: 'Exceeded expectations. Highlighted caching layer effectively.'
  }
];

export const initialTasks = [
  { id: 'task-1', applicationId: 'app-1', company: 'NovaTech', title: 'Prepare STAR response stories for NovaTech final round', description: 'Draft 3 bullet points on resolving complex state re-render performance bug.', dueDate: daysAhead(1), priority: 'Urgent', status: 'In Progress' },
  { id: 'task-2', applicationId: 'app-3', company: 'CloudNest', title: 'Complete CloudNest HackerRank coding assessment', description: '90 minutes window. Focus on array algorithms & dynamic programming.', dueDate: daysAhead(3), priority: 'High', status: 'Todo' },
  { id: 'task-3', applicationId: 'app-5', company: 'OrbitLabs', title: 'Send follow-up email to David Chen', description: 'Application pending for 22 days. Express continued interest in AI interface role.', dueDate: daysAhead(0), priority: 'High', status: 'Todo' },
  { id: 'task-4', applicationId: 'app-2', company: 'PixelForge', title: 'Review PixelForge written offer details', description: 'Compare equity vesting schedule and healthcare benefits package.', dueDate: daysAhead(2), priority: 'Urgent', status: 'In Progress' },
  { id: 'task-5', applicationId: 'app-4', company: 'Finora', title: 'Research Finora core fintech architecture', description: 'Read Finora engineering blog posts on ledger processing.', dueDate: daysAhead(3), priority: 'Medium', status: 'Todo' },
  { id: 'task-6', applicationId: '', company: 'General', title: 'Update LinkedIn profile headline and portfolio link', description: 'Add latest React project preview video to featured section.', dueDate: daysAgo(1), priority: 'Medium', status: 'Completed' }
];

export const initialFollowUps = [
  { id: 'fol-1', applicationId: 'app-5', company: 'OrbitLabs', jobTitle: 'AI Web Interface Developer', recruiterEmail: 'dchen@orbitlabs.ai', dueDate: daysAgo(1), status: 'Pending', templateType: 'Recruiter Follow-up', messageText: `Hi David,\n\nI hope you're having a great week!\n\nI wanted to briefly follow up on my application for the AI Web Interface Developer position at OrbitLabs submitted 3 weeks ago.\n\nI remain extremely excited about OrbitLabs' work in LLM playground interfaces. Please let me know if there are any additional details or work samples I can provide.\n\nBest regards,\nAlex Morgan` },
  { id: 'fol-2', applicationId: 'app-1', company: 'NovaTech', jobTitle: 'Frontend Developer', recruiterEmail: 'sarah.j@novatech.io', dueDate: daysAhead(3), status: 'Pending', templateType: 'Post-Interview Thank You', messageText: `Dear Sarah,\n\nThank you for taking the time to speak with me during the technical round! I really enjoyed discussing NovaTech's high-frequency telemetry dashboard architecture.\n\nLooking forward to our upcoming final round on Thursday!\n\nBest,\nAlex Morgan` }
];
