export function gmailCompose(to, subject = '', body = '') {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to })
  if (subject) params.set('su', subject)
  if (body) params.set('body', body)
  return `https://mail.google.com/mail/?${params}`
}

export const profile = {
  name: 'Kashfa Ahsaan',
  initials: 'KA',
  role: 'Web Developer',
  tagline:
    'I build clean, modern, and user-friendly websites that help businesses grow and leave a lasting impression.',
  location: 'Pakistan',
  email: 'kashfa.ahsaan@gmail.com',
  phone: '+92 309 4642386',
  resumeUrl: '/resume.pdf',
  socials: [
    {
      label: 'GitHub',
      handle: 'github.com/KASHU890',
      url: 'https://github.com/KASHU890',
    },
    {
      label: 'LinkedIn',
      handle: 'linkedin.com/in/kashfaahsaan',
      url: 'https://linkedin.com/',
    },
    {
      label: 'Email',
      handle: 'kashfa.ahsaan@gmail.com',
      url: gmailCompose('kashfa.ahsaan@gmail.com'),
    },
  ],
}

export const about = {
  bio: [
    'Hello! I am Kashfa Ahsaan, a passionate web developer who loves turning ideas into fast, accessible, and beautiful websites. I focus on writing clean code and designing experiences that feel effortless.',
    'I enjoy collaborating with teams, learning new technologies, and solving real-world problems through the web. Every project I take on is an opportunity to craft something the user will genuinely enjoy using.',
  ],
  stats: [
    { value: '5+', label: 'Projects Completed' },
    { value: '8+', label: 'Technologies' },
    { value: '2', label: 'Certifications' },
    { value: '100%', label: 'Dedication' },
  ],
}

export const skills = {
  technical: [
    'HTML5',
    'CSS3',
    'JavaScript (ES6+)',
    'React',
    'Responsive Design',
    'Tailwind CSS',
    'Git & GitHub',
    'UI/UX Basics',
  ],
  soft: [
    'Problem Solving',
    'Teamwork & Collaboration',
    'Communication',
    'Time Management',
    'Attention to Detail',
    'Continuous Learning',
  ],
}

const projectsList = [
  {
    title: 'E-Plant Shopping',
    description:
      'An online plant store with product listings, shopping flow, and a clean, plant-themed responsive design.',
    tech: ['JavaScript', 'CSS3', 'HTML5'],
    link: 'https://github.com/KASHU890/e-plantShopping',
    github: 'https://github.com/KASHU890/e-plantShopping',
    icon: '🪴',
  },
  {
    title: 'Travel Recommendation',
    description:
      'A travel recommendation web app that suggests destinations and presents them in a polished, responsive layout.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    link: 'https://kashu890.github.io/travel-recommendation/',
    github: 'https://github.com/KASHU890/travel-recommendation',
    icon: '✈️',
  },
  {
    title: 'Fullstack Capstone Project',
    description:
      'A complete full-stack capstone project built end-to-end, covering frontend, backend, and API integration.',
    tech: ['JavaScript', 'Full-Stack'],
    link: 'https://github.com/KASHU890/fullstack-capstone-project',
    github: 'https://github.com/KASHU890/fullstack-capstone-project',
    icon: '🎓',
  },
  {
    title: 'Vendors',
    description:
      'A vendor-focused web app for browsing and managing vendor listings with a straightforward, usable interface.',
    tech: ['JavaScript', 'HTML5'],
    link: 'https://kashu890.github.io/vendors/',
    github: 'https://github.com/KASHU890/vendors',
    icon: '🏪',
  },
  {
    title: 'Candy Crush',
    description:
      'A browser-based Candy Crush-style matching game built with JavaScript for smooth, interactive gameplay.',
    tech: ['JavaScript', 'CSS3'],
    link: 'https://kashu890.github.io/candy-crush/',
    github: 'https://github.com/KASHU890/candy-crush',
    icon: '🍬',
  },
  {
    title: 'Space Jumper Game',
    description:
      'A fun jumping arcade game with responsive controls and colorful space-themed visuals.',
    tech: ['HTML5', 'CSS3'],
    link: 'https://kashu890.github.io/space-jumper-game/',
    github: 'https://github.com/KASHU890/space-jumper-game',
    icon: '🚀',
  },
]

export const projects = projectsList.map((project, i) => ({ id: i, ...project }))

export const experience = [
  {
    type: 'work',
    period: '2024 — Present',
    title: 'Web Developer (Fresher)',
    org: 'Freelance & Personal Projects',
    description:
      'Building responsive websites, full-stack projects, and browser-based games — an e-commerce store, a travel recommendation app, matching and arcade games — while growing a portfolio of real-world work.',
  },
  {
    type: 'work',
    period: '2025',
    title: 'Final-Year Project — Web App',
    org: 'University',
    description:
      'Developed a full web application from scratch, applying clean code practices, responsive layouts, and modern JavaScript.',
  },
  {
    type: 'education',
    period: '2020 — 2024',
    title: 'BS Computer Science',
    org: 'University',
    description:
      'Graduated with a focus on web technologies, data structures, and human-computer interaction.',
  },
  {
    type: 'education',
    period: '2022',
    title: 'Responsive Web Design Certification',
    org: 'Online Learning Platform',
    description:
      'Completed an in-depth certification covering modern HTML, CSS, and responsive layout patterns.',
  },
]