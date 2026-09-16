const now = new Date();
const daysAgo = (days) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
const daysAhead = (days) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

export const initialCompanies = [
  { id: 'comp-1', name: 'Zoho', industry: 'Enterprise SaaS & Cloud', location: 'Chennai, TN / Hybrid', companySize: '10,000+', rating: 4.8, website: 'https://zoho.com', recruiterName: 'Arun Kumar', recruiterEmail: 'arun.k@zoho.com' },
  { id: 'comp-2', name: 'Freshworks', industry: 'Customer Engagement Software', location: 'Bengaluru, KA / Remote', companySize: '5000+', rating: 4.7, website: 'https://freshworks.com', recruiterName: 'Priya Krishnan', recruiterEmail: 'priya.k@freshworks.com' },
  { id: 'comp-3', name: 'Razorpay', industry: 'Fintech & Payment Gateway', location: 'Bengaluru, KA / Hybrid', companySize: '2000+', rating: 4.6, website: 'https://razorpay.com', recruiterName: 'Karthik Raj', recruiterEmail: 'karthik.r@razorpay.com' },
  { id: 'comp-4', name: 'PhonePe', industry: 'Digital Payments & Financial Tech', location: 'Bengaluru, KA / On-site', companySize: '3000+', rating: 4.7, website: 'https://phonepe.com', recruiterName: 'Divya Srinivasan', recruiterEmail: 'divya.s@phonepe.com' },
  { id: 'comp-5', name: 'Infosys', industry: 'IT Services & Digital Transformation', location: 'Bengaluru / Mysuru / Remote', companySize: '300,000+', rating: 4.4, website: 'https://infosys.com', recruiterName: 'Rahul Sharma', recruiterEmail: 'rahul.s@infosys.com' },
  { id: 'comp-6', name: 'TCS', industry: 'IT Consulting & Enterprise Solutions', location: 'Chennai / Mumbai / Remote', companySize: '600,000+', rating: 4.3, website: 'https://tcs.com', recruiterName: 'Neha Verma', recruiterEmail: 'neha.v@tcs.com' },
  { id: 'comp-7', name: 'Accenture', industry: 'Global Technology Consulting', location: 'Gurugram / Hyderabad / Remote', companySize: '700,000+', rating: 4.5, website: 'https://accenture.com', recruiterName: 'Ankit Mehta', recruiterEmail: 'ankit.m@accenture.com' },
  { id: 'comp-8', name: 'Wipro', industry: 'Cloud & IT Services', location: 'Bengaluru / Pune / Remote', companySize: '240,000+', rating: 4.2, website: 'https://wipro.com', recruiterName: 'Pooja Singh', recruiterEmail: 'pooja.s@wipro.com' },
  { id: 'comp-9', name: 'Microsoft', industry: 'Cloud, Software & AI', location: 'Hyderabad, TS / Hybrid', companySize: '200,000+', rating: 4.9, website: 'https://microsoft.com', recruiterName: 'Siddharth Nair', recruiterEmail: 'siddharth.n@microsoft.com' },
  { id: 'comp-10', name: 'Google', industry: 'Search, Cloud & AI Infrastructure', location: 'Bengaluru / Hyderabad', companySize: '180,000+', rating: 4.9, website: 'https://google.com', recruiterName: 'Meera Deshmukh', recruiterEmail: 'meera.d@google.com' },
  { id: 'comp-11', name: 'Cognizant', industry: 'Digital Business & Tech Services', location: 'Chennai / Hyderabad', companySize: '350,000+', rating: 4.3, website: 'https://cognizant.com', recruiterName: 'Venkatesh Rao', recruiterEmail: 'v.rao@cognizant.com' },
  { id: 'comp-12', name: 'HCLTech', industry: 'Technology Services & R&D', location: 'Noida / Chennai', companySize: '220,000+', rating: 4.2, website: 'https://hcltech.com', recruiterName: 'Sunita Joshi', recruiterEmail: 'sunita.j@hcl.com' },
  { id: 'comp-13', name: 'Capgemini', industry: 'Consulting & Digital Services', location: 'Mumbai / Pune', companySize: '340,000+', rating: 4.3, website: 'https://capgemini.com', recruiterName: 'Rohan Gupta', recruiterEmail: 'rohan.g@capgemini.com' },
  { id: 'comp-14', name: 'Tech Mahindra', industry: 'Telecommunications & IT Services', location: 'Pune / Hyderabad', companySize: '150,000+', rating: 4.1, website: 'https://techmahindra.com', recruiterName: 'Kavita Reddy', recruiterEmail: 'kavita.r@techmahindra.com' },
  { id: 'comp-15', name: 'Paytm', industry: 'Fintech & E-Commerce', location: 'Noida, UP / Hybrid', companySize: '10,000+', rating: 4.2, website: 'https://paytm.com', recruiterName: 'Aman Saxena', recruiterEmail: 'aman.s@paytm.com' },
  { id: 'comp-16', name: 'Amazon', industry: 'Cloud & E-Commerce Engineering', location: 'Bengaluru / Hyderabad', companySize: '1,500,000+', rating: 4.6, website: 'https://amazon.jobs', recruiterName: 'Ramesh Patel', recruiterEmail: 'ramesh.p@amazon.com' },
  { id: 'comp-17', name: 'IBM', industry: 'Hybrid Cloud & Quantum Computing', location: 'Bengaluru / Kochi', companySize: '280,000+', rating: 4.5, website: 'https://ibm.com', recruiterName: 'Shalini Kapoor', recruiterEmail: 'shalini.k@ibm.com' },
  { id: 'comp-18', name: 'Deloitte', industry: 'Audit & Enterprise Advisory', location: 'Hyderabad / Gurugram', companySize: '400,000+', rating: 4.6, website: 'https://deloitte.com', recruiterName: 'Vikram Malhotra', recruiterEmail: 'vikram.m@deloitte.com' },
];

export const initialContacts = [
  { id: 'cont-1', name: 'Arun Kumar', role: 'Talent Acquisition Specialist', company: 'Zoho', email: 'arun.k@zoho.com', linkedIn: 'linkedin.com/in/arunkumar-tech', phone: '+91 98765 43210', relationship: 'Recruiter', lastContactDate: daysAgo(2), notes: 'Very responsive. Managed initial technical test coordination.' },
  { id: 'cont-2', name: 'Priya Krishnan', role: 'Engineering Manager - Web Apps', company: 'Freshworks', email: 'priya.k@freshworks.com', linkedIn: 'linkedin.com/in/priyakrishnan-dev', phone: '+91 98123 45678', relationship: 'Hiring Manager', lastContactDate: daysAgo(4), notes: 'Met during React tech screen. Impressed by single-page dashboard architecture.' },
  { id: 'cont-3', name: 'Karthik Raj', role: 'Lead Talent Partner', company: 'Razorpay', email: 'karthik.r@razorpay.com', linkedIn: 'linkedin.com/in/karthikraj-hr', relationship: 'Recruiter', lastContactDate: daysAgo(8), notes: 'Scheduled System Architecture interview round.' },
  { id: 'cont-4', name: 'Rahul Sharma', role: 'Senior Campus & Lateral Recruiter', company: 'Infosys', email: 'rahul.s@infosys.com', linkedIn: 'linkedin.com/in/rahulsharma-hr', relationship: 'Recruiter', lastContactDate: daysAgo(12), notes: 'Sent candidate screening questionnaire.' },
];

export const initialApplications = [
  {
    id: 'app-1',
    company: 'Zoho',
    jobTitle: 'Software Developer - Web & Frontend',
    location: 'Chennai, TN',
    workMode: 'Hybrid',
    employmentType: 'Full-Time',
    experienceLevel: 'Entry Level / Fresher',
    salaryMin: 800000,
    salaryMax: 1200000,
    currency: 'INR',
    applicationDate: daysAgo(14),
    deadline: daysAhead(10),
    stage: 'Interview',
    priority: 'Urgent',
    source: 'LinkedIn',
    recruiterName: 'Arun Kumar',
    recruiterEmail: 'arun.k@zoho.com',
    jobDescription: 'We are looking for a Software Developer to join our engineering team and contribute to building scalable web applications. The candidate will work closely with designers and backend engineers to develop responsive user interfaces, integrate RESTful APIs, troubleshoot performance bottlenecks, and improve application responsiveness.',
    technicalRequirements: [
      'JavaScript (ES6+)',
      'React.js',
      'Node.js',
      'REST APIs',
      'MongoDB',
      'Git & Version Control',
      'HTML5 / CSS3'
    ],
    notes: 'Completed technical coding round cleanly! Next is team fit & design round.',
    resumeUsed: 'Software Developer Resume v3.pdf',
    coverLetterUsed: 'Zoho Cover Letter.pdf',
    jobUrl: 'https://zoho.com/careers/software-developer',
    followUpDate: daysAhead(2),
    tags: ['React', 'JavaScript', 'Chennai', 'High Priority'],
    isFavorite: true,
    isArchived: false,
    timeline: [
      { id: 't1', title: 'Application Created', description: 'Saved position details from LinkedIn', type: 'created', date: daysAgo(14) },
      { id: 't2', title: 'Status Moved → Applied', description: 'Submitted custom resume via portal', type: 'stage_change', date: daysAgo(14) },
      { id: 't3', title: 'Status Moved → Interview', description: 'Advanced to Final Managerial Round', type: 'stage_change', date: daysAgo(1) }
    ]
  },
  {
    id: 'app-2',
    company: 'Freshworks',
    jobTitle: 'Full Stack Engineer (Node + React)',
    location: 'Bengaluru, KA',
    workMode: 'Remote',
    employmentType: 'Full-Time',
    experienceLevel: 'Mid Level (1-3 yrs)',
    salaryMin: 1000000,
    salaryMax: 1500000,
    currency: 'INR',
    applicationDate: daysAgo(18),
    deadline: daysAhead(5),
    stage: 'Offer',
    priority: 'High',
    source: 'Employee Referral',
    recruiterName: 'Priya Krishnan',
    recruiterEmail: 'priya.k@freshworks.com',
    jobDescription: 'Freshworks is seeking a passionate Full Stack Engineer to design and implement robust microservices and interactive user dashboards. You will build high-throughput REST APIs, optimize frontend rendering performance, write automated unit tests, and maintain CI/CD pipelines.',
    technicalRequirements: [
      'React.js & Hooks',
      'Node.js & Express',
      'TypeScript',
      'PostgreSQL / MongoDB',
      'Docker',
      'RESTful Microservices',
      'Tailwind CSS'
    ],
    notes: 'Received initial verbal offer of ₹12,50,000 / year base salary!',
    resumeUsed: 'Full Stack Engineer Resume.pdf',
    coverLetterUsed: 'Freshworks Referral Letter.pdf',
    jobUrl: 'https://freshworks.com/careers',
    followUpDate: daysAgo(1),
    tags: ['Full Stack', 'Offer Received', 'Remote'],
    isFavorite: true,
    isArchived: false,
    timeline: [
      { id: 't21', title: 'Applied via Referral', description: 'Referred by Priya Krishnan', type: 'created', date: daysAgo(18) },
      { id: 't23', title: 'Offer Letter Extended', description: '₹12,50,000 base salary offer received', type: 'stage_change', date: daysAgo(1) }
    ]
  },
  {
    id: 'app-3',
    company: 'Razorpay',
    jobTitle: 'Associate Software Engineer - Web Infrastructure',
    location: 'Bengaluru, KA',
    workMode: 'Hybrid',
    employmentType: 'Full-Time',
    experienceLevel: 'Entry Level / Fresher',
    salaryMin: 900000,
    salaryMax: 1300000,
    currency: 'INR',
    applicationDate: daysAgo(10),
    deadline: daysAhead(14),
    stage: 'Assessment',
    priority: 'High',
    source: 'Company Website',
    recruiterName: 'Karthik Raj',
    recruiterEmail: 'karthik.r@razorpay.com',
    jobDescription: 'Razorpay is hiring Associate Software Engineers to strengthen our payment checkout and merchant dashboard platform. Responsibilities include building secure payment interfaces, handling high concurrency web requests, resolving frontend telemetry anomalies, and collaborating with product teams.',
    technicalRequirements: [
      'JavaScript (ES6)',
      'React Framework',
      'Data Structures & Algorithms',
      'REST API Integration',
      'State Management (Redux/Context)',
      'Git Workflow'
    ],
    notes: 'Received HackerRank assessment link. 90-minute algorithm challenge.',
    resumeUsed: 'Software Developer Resume v3.pdf',
    coverLetterUsed: 'Razorpay Cover Letter.pdf',
    jobUrl: 'https://razorpay.com/jobs',
    followUpDate: daysAhead(3),
    tags: ['Fintech', 'Assessment', 'Bengaluru'],
    isFavorite: false,
    isArchived: false,
    timeline: [
      { id: 't31', title: 'Applied on Portal', description: 'Submitted application on Razorpay Careers page', type: 'created', date: daysAgo(10) }
    ]
  },
  {
    id: 'app-4',
    company: 'Infosys',
    jobTitle: 'Systems Engineer - Digital Practice',
    location: 'Bengaluru / Remote',
    workMode: 'Remote',
    employmentType: 'Full-Time',
    experienceLevel: 'Fresher / Graduate',
    salaryMin: 450000,
    salaryMax: 650000,
    currency: 'INR',
    applicationDate: daysAgo(7),
    deadline: daysAhead(20),
    stage: 'Screening',
    priority: 'Medium',
    source: 'LinkedIn',
    recruiterName: 'Rahul Sharma',
    recruiterEmail: 'rahul.s@infosys.com',
    jobDescription: 'Infosys digital practice team is looking for Systems Engineers to deliver cloud-native web solutions for global enterprise clients. The role involves frontend module development, bug fixing, customer interaction, database query tuning, and cloud deployment assistance.',
    technicalRequirements: [
      'Java / JavaScript',
      'HTML5 / CSS3',
      'SQL / Database Basics',
      'Git & Version Control',
      'Problem Solving Skills'
    ],
    notes: 'HR screening questionnaire filled. Waiting for next round confirmation.',
    resumeUsed: 'Fresher Software Engineer Resume.pdf',
    coverLetterUsed: 'Generic Tech Cover Letter.pdf',
    jobUrl: 'https://infosys.com/careers',
    followUpDate: daysAhead(4),
    tags: ['Fresher', 'Entry Level', 'IT Services'],
    isFavorite: false,
    isArchived: false,
    timeline: [
      { id: 't41', title: 'Applied on LinkedIn', description: 'Submitted via 1-click LinkedIn Apply', type: 'created', date: daysAgo(7) }
    ]
  },
  {
    id: 'app-5',
    company: 'TCS',
    jobTitle: 'Assistant System Engineer',
    location: 'Chennai, TN',
    workMode: 'On-site',
    employmentType: 'Full-Time',
    experienceLevel: 'Entry Level / Fresher',
    salaryMin: 400000,
    salaryMax: 700000,
    currency: 'INR',
    applicationDate: daysAgo(22),
    stage: 'Applied',
    priority: 'Medium',
    source: 'Campus Drive',
    recruiterName: 'Neha Verma',
    recruiterEmail: 'neha.v@tcs.com',
    jobDescription: 'Seeking ambitious engineering graduates to join Tata Consultancy Services. You will receive structured training in full-stack web technologies and collaborate on client projects delivering responsive interfaces and cloud services.',
    technicalRequirements: [
      'JavaScript',
      'Core Java',
      'Relational Databases',
      'Web Development Fundamentals'
    ],
    notes: 'Application pending for over 20 days. Follow-up email needed.',
    resumeUsed: 'Fresher Software Engineer Resume.pdf',
    coverLetterUsed: 'TCS Cover Letter.pdf',
    jobUrl: 'https://tcs.com/careers',
    followUpDate: daysAgo(2),
    tags: ['TCS', 'Campus', 'Fresher'],
    isFavorite: true,
    isArchived: false,
    timeline: [
      { id: 't51', title: 'Application Submitted', description: 'Submitted via TCS NextStep portal', type: 'created', date: daysAgo(22) }
    ]
  }
];

export const initialInterviews = [
  {
    id: 'int-1',
    applicationId: 'app-1',
    company: 'Zoho',
    jobTitle: 'Software Developer - Web & Frontend',
    interviewType: 'Final Technical & Managerial Round',
    date: daysAhead(2),
    time: '02:30 PM IST',
    meetingLink: 'https://meet.zoho.com/zoh-dev-final',
    interviewerName: 'Arun Kumar & Lead Architect',
    roundNumber: 3,
    status: 'Scheduled',
    prepChecklist: [
      { text: 'Research Zoho Creator and SaaS suite architecture', completed: true },
      { text: 'Review React 19 Server Actions & Custom Hooks', completed: true },
      { text: 'Prepare STAR story detailing dynamic table rendering performance fix', completed: true },
      { text: 'Prepare 3 insightful questions about engineering culture and team roadmap', completed: false }
    ],
    questionsToAsk: [
      'What are the key scalability challenges for Zoho dashboard components this year?',
      'How does the engineering team handle cross-browser compatibility across legacy products?'
    ],
    notes: 'Focus on demonstrating enthusiasm for clean UI architecture and fast load times.'
  },
  {
    id: 'int-2',
    applicationId: 'app-3',
    company: 'Razorpay',
    jobTitle: 'Associate Software Engineer',
    interviewType: 'Technical Coding Round',
    date: daysAhead(5),
    time: '11:00 AM IST',
    meetingLink: 'https://google.meet/rzp-tech-screen',
    interviewerName: 'Karthik Raj',
    roundNumber: 1,
    status: 'Scheduled',
    prepChecklist: [
      { text: 'Practice Array & String sliding window DSA problems', completed: false },
      { text: 'Revise RESTful API status codes and security headers', completed: false },
      { text: 'Review JS Event Loop, Closures, and Promises', completed: false }
    ],
    questionsToAsk: ['How does Razorpay handle API rate limiting for high-volume merchants?'],
    notes: 'Focus on clean code and optimal time complexity.'
  }
];

export const initialTasks = [
  { id: 'task-1', applicationId: 'app-1', company: 'Zoho', title: 'Prepare STAR response stories for Zoho final round', description: 'Draft bullet points on resolving complex state re-render performance bug.', dueDate: daysAhead(1), priority: 'Urgent', status: 'In Progress' },
  { id: 'task-2', applicationId: 'app-3', company: 'Razorpay', title: 'Complete Razorpay HackerRank coding assessment', description: '90-minute window. Focus on array algorithms and JS fundamentals.', dueDate: daysAhead(3), priority: 'High', status: 'Todo' },
  { id: 'task-3', applicationId: 'app-5', company: 'TCS', title: 'Send follow-up email to Neha Verma at TCS', description: 'Application pending for 22 days.', dueDate: daysAhead(0), priority: 'High', status: 'Todo' },
  { id: 'task-4', applicationId: null, company: 'General', title: 'Update resume with latest React project metrics', description: 'Quantify impact (e.g., improved page speed by 40%).', dueDate: daysAhead(2), priority: 'High', status: 'Todo' },
  { id: 'task-5', applicationId: null, company: 'General', title: 'Tailor resume for Java & Spring Boot roles', description: 'Create a dedicated v2 variant highlighting backend projects.', dueDate: daysAhead(4), priority: 'Medium', status: 'Todo' },
  { id: 'task-6', applicationId: null, company: 'General', title: 'Prepare DSA practice questions (Trees & Graphs)', description: 'Solve 5 LeetCode medium problems.', dueDate: daysAhead(2), priority: 'High', status: 'In Progress' },
  { id: 'task-7', applicationId: null, company: 'General', title: 'Practice HR & Behavioral Interview Questions', description: 'Rehearse "Tell me about yourself" and "Strengths & Weaknesses".', dueDate: daysAhead(3), priority: 'Medium', status: 'Todo' },
  { id: 'task-8', applicationId: null, company: 'General', title: 'Update LinkedIn Profile headline and skills section', description: 'Add Open to Work badge for Software Developer roles.', dueDate: daysAhead(5), priority: 'Medium', status: 'Completed' },
  { id: 'task-9', applicationId: null, company: 'General', title: 'Prepare STAR method accomplishment stories', description: 'Document 3 technical project challenges solved.', dueDate: daysAhead(4), priority: 'High', status: 'In Progress' },
  { id: 'task-10', applicationId: null, company: 'General', title: 'Review JavaScript event loop & promise internals', description: 'Read deep-dive articles on async/await microtasks.', dueDate: daysAhead(1), priority: 'High', status: 'Todo' },
  { id: 'task-11', applicationId: null, company: 'General', title: 'Prepare portfolio website with live demo links', description: 'Ensure mobile responsive layout and clean GitHub repos.', dueDate: daysAhead(6), priority: 'Medium', status: 'Todo' },
  { id: 'task-12', applicationId: 'app-2', company: 'Freshworks', title: 'Review Freshworks offer letter details & stock terms', description: 'Check relocation assistance and join date.', dueDate: daysAgo(1), priority: 'Urgent', status: 'Completed' },
  { id: 'task-13', applicationId: null, company: 'Infosys', title: 'Complete Infosys screening questionnaire', description: 'Submit educational transcripts.', dueDate: daysAgo(2), priority: 'Medium', status: 'Completed' },
  { id: 'task-14', applicationId: null, company: 'General', title: 'Send thank-you note after interview', description: 'Craft personalized email referencing technical topics discussed.', dueDate: daysAhead(2), priority: 'Medium', status: 'Todo' },
  { id: 'task-15', applicationId: null, company: 'General', title: 'Research target companies compensation benchmarks', description: 'Check Glassdoor & AmbitionBox for fresher salary benchmarks.', dueDate: daysAhead(7), priority: 'Low', status: 'Todo' }
];

export const initialFollowUps = [
  { 
    id: 'fol-1', 
    applicationId: 'app-5', 
    company: 'TCS', 
    jobTitle: 'Assistant System Engineer', 
    recruiterEmail: 'neha.v@tcs.com', 
    appliedDate: daysAgo(22),
    dueDate: daysAgo(1), 
    status: 'Pending', 
    templateType: 'Recruiter Follow-up', 
    messageText: `Dear Neha Verma,\n\nI hope you are having a productive week!\n\nI am following up regarding my application for the Assistant System Engineer role at TCS, which I submitted 3 weeks ago.\n\nI remain extremely eager to contribute my software engineering skills to TCS digital projects.\n\nPlease let me know if you need any further information or documents.\n\nWarm regards,\nAathi` 
  },
  { 
    id: 'fol-2', 
    applicationId: 'app-4', 
    company: 'Infosys', 
    jobTitle: 'Systems Engineer', 
    recruiterEmail: 'rahul.s@infosys.com', 
    appliedDate: daysAgo(7),
    dueDate: daysAhead(2), 
    status: 'Pending', 
    templateType: 'Post-Screening Check-in', 
    messageText: `Dear Rahul Sharma,\n\nThank you for guiding me through the initial screening stage for the Systems Engineer role at Infosys.\n\nI wanted to confirm if there are any updates regarding the scheduling of the upcoming technical interview round.\n\nLooking forward to hearing from you.\n\nBest regards,\nAathi` 
  }
];
