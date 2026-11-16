export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

export interface Project {
  title: string;
  domain: string;
  description: string;
  highlights: string[];
  contribution: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: string[];
}

export interface ServiceCapability {
  title: string;
  iconName: string;
  items: string[];
}

export const PERSONAL_INFO = {
  name: 'Vitnesh Immanuvel',
  role: 'Full-Stack Software Developer | Web & Mobile Application Developer | AI Solutions Developer',
  tagline: 'Building Digital Products. Solving Real Problems. Turning Ideas into Applications.',
  phone: '7339121049',
  email: 'vitneshimmanuvel@gmail.com',
  location: 'Erode, Tamil Nadu, India',
  github: 'https://github.com/vitneshimmanuvel',
  linkedin: 'https://www.linkedin.com/in/vitnesh-immanuvel-712636267/',
  summary:
    "I'm Vitnesh Immanuvel, a Full-Stack Software Developer with ~1.5 years of experience building modern web applications, backend APIs, Flutter mobile apps, and AI-powered business solutions—taking products from business requirements and workflows through database design to cloud deployment.",
  summaryDetail:
    'Contributed across real-world domains including HR management, real estate, document collaboration, food & beverage CRM, cloud serverless systems, and 3D interior visualization—pairing reliable full-stack engineering with next-generation websites and workflow automation.',
};

export const STATS = [
  { label: 'Experience', value: '1.5+ Yrs' },
  { label: 'Featured Projects', value: '7+' },
  { label: 'Industry Domains', value: '6+' },
  { label: 'Core Focus', value: 'Web • Mobile • AI' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    iconName: 'Code',
    skills: ['JavaScript', 'Dart', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frontend Development',
    iconName: 'Layout',
    skills: [
      'React.js',
      'Vite',
      'Tailwind CSS',
      'Responsive Web Development',
      'Component-Based Architecture',
      'API Integration',
      'State Management',
    ],
  },
  {
    title: 'Backend Development',
    iconName: 'Server',
    skills: [
      'Node.js',
      'Express.js',
      'REST API Development',
      'Backend Application Architecture',
      'Authentication & Authorization',
      'Middleware Development',
      'Third-Party API Integration',
    ],
  },
  {
    title: 'Database Technologies',
    iconName: 'Database',
    skills: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Database Schema Design',
      'SQL Queries',
      'CRUD Operations',
      'Database Integration',
    ],
  },
  {
    title: 'Mobile Application Development',
    iconName: 'Smartphone',
    skills: [
      'Flutter',
      'Dart',
      'Cross-Platform Development',
      'Firebase Integration',
      'REST API Integration',
      'Mobile Application Workflows',
    ],
  },
  {
    title: 'AI & Automation',
    iconName: 'BrainCircuit',
    skills: [
      'AI API Integration',
      'Large Language Model Integration',
      'AI-Powered Application Features',
      'RAG Concepts',
      'Vector Database Concepts',
      'Workflow Automation',
    ],
  },
  {
    title: 'Cloud & Development Tools',
    iconName: 'Cloud',
    skills: [
      'AWS',
      'Vercel',
      'Firebase',
      'Git',
      'GitHub',
      'Postman',
      'Environment Configuration',
      'Application Deployment',
      'Domain & Hosting Configuration',
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Software Developer',
    company: 'Settlo Tech Solutions',
    period: 'May 2025 – Nov 2026',
    location: 'Erode, Tamil Nadu, India',
    type: 'Full-Time • ~1.5 Years',
    summary:
      'Worked on full-stack software development involving web applications, mobile applications, backend systems, database integration, AI-powered features, and business-oriented platforms.',
    highlights: [
      'Developed responsive frontend applications using React.js, JavaScript, HTML5, CSS3, and Tailwind CSS.',
      'Built backend REST APIs and scalable application services using Node.js and Express.js.',
      'Designed and integrated SQL databases (PostgreSQL, MySQL) and MongoDB for reliable application data management.',
      'Translated business requirements and operational workflows into complete full-stack application modules.',
      'Contributed to cross-platform Flutter mobile application development and backend REST API integration.',
      'Implemented authentication, role-based user permissions, and secure application access management.',
      'Integrated Firebase, AWS cloud services, and third-party APIs across production business solutions.',
      'Managed production deployment, domain/hosting configuration, and environment setup using Git and GitHub.',
      'Worked on AI integrations and explored LLM-powered application features and workflow automation.',
      'Handled end-to-end development responsibilities and ownership across multiple concurrent business projects.',
    ],
    tech: [
      'React.js',
      'JavaScript',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'MongoDB',
      'Flutter',
      'Firebase',
      'AWS',
      'AI APIs',
      'Git & GitHub',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'Settlo HR Management Platform',
    domain: 'Human Resources / Business Management',
    description:
      'A web-based HR management platform designed to organize employee information, company operations, HR policies, and multi-role administrative workflows.',
    highlights: [
      'Employee & company/organization management modules',
      'Multiple user roles, access control & HR policy management',
      'End-to-end administrative workflows with database-driven backend integration',
    ],
    contribution: 'Full-stack application development and implementation of business-specific modules.',
    tags: ['React.js', 'JavaScript', 'Node.js', 'Express.js', 'PostgreSQL'],
  },
  {
    title: 'PropertyDocks',
    domain: 'Real Estate / Property Technology',
    description:
      'A property-focused digital platform designed to simplify property discovery and connect users with property opportunities through a zero-brokerage approach.',
    highlights: [
      'Property listing, discovery & property information management',
      'Responsive user-facing web interfaces and structured application workflows',
      'Full backend API integration and production deployment on Vercel',
    ],
    contribution: 'Application development and implementation of property-related features.',
    tags: ['JavaScript', 'React.js', 'Backend APIs', 'Vercel'],
    liveUrl: 'https://propertydocks.com',
  },
  {
    title: 'Liblist',
    domain: 'Document Management / Productivity',
    description:
      'A document-focused productivity application designed around structured document management, notes, annotations, and collaboration workflows.',
    highlights: [
      'Document management, notes & annotations workflows',
      'Seamless frontend and backend data synchronization',
      'Scalable application data management deployed on Vercel',
    ],
    contribution: 'Frontend and backend development, application module implementation, and ongoing product development.',
    tags: ['React.js', 'Node.js', 'Express.js', 'Database Integration', 'Vercel'],
  },
  {
    title: 'Donmar Food',
    domain: 'Food & Beverage / Business Operations',
    description:
      'A business-oriented digital solution built to support food and beverage product operations and streamlined information workflows.',
    highlights: [
      'Business-focused digital operations & product information management',
      'Application and service integrations for operational process support',
      'Reliable technical workflow implementation tailored to domain needs',
    ],
    contribution: 'Software development and technical implementation.',
    tags: ['Business Workflows', 'Product Management', 'Service Integrations'],
  },
  {
    title: 'U-Turn Application',
    domain: 'Business Application / Cloud-Based Services',
    description:
      'A cloud-connected business application leveraging serverless backend services, scalable NoSQL storage, and AWS cloud event integrations.',
    highlights: [
      'Backend services built with Node.js and AWS Lambda runtime',
      'NoSQL data storage and object media handling with DynamoDB and Amazon S3',
      'Automated event messaging and notifications using Amazon SNS',
    ],
    contribution: 'Backend development and integration of cloud-based services.',
    tags: ['Node.js', 'AWS Lambda', 'DynamoDB', 'Amazon S3', 'Amazon SNS'],
  },
  {
    title: 'Thambi Oru Tea',
    domain: 'Food & Beverage / Mobile Application',
    description:
      'A dedicated mobile application and CRM solution engineered to support food & beverage operations and customer relationship workflows.',
    highlights: [
      'Cross-platform mobile application development',
      'Integrated CRM workflows and backend API synchronization',
      'End-to-end application testing and production deployment',
    ],
    contribution: 'Application development and deployment.',
    tags: ['Flutter', 'CRM Workflows', 'Backend Integration', 'Deployment'],
  },
  {
    title: 'Home Interiors / 3D Studio',
    domain: 'Interior Design / Visualization',
    description:
      'An interactive interior design visualization experience enabling image-based room selection, color customization, and 3D Studio product workflows.',
    highlights: [
      'Home interior visualization and interactive selected-image workflows',
      'Real-time color customization and visual product selection',
      '3D Studio-oriented frontend interactivity and customization engine',
    ],
    contribution: 'Development of frontend functionality and customization workflows.',
    tags: ['3D Studio', 'Visualization', 'Color Customization', 'Frontend Workflows'],
  },
];

export const WHAT_I_BUILD: ServiceCapability[] = [
  {
    title: 'Custom Web Applications',
    iconName: 'Layout',
    items: [
      'Astounding business websites',
      'Admin dashboards & SaaS apps',
      'Customer portals & management systems',
    ],
  },
  {
    title: 'Backend & Cloud APIs',
    iconName: 'Server',
    items: [
      'REST APIs & authentication systems',
      'SQL & NoSQL database architecture',
      'AWS, Firebase & third-party services',
    ],
  },
  {
    title: 'Mobile & AI Solutions',
    iconName: 'BrainCircuit',
    items: [
      'Cross-platform Flutter mobile apps',
      'AI / LLM API & document tools',
      'HR, CRM & workflow automation',
    ],
  },
];

export const DEVELOPMENT_APPROACH = [
  { step: '01', title: 'Requirement Understanding', desc: 'Understand business goals, users & expected workflows.' },
  { step: '02', title: 'Planning', desc: 'Define architecture, application modules & technical stack.' },
  { step: '03', title: 'Development', desc: 'Build clean frontend, backend APIs & database schemas.' },
  { step: '04', title: 'Integration', desc: 'Connect APIs, databases, cloud & third-party services.' },
  { step: '05', title: 'Testing', desc: 'Validate workflows, edge cases & system reliability.' },
  { step: '06', title: 'Deployment', desc: 'Configure domains, environments & cloud hosting.' },
  { step: '07', title: 'Maintenance', desc: 'Monitor, optimize & extend features as products scale.' },
];

export const WHY_WORK_WITH_ME = [
  'End-to-end full-stack ownership across web, backend & Flutter mobile',
  '1.5+ years building real-world apps across HR, Real Estate, Docs, Food & Cloud',
  'Strong SQL (PostgreSQL, MySQL) & NoSQL (MongoDB, DynamoDB, Firebase) skills',
  'Practical AI / LLM integration & technical workflow automation experience',
  'Business-first engineering mindset focused on clean execution & continuous growth',
];

export const EDUCATION = {
  degree: 'Bachelor of Engineering — Computer Science and Engineering',
  institution: 'Builders Engineering College (Kangeyam Group of Institutions)',
  affiliation: 'Anna University Affiliated Institution',
  graduated: 'May 2025',
  objective:
    'I aim to grow as a strong software engineer by building scalable applications, strengthening system design and engineering fundamentals, collaborating with talented teams, and taking ownership of challenging real-world technical problems.',
};

export const AVAILABILITY_MODES = [
  'Full-Time Opportunities',
  'Freelance Projects',
  'Contract Development',
  'Technical Collaboration',
];
