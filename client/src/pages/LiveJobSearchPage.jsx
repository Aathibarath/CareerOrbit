import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Building2, 
  DollarSign, 
  ExternalLink, 
  Plus, 
  CheckCircle2, 
  Sparkles, 
  Filter, 
  Globe, 
  Clock, 
  Tag 
} from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';
import { formatSalaryDisplay } from '../utils/currency';

export const liveJobDatabase = [
  {
    id: 'live-1',
    company: 'Zoho',
    jobTitle: 'Software Developer - Web & Frontend',
    location: 'Chennai, TN',
    workMode: 'Hybrid',
    experienceLevel: 'Fresher / Entry Level',
    salaryMin: 800000,
    salaryMax: 1200000,
    postedDate: '1 day ago',
    source: 'Zoho Careers Portal',
    skills: ['JavaScript', 'React', 'Node.js', 'REST APIs', 'CSS3'],
    recruiterName: 'Arun Kumar',
    recruiterEmail: 'arun.k@zoho.com',
    jobUrl: 'https://www.zoho.com/careers/software-developer.html',
    jobDescription: 'Seeking ambitious developers to construct high-density SaaS user interfaces. Work with React, state management, and modern Web APIs.'
  },
  {
    id: 'live-2',
    company: 'Freshworks',
    jobTitle: 'Full Stack Engineer (React + Node)',
    location: 'Bengaluru, KA',
    workMode: 'Remote',
    experienceLevel: 'Mid Level (1-3 yrs)',
    salaryMin: 1100000,
    salaryMax: 1600000,
    postedDate: '2 days ago',
    source: 'LinkedIn Jobs',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Docker'],
    recruiterName: 'Priya Krishnan',
    recruiterEmail: 'priya.k@freshworks.com',
    jobUrl: 'https://www.freshworks.com/company/careers/',
    jobDescription: 'Build scalable customer engagement products. Engineer microservices and high-responsiveness frontend dashboards.'
  },
  {
    id: 'live-3',
    company: 'Razorpay',
    jobTitle: 'Associate Frontend Developer',
    location: 'Bengaluru, KA',
    workMode: 'Hybrid',
    experienceLevel: 'Fresher / Entry Level',
    salaryMin: 950000,
    salaryMax: 1350000,
    postedDate: '3 days ago',
    source: 'Razorpay Careers',
    skills: ['React', 'JavaScript', 'REST APIs', 'Git', 'HTML5'],
    recruiterName: 'Karthik Raj',
    recruiterEmail: 'karthik.r@razorpay.com',
    jobUrl: 'https://razorpay.com/jobs',
    jobDescription: 'Join India\'s leading payments team. Design slick payment checkout UI widgets and high-concurrency merchant portals.'
  },
  {
    id: 'live-4',
    company: 'Infosys',
    jobTitle: 'Systems Engineer - Digital Web',
    location: 'Bengaluru / Mysuru',
    workMode: 'Remote',
    experienceLevel: 'Fresher / Graduate',
    salaryMin: 450000,
    salaryMax: 650000,
    postedDate: 'Just now',
    source: 'Infosys Portal',
    skills: ['Java', 'JavaScript', 'SQL', 'HTML/CSS', 'Git'],
    recruiterName: 'Rahul Sharma',
    recruiterEmail: 'rahul.s@infosys.com',
    jobUrl: 'https://www.infosys.com/careers.html',
    jobDescription: 'Immediate opening for Systems Engineers. Develop enterprise web applications and participate in global cloud deployments.'
  },
  {
    id: 'live-5',
    company: 'Microsoft',
    jobTitle: 'Software Engineer - Azure Cloud UI',
    location: 'Hyderabad, TS',
    workMode: 'Hybrid',
    experienceLevel: '1-4 yrs',
    salaryMin: 1800000,
    salaryMax: 2600000,
    postedDate: '1 day ago',
    source: 'Microsoft Careers',
    skills: ['React', 'TypeScript', 'Azure', 'C# / .NET', 'System Design'],
    recruiterName: 'Siddharth Nair',
    recruiterEmail: 'siddharth.n@microsoft.com',
    jobUrl: 'https://careers.microsoft.com',
    jobDescription: 'Engineer next-generation cloud management interfaces on Microsoft Azure. Optimize web telemetry dashboards.'
  },
  {
    id: 'live-6',
    company: 'Google',
    jobTitle: 'Frontend Engineer - Web Ecosystems',
    location: 'Bengaluru, KA',
    workMode: 'Hybrid',
    experienceLevel: '2+ yrs',
    salaryMin: 2200000,
    salaryMax: 3200000,
    postedDate: '4 days ago',
    source: 'Google Careers',
    skills: ['JavaScript', 'TypeScript', 'Angular / React', 'Performance Optimization'],
    recruiterName: 'Meera Deshmukh',
    recruiterEmail: 'meera.d@google.com',
    jobUrl: 'https://careers.google.com',
    jobDescription: 'Develop web experiences serving billions of global users. Focus on web performance, accessibility, and modern standard APIs.'
  },
  {
    id: 'live-7',
    company: 'TCS',
    jobTitle: 'Assistant System Engineer - React',
    location: 'Chennai / Mumbai',
    workMode: 'On-site',
    experienceLevel: 'Fresher / Entry Level',
    salaryMin: 420000,
    salaryMax: 720000,
    postedDate: '5 days ago',
    source: 'TCS iON Portal',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'SQL'],
    recruiterName: 'Neha Verma',
    recruiterEmail: 'neha.v@tcs.com',
    jobUrl: 'https://www.tcs.com/careers',
    jobDescription: 'Exciting opportunities for fresh engineering graduates to join Tata Consultancy Services digital unit.'
  },
  {
    id: 'live-8',
    company: 'Accenture',
    jobTitle: 'Application Development Associate',
    location: 'Gurugram / Hyderabad',
    workMode: 'Hybrid',
    experienceLevel: 'Fresher / Entry Level',
    salaryMin: 480000,
    salaryMax: 750000,
    postedDate: '2 days ago',
    source: 'Accenture Jobs',
    skills: ['JavaScript', 'Node.js', 'Cloud Basics', 'REST APIs'],
    recruiterName: 'Ankit Mehta',
    recruiterEmail: 'ankit.m@accenture.com',
    jobUrl: 'https://www.accenture.com/in-en/careers',
    jobDescription: 'Transform client business challenges into high-performing software applications using agile practices.'
  },
  {
    id: 'live-9',
    company: 'PhonePe',
    jobTitle: 'Software Engineer - Backend & Payments',
    location: 'Bengaluru, KA',
    workMode: 'On-site',
    experienceLevel: '1-3 yrs',
    salaryMin: 1400000,
    salaryMax: 2000000,
    postedDate: '3 days ago',
    source: 'PhonePe Careers',
    skills: ['Java', 'Spring Boot', 'MySQL', 'Kafka', 'Redis'],
    recruiterName: 'Divya Srinivasan',
    recruiterEmail: 'divya.s@phonepe.com',
    jobUrl: 'https://www.phonepe.com/careers/',
    jobDescription: 'Build high-speed payment processing pipelines handling over 50 million daily UPI transactions.'
  },
  {
    id: 'live-10',
    company: 'Cognizant',
    jobTitle: 'Programmer Analyst - Web Services',
    location: 'Chennai / Hyderabad',
    workMode: 'Remote',
    experienceLevel: 'Fresher / Entry Level',
    salaryMin: 450000,
    salaryMax: 680000,
    postedDate: '1 week ago',
    source: 'Cognizant Portal',
    skills: ['JavaScript', 'React', 'HTML/CSS', 'SQL'],
    recruiterName: 'Venkatesh Rao',
    recruiterEmail: 'v.rao@cognizant.com',
    jobUrl: 'https://www.cognizant.com/careers',
    jobDescription: 'Analyze business requirements, write maintainable code, and conduct unit testing for healthcare cloud portals.'
  }
];

export const LiveJobSearchPage = () => {
  const { applications, addLiveJobToTracker } = useApplications();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [workModeFilter, setWorkModeFilter] = useState('All');
  const [expFilter, setExpFilter] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Filtered Job Results
  const filteredJobs = liveJobDatabase.filter(job => {
    if (locationFilter !== 'All' && !job.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
    if (workModeFilter !== 'All' && job.workMode !== workModeFilter) return false;
    if (expFilter !== 'All' && !job.experienceLevel.toLowerCase().includes(expFilter.toLowerCase())) return false;
    if (selectedSkill && !job.skills.includes(selectedSkill)) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchCompany = job.company.toLowerCase().includes(q);
      const matchTitle = job.jobTitle.toLowerCase().includes(q);
      const matchSkill = job.skills.some(s => s.toLowerCase().includes(q));
      if (!matchCompany && !matchTitle && !matchSkill) return false;
    }

    return true;
  });

  const allSkills = Array.from(new Set(liveJobDatabase.flatMap(j => j.skills)));

  const isTracked = (job) => {
    return applications.some(a => a.company.toLowerCase() === job.company.toLowerCase() && a.jobTitle.toLowerCase() === job.jobTitle.toLowerCase());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live Job Intelligence Search</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Real-Time Job Directory</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Search active positions across India's top product & IT companies. Add directly to your tracker.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 space-y-3 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Search Query */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by job title, skill or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Work Mode */}
          <select
            value={workModeFilter}
            onChange={(e) => setWorkModeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Work Modes</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>

          {/* Location */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Locations</option>
            <option value="Chennai">Chennai</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Gurugram">Gurugram</option>
            <option value="Mumbai">Mumbai</option>
          </select>

          {/* Experience Level */}
          <select
            value={expFilter}
            onChange={(e) => setExpFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-surface-50 dark:bg-surface-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Experience Levels</option>
            <option value="Fresher">Fresher / Graduate</option>
            <option value="Mid">Mid Level (1-3 yrs)</option>
            <option value="2+">Senior Level</option>
          </select>
        </div>

        {/* Skill Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar">
          <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
            <Tag className="w-3 h-3" /> Tech Stack:
          </span>
          {allSkills.map(skill => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border transition-all ${
                selectedSkill === skill
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-surface-100 dark:bg-surface-800 text-muted-foreground border-border hover:text-foreground'
              }`}
            >
              {skill}
            </button>
          ))}
          {(searchQuery || workModeFilter !== 'All' || locationFilter !== 'All' || expFilter !== 'All' || selectedSkill) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setWorkModeFilter('All');
                setLocationFilter('All');
                setExpFilter('All');
                setSelectedSkill(null);
              }}
              className="text-[10px] font-medium text-rose-400 hover:underline ml-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.length === 0 ? (
          <div className="col-span-2 p-12 text-center space-y-3 bg-card border border-border rounded-2xl">
            <Briefcase className="w-8 h-8 text-muted-foreground mx-auto" />
            <h3 className="font-bold text-sm">No jobs match your search filters</h3>
            <p className="text-xs text-muted-foreground">Try clearing filters to explore more opportunities.</p>
          </div>
        ) : (
          filteredJobs.map(job => {
            const salary = formatSalaryDisplay(job.salaryMin, job.salaryMax);
            const tracked = isTracked(job);

            return (
              <div
                key={job.id}
                className="bg-card border border-border rounded-2xl p-5 space-y-4 shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
                        {job.company[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">{job.jobTitle}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5 font-medium">
                          <span className="font-bold text-foreground">{job.company}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                      {job.workMode}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {job.jobDescription}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((s, idx) => (
                      <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-surface-100 dark:bg-surface-800 text-muted-foreground border border-border/60">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Salary & Meta Row */}
                  <div className="pt-2 border-t border-border/40 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <p className="font-bold text-foreground">{salary.primary}</p>
                      <p className="text-[10px] text-muted-foreground font-medium">{salary.secondary}</p>
                    </div>

                    <div className="text-right text-[11px] text-muted-foreground">
                      <p className="flex items-center gap-1 justify-end"><Clock className="w-3 h-3" /> {job.postedDate}</p>
                      <p className="text-[10px] text-primary">{job.source}</p>
                    </div>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-2">
                  <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-accent transition-all"
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {tracked ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Tracked</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => addLiveJobToTracker(job)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-glow-primary hover:bg-primary/90 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Tracker</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
