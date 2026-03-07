export interface ProjectItem {
  slug: string
  category: string
  title: string
  subtitle: string
  description: string
  image: string
  tags: string[]
  repoUrl?: string
  details?: {
    text: string
    image?: string
    imageAlt?: string
  }[]
}

export const projects: ProjectItem[] = [
  {
    slug: 'llm-specification-generation',
    category: 'Research',
    title: 'LLM-based Program Specification Generation',
    subtitle: 'Formal Methods × AI',
    description:
      'Research pipeline that transforms real-world Python programs and uses LLMs to generate verifiable Dafny specifications. Includes dataset curation, transformation, and automated verification analysis.',
    image: '/images/project-llm.jpg',
    tags: ['LLM', 'Formal Methods', 'Dafny', 'Python'],
    repoUrl: 'https://github.com/wibhi-miasa',
    details: [
      {
        text: 'Bridging the gap between natural language specifications and formally verified code through large language models.',
        image: '/images/project-llm-detail-1.jpg',
        imageAlt: 'LLM pipeline architecture diagram',
      },
      {
        text: 'Automated dataset curation from real Python codebases, with transformation into Dafny-compatible specifications.',
        image: '/images/project-llm-detail-2.jpg',
        imageAlt: 'Code transformation example',
      },
      {
        text: 'Comprehensive verification analysis evaluating the correctness and completeness of generated specifications.',
      },
    ],
  },
  {
    slug: 'aki-prediction',
    category: 'Machine Learning',
    title: 'Early AKI Prediction in ICU',
    subtitle: 'Clinical ML',
    description:
      'Machine learning models to predict acute kidney injury using ICU time-series data (MIMIC-IV), evaluating linear models and tree-based methods with calibration analysis.',
    image: '/images/project-aki.jpg',
    tags: ['MIMIC-IV', 'Clinical ML', 'Python', 'XGBoost'],
    repoUrl: 'https://github.com/wibhi-miasa',
    details: [
      {
        text: 'Leveraging ICU time-series data to build early warning systems for acute kidney injury, a critical clinical outcome.',
        image: '/images/project-aki-detail-1.jpg',
        imageAlt: 'ICU monitoring dashboard',
      },
      {
        text: 'Comparing logistic regression, random forests, and XGBoost with careful calibration analysis using ROC and PR curves.',
        image: '/images/project-aki-detail-2.jpg',
        imageAlt: 'Model performance comparison charts',
      },
    ],
  },
]

export const skills = {
  programming: ['Python', 'JavaScript / TypeScript', 'Dafny', 'React', 'Tailwind CSS'],
  ml: ['Scikit-learn', 'XGBoost', 'Deep Learning', 'Model Evaluation', 'MIMIC-IV'],
  tools: ['Git & GitHub', 'VS Code', 'LaTeX / Overleaf', 'Linux CLI'],
}

export const experience = [
  {
    title: 'Computer Science Research Project',
    org: 'University of Melbourne',
    description: 'LLMs, formal verification, and program transformation',
  },
  {
    title: 'Machine Learning for Health',
    org: 'University of Melbourne',
    description: 'Clinical prediction models using ICU data (e.g., AKI prediction)',
  },
]

export const personalInfo = {
  name: 'Gentha Wibhi Miasa',
  role: 'Computer Science · Machine Learning · Formal Methods',
  location: 'Melbourne, Australia',
  email: 'you@example.com',
  github: 'https://github.com/wibhi-miasa',
  linkedin: 'https://www.linkedin.com',
  bio: `I’m a Master of Computer Science graduate from the University of Melbourne with a strong interest in UI/UX design and human–computer interaction. I enjoy designing digital products that translate complex problems into intuitive and accessible user experiences.`,
  aboutExtended: `Through hackathons and product design competitions, I’ve worked on projects ranging from child health tracking apps and financial planning tools to early dyslexia screening games and interactive product websites. These experiences have allowed me to practice user research, user journey mapping, design iteration, and high-fidelity prototyping using Figma.

I’m particularly interested in human-centered design, where technology, research, and thoughtful design come together to create meaningful solutions. My background in computer science also helps me bridge the gap between design thinking and technical implementation.

I’m currently looking for opportunities in UI/UX design, product design, or interaction design, where I can contribute to building thoughtful digital products and continue learning from experienced teams.`,
}
