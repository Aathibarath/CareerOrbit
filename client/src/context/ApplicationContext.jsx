import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialApplications, initialCompanies, initialContacts, initialInterviews, initialTasks, initialFollowUps } from '../data/initialSeedData.js';

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState(initialApplications);
  const [companies, setCompanies] = useState(initialCompanies);
  const [contacts, setContacts] = useState(initialContacts);
  const [interviews, setInterviews] = useState(initialInterviews);
  const [tasks, setTasks] = useState(initialTasks);
  const [followUps, setFollowUps] = useState(initialFollowUps);

  // Global Modal & Toast UI States
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickAddType, setQuickAddType] = useState('Application');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sidebar Open/Close State (Persisted)
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    try {
      const saved = localStorage.getItem('careerorbit_sidebar');
      return saved !== null && saved !== 'undefined' ? JSON.parse(saved) : true;
    } catch (e) {
      return true;
    }
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => {
      const next = !prev;
      localStorage.setItem('careerorbit_sidebar', JSON.stringify(next));
      return next;
    });
  };

  // Documents State & Handler
  const [documents, setDocuments] = useState([
    { id: 'doc-1', name: 'Software Developer Resume v3.pdf', type: 'Resume', version: 'v3.0', uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), fileType: 'PDF', status: 'Active', isCurrent: true, target: 'React & Frontend Roles' },
    { id: 'doc-2', name: 'Full Stack Developer Resume.pdf', type: 'Resume', version: 'v2.1', uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), fileType: 'PDF', status: 'Active', isCurrent: false, target: 'Full Stack Positions' },
    { id: 'doc-3', name: 'Fresher Software Engineer Resume.pdf', type: 'Resume', version: 'v1.4', uploadDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), fileType: 'PDF', status: 'Archived', isCurrent: false, target: 'Entry Level Jobs' },
    { id: 'doc-4', name: 'Zoho Tailored Cover Letter.docx', type: 'Cover Letter', version: 'v1.0', uploadDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), fileType: 'DOCX', status: 'Active', isCurrent: true, target: 'Zoho Application' },
  ]);

  const addDocument = (docObj) => {
    const newDoc = {
      id: 'doc-' + Date.now(),
      name: docObj.name || 'New Resume Version.pdf',
      type: docObj.type || 'Resume',
      version: `v${(documents.filter(d => d.type === 'Resume').length + 1).toFixed(1)}`,
      uploadDate: new Date(),
      fileType: docObj.name?.endsWith('.docx') ? 'DOCX' : 'PDF',
      status: 'Active',
      isCurrent: true,
      target: docObj.target || 'General Application'
    };

    // Update old resumes so new one is marked current
    setDocuments(prev => prev.map(d => d.type === newDoc.type ? { ...d, isCurrent: false } : d));
    setDocuments(prev => [newDoc, ...prev]);
    showToast('New resume version uploaded successfully.');
    return newDoc;
  };

  const deleteDocument = (docId) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
    showToast('Document removed.');
  };

  // Live Job Search helper
  const addLiveJobToTracker = (job) => {
    return addApplication({
      company: job.company,
      jobTitle: job.jobTitle,
      location: job.location,
      workMode: job.workMode,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      currency: 'INR',
      source: job.source || 'Live Search',
      jobDescription: job.jobDescription || `Role at ${job.company}`,
      recruiterName: job.recruiterName || '',
      recruiterEmail: job.recruiterEmail || '',
      jobUrl: job.jobUrl || '',
      stage: 'Wishlist',
      priority: 'Medium'
    });
  };

  // Notifications List
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'Interview Final Round Tomorrow', text: 'Zoho final round scheduled for 2:30 PM IST', type: 'interview', time: '1h ago', unread: true },
    { id: 'n2', title: 'Follow-up Due', text: 'Follow up with Neha Verma at TCS (Pending 22 days)', type: 'followup', time: '3h ago', unread: true },
    { id: 'n3', title: 'Assessment Deadline Approaching', text: 'Razorpay HackerRank coding assessment due in 3 days', type: 'task', time: '5h ago', unread: false },
  ]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Applications CRUD & Kanban Drag/Drop
  const addApplication = (appData) => {
    const newApp = {
      id: 'app-' + Date.now(),
      company: appData.company || 'New Tech Co',
      jobTitle: appData.jobTitle || 'Software Engineer',
      location: appData.location || 'Remote',
      workMode: appData.workMode || 'Remote',
      employmentType: appData.employmentType || 'Full-Time',
      salaryMin: Number(appData.salaryMin) || 0,
      salaryMax: Number(appData.salaryMax) || 0,
      currency: appData.currency || 'USD',
      applicationDate: new Date(),
      deadline: appData.deadline ? new Date(appData.deadline) : null,
      stage: appData.stage || 'Applied',
      priority: appData.priority || 'Medium',
      source: appData.source || 'LinkedIn',
      recruiterName: appData.recruiterName || '',
      recruiterEmail: appData.recruiterEmail || '',
      jobDescription: appData.jobDescription || '',
      notes: appData.notes || '',
      resumeUsed: appData.resumeUsed || 'Software Engineer Resume v2.pdf',
      coverLetterUsed: appData.coverLetterUsed || 'Tech Cover Letter.pdf',
      tags: appData.tags ? (Array.isArray(appData.tags) ? appData.tags : appData.tags.split(',')) : ['New'],
      isFavorite: false,
      isArchived: false,
      timeline: [
        { id: 't-' + Date.now(), title: 'Application Created', description: 'Application added to your orbit', type: 'created', date: new Date() }
      ]
    };

    setApplications(prev => [newApp, ...prev]);
    showToast(`Application added for ${newApp.jobTitle} at ${newApp.company}!`);
    return newApp;
  };

  const updateApplication = (id, updatedFields) => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        const updated = { ...app, ...updatedFields };
        if (updatedFields.stage && updatedFields.stage !== app.stage) {
          updated.timeline = [
            ...(app.timeline || []),
            {
              id: 't-' + Date.now(),
              title: `Stage Moved → ${updatedFields.stage}`,
              description: `Status changed from ${app.stage} to ${updatedFields.stage}`,
              type: 'stage_change',
              date: new Date()
            }
          ];
        }
        return updated;
      }
      return app;
    }));
    showToast('Application updated successfully');
  };

  const updateApplicationStage = (id, newStage) => {
    let movedApp = null;
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        movedApp = app;
        return {
          ...app,
          stage: newStage,
          timeline: [
            ...(app.timeline || []),
            {
              id: 't-' + Date.now(),
              title: `Stage Moved → ${newStage}`,
              description: `Status updated from ${app.stage} to ${newStage}`,
              type: 'stage_change',
              date: new Date()
            }
          ]
        };
      }
      return app;
    }));
    if (movedApp) {
      showToast(`Moved ${movedApp.company} application to ${newStage}`);
    }
  };

  const deleteApplication = (id) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    showToast('Application removed');
  };

  const toggleFavorite = (id) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, isFavorite: !app.isFavorite } : app));
  };

  // Task & Interview Handlers
  const addTask = (taskData) => {
    const newTask = {
      id: 'task-' + Date.now(),
      company: taskData.company || 'General',
      title: taskData.title,
      description: taskData.description || '',
      dueDate: new Date(taskData.dueDate || Date.now() + 2 * 24 * 60 * 60 * 1000),
      priority: taskData.priority || 'Medium',
      status: 'Todo'
    };
    setTasks(prev => [newTask, ...prev]);
    showToast(`Task added: "${newTask.title}"`);
  };

  const toggleTaskStatus = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'Completed' ? 'Todo' : 'Completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const addInterview = (interviewData) => {
    const newInt = {
      id: 'int-' + Date.now(),
      applicationId: interviewData.applicationId || 'app-1',
      company: interviewData.company || 'Tech Co',
      jobTitle: interviewData.jobTitle || 'Software Engineer',
      interviewType: interviewData.interviewType || 'Technical Round',
      date: new Date(interviewData.date || Date.now() + 3 * 24 * 60 * 60 * 1000),
      time: interviewData.time || '11:00 AM',
      meetingLink: interviewData.meetingLink || '',
      interviewerName: interviewData.interviewerName || '',
      roundNumber: Number(interviewData.roundNumber) || 1,
      status: 'Scheduled',
      prepChecklist: [
        { text: 'Research company core products', completed: false },
        { text: 'Review job description & requirements', completed: false },
        { text: 'Prepare STAR method behavioral answers', completed: false }
      ],
      questionsToAsk: ['What is the engineering team culture like?'],
      notes: ''
    };
    setInterviews(prev => [newInt, ...prev]);
    showToast(`Interview scheduled with ${newInt.company}!`);
  };

  const toggleInterviewChecklist = (interviewId, itemIndex) => {
    setInterviews(prev => prev.map(i => {
      if (i.id === interviewId) {
        const updatedList = [...i.prepChecklist];
        updatedList[itemIndex].completed = !updatedList[itemIndex].completed;
        return { ...i, prepChecklist: updatedList };
      }
      return i;
    }));
  };

  // Contacts & Companies Handlers
  const addContact = (contactData) => {
    const newContact = {
      id: 'cont-' + Date.now(),
      name: contactData.name,
      role: contactData.role || 'Recruiter',
      company: contactData.company || 'Company',
      email: contactData.email || '',
      phone: contactData.phone || '',
      linkedIn: contactData.linkedIn || '',
      relationship: contactData.relationship || 'Recruiter',
      lastContactDate: new Date(),
      notes: contactData.notes || ''
    };
    setContacts(prev => [newContact, ...prev]);
    showToast(`Contact saved: ${newContact.name}`);
  };

  const addCompany = (companyData) => {
    const newComp = {
      id: 'comp-' + Date.now(),
      name: companyData.name,
      industry: companyData.industry || 'Technology',
      website: companyData.website || '',
      location: companyData.location || 'Remote',
      companySize: companyData.companySize || '201-1000',
      rating: companyData.rating || 4.5,
      notes: companyData.notes || ''
    };
    setCompanies(prev => [newComp, ...prev]);
    showToast(`Company added: ${newComp.name}`);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Keyboard shortcut listener for Global Search ('/') and Quick Add ('N')
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
      }
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setQuickAddType('Application');
        setIsQuickAddOpen(true);
      }
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ApplicationContext.Provider value={{
      applications,
      companies,
      contacts,
      interviews,
      tasks,
      followUps,
      notifications,
      isQuickAddOpen,
      setIsQuickAddOpen,
      quickAddType,
      setQuickAddType,
      isSearchOpen,
      setIsSearchOpen,
      isNotificationOpen,
      setIsNotificationOpen,
      toastMessage,
      showToast,
      addApplication,
      updateApplication,
      updateApplicationStage,
      deleteApplication,
      toggleFavorite,
      addTask,
      toggleTaskStatus,
      addInterview,
      toggleInterviewChecklist,
      addContact,
      isSidebarOpen,
      setIsSidebarOpen,
      toggleSidebar,
      documents,
      addDocument,
      deleteDocument,
      addLiveJobToTracker,
      markNotificationRead,
      markAllNotificationsRead
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => useContext(ApplicationContext);
