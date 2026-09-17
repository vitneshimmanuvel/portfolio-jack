export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
  tech: string[];
}

export interface Project {
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: string[];
}

export const PERSONAL_INFO = {
  name: 'Vitnesh Immanuvel',
  role: 'Full Stack Software Developer',
  phone: '7339121049',
  email: 'vitneshimmanuvel@gmail.com',
  github: 'https://github.com/vitneshimmanuvel',
  linkedin: 'https://www.linkedin.com/in/vitnesh-immanuvel-712636267/',
  summary:
    'Full Stack Developer with 1+ year of experience building and shipping web and mobile applications using JavaScript, TypeScript, React, Node.js, Express.js, PostgreSQL, and Flutter. Skilled in developing internal business dashboards, lead management systems, CMS-driven websites, RESTful APIs, authentication, role-based access control (RBAC), CI/CD pipelines via GitHub Actions, and end-to-end production deployment via Vercel and Render.',
};

export const STATS = [
  { label: 'Experience', value: '1+ Yr' },
  { label: 'Production Apps', value: '3+' },
  { label: 'Daily Active Users', value: '100+' },
  { label: 'Error Reduction', value: '40%' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    iconName: 'Code',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'SQL'],
  },
  {
    title: 'Frontend & Mobile',
    iconName: 'Layout',
    skills: ['React.js', 'Flutter', 'Vite', 'Tailwind CSS', 'HTML5 / CSS3'],
  },
  {
    title: 'Backend & APIs',
    iconName: 'Server',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'Microservice Patterns'],
  },
  {
    title: 'Databases & ORM',
    iconName: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'GraphQL', 'Prisma ORM'],
  },
  {
    title: 'DevOps & CI/CD',
    iconName: 'GitBranch',
    skills: ['Git', 'GitHub', 'GitHub Actions', 'CI/CD Automation', 'Vercel', 'Render'],
  },
  {
    title: 'Security & Auth',
    iconName: 'ShieldCheck',
    skills: ['JWT Authentication', 'bcrypt', 'Role-Based Access Control (RBAC)', 'OAuth Concepts'],
  },
  {
    title: 'Cloud & Media',
    iconName: 'Cloud',
    skills: ['Cloudinary API', 'Google Play Console', 'REST Client (Axios)', 'Linux / Bash'],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Software Developer',
    company: 'Settlo Tech Solutions',
    period: 'May 2025 – Present',
    location: 'Erode, Tamil Nadu, India',
    type: 'On-site',
    highlights: [
      'Serve as tech lead on a location-intelligence product, guiding technical decisions and mentoring team members on delivery timelines.',
      'Developed and deployed 3+ full-stack web applications using React, Node.js, Express.js, and PostgreSQL, serving 100+ daily active users.',
      'Built secure RESTful APIs with JWT authentication, RBAC, and Prisma ORM for high-reliability database operations.',
      'Developed cross-platform mobile applications using Flutter and integrated them with backend micro-APIs.',
      'Implemented automated CI/CD pipelines using GitHub Actions integrated with Vercel and Render for frictionless zero-downtime deployments.',
      'Owned application debugging, automated testing, and production issue resolution, reducing deployment failures by 30%.',
    ],
    tech: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Flutter', 'GitHub Actions', 'Vercel', 'Render'],
  },
  {
    role: 'Junior Software Engineer (Intern)',
    company: 'VTS Enterprises India Pvt. Ltd.',
    period: 'Jul 2024 – Feb 2025',
    location: 'Chennai, Tamil Nadu, India',
    type: 'On-site',
    highlights: [
      'Built and delivered features across 4+ web and mobile projects in an Agile/Scrum engineering environment.',
      'Gained hands-on experience with cloud-based deployment workflows and server infrastructure management.',
      'Collaborated closely with cross-functional engineering teams on client and internal products from architectural development through release.',
    ],
    tech: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Agile / Scrum', 'Cloud Deployment'],
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'Internal Lead & Operations Dashboard',
    subtitle: 'Centralized CRM & Pipeline Management',
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'JWT'],
    description:
      'Engineered an enterprise-grade dashboard managing 500+ active leads/month with fully configurable pipelines, custom fields, and real-time stage tracking.',
    highlights: [
      'Implemented robust Role-Based Access Control (RBAC) for Admin, Manager, and Visitor roles with stateless JWT verification.',
      'Integrated lead activity logs, audit note tracking, duplicate detection, and automated data validation.',
      'Decreased manual business data entry errors by 40% across internal operations.',
    ],
  },
  {
    title: 'Digital Record Management Platform',
    subtitle: 'Multi-Register Business Record Platform & Android App',
    tags: ['React', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Flutter'],
    description:
      'Developed a centralized cloud record management platform featuring multi-register data architecture, robust backup systems, and mobile companion app.',
    highlights: [
      'Implemented high-speed Excel/PDF data import-export, automated backups, and soft-delete recycle-bin architecture for 1,000+ business records.',
      'Architected granular RBAC for secure multi-tenant data access control.',
      'Built and packaged cross-platform mobile application for Android distributed via Google Play Console.',
    ],
  },
  {
    title: 'Sparkling Events — Dynamic CMS & Event Platform',
    subtitle: 'Full-Stack Showcase & Media Management CMS',
    tags: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Cloudinary API', 'JWT', 'CI/CD'],
    description:
      'Engineered a high-performance modern web application featuring dynamic event showcase components, custom pricing calculators, and responsive visual galleries.',
    highlights: [
      'Built a centralized administrative panel with secure JWT/RBAC for dynamic content, pricing tier updates, and real-time gallery management.',
      'Designed a Node.js/Express backend with PostgreSQL database and Cloudinary API for high-resolution media compression and uploads.',
      'Deployed via Vercel with automated GitHub Actions CI/CD pipelines enabling zero-downtime content publishing.',
    ],
    liveUrl: 'https://sparklingentertainments.in',
  },
];

export const EDUCATION = {
  degree: 'Bachelor of Engineering — Computer Science and Engineering',
  institution: 'Builders Engineering College',
  period: '2021 – 2025',
  cgpa: '7.2 / 10',
};

export const INTERESTS = [
  'Ball Pen Art',
  'Video Editing',
  'AI-Assisted Development',
  'Backend Architecture',
  'Cloud & Application Deployment',
  'Exploring New Technologies',
];
