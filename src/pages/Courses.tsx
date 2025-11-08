import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExternalLink, Search, BookOpen, Clock, Award, GraduationCap, ArrowLeft, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const coursesData = [
  // Existing courses (1-8)
  {
    id: 1,
    name: "Full Stack Web Development",
    eligibility: "12th Pass / Any Graduate",
    duration: "6 months",
    colleges: ["Coursera", "Udemy", "edX"],
    category: "Technology",
    level: "Beginner to Advanced",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more",
    link: "https://www.coursera.org/specializations/meta-full-stack-developer"
  },
  {
    id: 2,
    name: "Data Science & Machine Learning",
    eligibility: "Graduate (Any Stream)",
    duration: "8 months",
    colleges: ["IIT Madras Online", "upGrad", "Great Learning"],
    category: "Technology",
    level: "Intermediate",
    description: "Master Python, ML algorithms, and data visualization",
    link: "https://www.coursera.org/professional-certificates/ibm-data-science"
  },
  {
    id: 3,
    name: "Digital Marketing",
    eligibility: "12th Pass",
    duration: "3 months",
    colleges: ["Google Digital Garage", "HubSpot Academy", "Simplilearn"],
    category: "Business",
    level: "Beginner",
    description: "SEO, social media marketing, content marketing, and analytics",
    link: "https://learndigital.withgoogle.com/digitalgarage"
  },
  {
    id: 4,
    name: "Graphic Design & UI/UX",
    eligibility: "10th Pass",
    duration: "4 months",
    colleges: ["Coursera", "Udemy", "Skillshare"],
    category: "Creative",
    level: "Beginner to Intermediate",
    description: "Adobe suite, Figma, design principles, and user research",
    link: "https://www.coursera.org/specializations/graphic-design"
  },
  {
    id: 5,
    name: "Financial Planning & Analysis",
    eligibility: "Graduate (Commerce/Any)",
    duration: "6 months",
    colleges: ["NSE Academy", "NISM", "ICE"],
    category: "Finance",
    level: "Intermediate",
    description: "Investment planning, portfolio management, financial analysis",
    link: "https://www.nseindia.com/learn/self-study-ncfm-modules-all"
  },
  {
    id: 6,
    name: "Content Writing & Copywriting",
    eligibility: "12th Pass",
    duration: "2 months",
    colleges: ["Udemy", "Coursera", "LinkedIn Learning"],
    category: "Creative",
    level: "Beginner",
    description: "SEO writing, creative writing, blogging, and storytelling",
    link: "https://www.udemy.com/topic/content-writing/"
  },
  {
    id: 7,
    name: "Cybersecurity Fundamentals",
    eligibility: "Graduate (IT/Any)",
    duration: "5 months",
    colleges: ["EC-Council", "Coursera", "Cybrary"],
    category: "Technology",
    level: "Intermediate to Advanced",
    description: "Network security, ethical hacking, cryptography",
    link: "https://www.coursera.org/specializations/intro-cyber-security"
  },
  {
    id: 8,
    name: "Video Editing & Production",
    eligibility: "10th Pass",
    duration: "3 months",
    colleges: ["Udemy", "LinkedIn Learning", "Skillshare"],
    category: "Creative",
    level: "Beginner",
    description: "Adobe Premiere Pro, Final Cut Pro, video storytelling",
    link: "https://www.udemy.com/topic/video-editing/"
  },

  // ---- Technology & Programming ----
  {
    id: 9,
    name: "C Programming Language",
    eligibility: "12th Pass / Any Graduate",
    duration: "4 weeks",
    colleges: ["freeCodeCamp", "Coursera", "edX"],
    category: "Technology",
    level: "Beginner",
    description: "Master C programming fundamentals, pointers, memory management, and data structures",
    link: "https://www.edx.org/learn/c-programming"
  },
  {
    id: 10,
    name: "Python for Everybody",
    eligibility: "12th Pass",
    duration: "3 months",
    colleges: ["Coursera", "freeCodeCamp", "edX"],
    category: "Technology",
    level: "Beginner",
    description: "Learn Python programming from scratch with hands-on projects",
    link: "https://www.coursera.org/specializations/python"
  },
  {
    id: 11,
    name: "Java Programming Masterclass",
    eligibility: "12th Pass / Any Graduate",
    duration: "5 months",
    colleges: ["Udemy", "Coursera", "Oracle"],
    category: "Technology",
    level: "Beginner to Intermediate",
    description: "Complete Java development course covering OOP, collections, and frameworks",
    link: "https://www.udemy.com/course/java-the-complete-java-developer-course/"
  },
  {
    id: 12,
    name: "JavaScript Algorithms and Data Structures",
    eligibility: "12th Pass",
    duration: "6 weeks",
    colleges: ["freeCodeCamp", "Udemy", "Coursera"],
    category: "Technology",
    level: "Beginner",
    description: "Master JavaScript fundamentals, algorithms, and data structures",
    link: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/"
  },
  {
    id: 13,
    name: "React - The Complete Guide",
    eligibility: "12th Pass / Any Graduate",
    duration: "4 months",
    colleges: ["Udemy", "Coursera", "freeCodeCamp"],
    category: "Technology",
    level: "Intermediate",
    description: "Build modern web applications with React, hooks, and Redux",
    link: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/"
  },
  {
    id: 14,
    name: "Node.js and Express.js",
    eligibility: "12th Pass / Any Graduate",
    duration: "3 months",
    colleges: ["freeCodeCamp", "Udemy", "Coursera"],
    category: "Technology",
    level: "Intermediate",
    description: "Learn backend development with Node.js, Express, and MongoDB",
    link: "https://www.freecodecamp.org/learn/back-end-development-and-apis/"
  },
  {
    id: 15,
    name: "Docker and Kubernetes",
    eligibility: "Graduate (IT/Any)",
    duration: "2 months",
    colleges: ["Coursera", "Udemy", "Microsoft Learn"],
    category: "Technology",
    level: "Intermediate",
    description: "Containerization and orchestration with Docker and Kubernetes",
    link: "https://www.coursera.org/specializations/certified-kubernetes-application-developer-ckad-course"
  },
  {
    id: 16,
    name: "Git and GitHub",
    eligibility: "12th Pass",
    duration: "3 hours",
    colleges: ["freeCodeCamp", "GitHub", "Udemy"],
    category: "Technology",
    level: "Beginner",
    description: "Version control with Git and collaboration on GitHub",
    link: "https://www.freecodecamp.org/learn/relational-database/"
  },
  {
    id: 17,
    name: "SQL for Data Science",
    eligibility: "12th Pass",
    duration: "4 weeks",
    colleges: ["Coursera", "Kaggle", "freeCodeCamp"],
    category: "Technology",
    level: "Beginner",
    description: "Master SQL queries, joins, and database management",
    link: "https://www.coursera.org/learn/sql-for-data-science"
  },
  {
    id: 18,
    name: "System Design",
    eligibility: "Graduate (IT/Any)",
    duration: "2 months",
    colleges: ["Coursera", "Educative", "Udemy"],
    category: "Technology",
    level: "Advanced",
    description: "Design scalable systems, microservices, and distributed architectures",
    link: "https://www.coursera.org/specializations/software-design-architecture"
  },
  {
    id: 19,
    name: "Mobile App Development with Flutter",
    eligibility: "12th Pass / Any Graduate",
    duration: "4 months",
    colleges: ["Udemy", "Coursera", "Google"],
    category: "Technology",
    level: "Intermediate",
    description: "Build cross-platform mobile apps with Flutter and Dart",
    link: "https://www.udemy.com/course/flutter-bootcamp-with-dart/"
  },
  {
    id: 20,
    name: "iOS Development with Swift",
    eligibility: "12th Pass / Any Graduate",
    duration: "5 months",
    colleges: ["Apple", "Udemy", "Coursera"],
    category: "Technology",
    level: "Intermediate",
    description: "Create iOS apps using Swift and Xcode",
    link: "https://developer.apple.com/tutorials/app-dev-training"
  },
  {
    id: 21,
    name: "Android Development",
    eligibility: "12th Pass / Any Graduate",
    duration: "5 months",
    colleges: ["Google", "Udemy", "Coursera"],
    category: "Technology",
    level: "Intermediate",
    description: "Build Android apps with Kotlin and Android Studio",
    link: "https://developer.android.com/courses"
  },

  // ---- Data Science & AI ----
  {
    id: 22,
    name: "Machine Learning by Stanford",
    eligibility: "Graduate (Any Stream)",
    duration: "3 months",
    colleges: ["Coursera", "Stanford", "edX"],
    category: "Technology",
    level: "Intermediate",
    description: "Andrew Ng's famous ML course covering algorithms and neural networks",
    link: "https://www.coursera.org/learn/machine-learning"
  },
  {
    id: 23,
    name: "Deep Learning Specialization",
    eligibility: "Graduate (IT/Any)",
    duration: "4 months",
    colleges: ["Coursera", "deeplearning.ai"],
    category: "Technology",
    level: "Advanced",
    description: "Neural networks, CNNs, RNNs, and deep learning applications",
    link: "https://www.coursera.org/specializations/deep-learning"
  },
  {
    id: 24,
    name: "TensorFlow Developer Certificate",
    eligibility: "Graduate (IT/Any)",
    duration: "3 months",
    colleges: ["Coursera", "Google"],
    category: "Technology",
    level: "Intermediate",
    description: "Build and train neural networks with TensorFlow",
    link: "https://www.coursera.org/professional-certificates/tensorflow-in-practice"
  },
  {
    id: 25,
    name: "Data Analysis with Python",
    eligibility: "12th Pass",
    duration: "6 weeks",
    colleges: ["freeCodeCamp", "Kaggle", "Coursera"],
    category: "Technology",
    level: "Beginner",
    description: "Analyze data using pandas, NumPy, and matplotlib",
    link: "https://www.freecodecamp.org/learn/data-analysis-with-python/"
  },
  {
    id: 26,
    name: "Natural Language Processing",
    eligibility: "Graduate (IT/Any)",
    duration: "3 months",
    colleges: ["Coursera", "Udemy", "edX"],
    category: "Technology",
    level: "Advanced",
    description: "NLP techniques, transformers, and language models",
    link: "https://www.coursera.org/specializations/natural-language-processing"
  },
  {
    id: 27,
    name: "Computer Vision",
    eligibility: "Graduate (IT/Any)",
    duration: "3 months",
    colleges: ["Coursera", "Udemy", "edX"],
    category: "Technology",
    level: "Advanced",
    description: "Image processing, object detection, and CNN architectures",
    link: "https://www.coursera.org/learn/convolutional-neural-networks"
  },
  {
    id: 28,
    name: "Kaggle Micro-Courses",
    eligibility: "12th Pass",
    duration: "2 weeks",
    colleges: ["Kaggle"],
    category: "Technology",
    level: "Beginner",
    description: "Short courses on pandas, machine learning, and data visualization",
    link: "https://www.kaggle.com/learn"
  },

  // ---- Design & Creative Skills ----
  {
    id: 29,
    name: "Figma UI/UX Design",
    eligibility: "10th Pass",
    duration: "4 weeks",
    colleges: ["Figma", "Udemy", "Coursera"],
    category: "Creative",
    level: "Beginner",
    description: "Design interfaces and prototypes with Figma",
    link: "https://help.figma.com/hc/en-us/articles/360041003114"
  },
  {
    id: 30,
    name: "Adobe Photoshop Masterclass",
    eligibility: "10th Pass",
    duration: "2 months",
    colleges: ["Udemy", "Adobe", "LinkedIn Learning"],
    category: "Creative",
    level: "Beginner",
    description: "Master photo editing and digital design with Photoshop",
    link: "https://www.udemy.com/topic/photoshop/"
  },
  {
    id: 31,
    name: "Illustrator for Beginners",
    eligibility: "10th Pass",
    duration: "6 weeks",
    colleges: ["Udemy", "Adobe", "Skillshare"],
    category: "Creative",
    level: "Beginner",
    description: "Create vector graphics and illustrations with Adobe Illustrator",
    link: "https://www.udemy.com/topic/adobe-illustrator/"
  },
  {
    id: 32,
    name: "3D Modeling with Blender",
    eligibility: "12th Pass",
    duration: "3 months",
    colleges: ["Udemy", "Blender", "Coursera"],
    category: "Creative",
    level: "Intermediate",
    description: "Learn 3D modeling, animation, and rendering with Blender",
    link: "https://www.udemy.com/topic/blender/"
  },
  {
    id: 33,
    name: "Photography Fundamentals",
    eligibility: "10th Pass",
    duration: "4 weeks",
    colleges: ["Coursera", "Udemy", "Skillshare"],
    category: "Creative",
    level: "Beginner",
    description: "Master camera settings, composition, and lighting",
    link: "https://www.coursera.org/specializations/photography-basics"
  },

  // ---- Business & Marketing ----
  {
    id: 34,
    name: "Google Analytics Certification",
    eligibility: "12th Pass",
    duration: "3 weeks",
    colleges: ["Google", "Coursera"],
    category: "Business",
    level: "Beginner",
    description: "Learn web analytics and data-driven marketing",
    link: "https://analytics.google.com/analytics/academy/"
  },
  {
    id: 35,
    name: "HubSpot Content Marketing",
    eligibility: "12th Pass",
    duration: "2 weeks",
    colleges: ["HubSpot Academy"],
    category: "Business",
    level: "Beginner",
    description: "Content strategy, SEO, and inbound marketing",
    link: "https://academy.hubspot.com/courses/content-marketing"
  },
  {
    id: 36,
    name: "Social Media Marketing",
    eligibility: "12th Pass",
    duration: "2 months",
    colleges: ["Coursera", "HubSpot", "Udemy"],
    category: "Business",
    level: "Beginner",
    description: "Facebook, Instagram, LinkedIn, and Twitter marketing strategies",
    link: "https://www.coursera.org/learn/social-media-marketing"
  },
  {
    id: 37,
    name: "Email Marketing",
    eligibility: "12th Pass",
    duration: "3 weeks",
    colleges: ["HubSpot Academy", "Coursera"],
    category: "Business",
    level: "Beginner",
    description: "Email campaigns, automation, and conversion optimization",
    link: "https://academy.hubspot.com/courses/email-marketing"
  },
  {
    id: 38,
    name: "Project Management",
    eligibility: "Graduate (Any Stream)",
    duration: "4 months",
    colleges: ["Coursera", "Google", "edX"],
    category: "Business",
    level: "Intermediate",
    description: "Agile, Scrum, and project management methodologies",
    link: "https://www.coursera.org/professional-certificates/google-project-management"
  },
  {
    id: 39,
    name: "Business Analytics",
    eligibility: "Graduate (Any Stream)",
    duration: "5 months",
    colleges: ["Coursera", "Wharton", "edX"],
    category: "Business",
    level: "Intermediate",
    description: "Data-driven business decisions and analytics",
    link: "https://www.coursera.org/specializations/business-analytics"
  },
  {
    id: 40,
    name: "Entrepreneurship Fundamentals",
    eligibility: "12th Pass",
    duration: "3 months",
    colleges: ["Coursera", "edX", "Udemy"],
    category: "Business",
    level: "Beginner",
    description: "Start your own business, funding, and business planning",
    link: "https://www.coursera.org/specializations/entrepreneurship"
  },

  // ---- Finance & Economics ----
  {
    id: 41,
    name: "Investment Management",
    eligibility: "Graduate (Commerce/Any)",
    duration: "4 months",
    colleges: ["Coursera", "NSE", "edX"],
    category: "Finance",
    level: "Intermediate",
    description: "Portfolio management, risk analysis, and investment strategies",
    link: "https://www.coursera.org/specializations/investment-management"
  },
  {
    id: 42,
    name: "Financial Markets",
    eligibility: "Graduate (Commerce/Any)",
    duration: "3 months",
    colleges: ["Coursera", "Yale", "edX"],
    category: "Finance",
    level: "Intermediate",
    description: "Stock markets, bonds, derivatives, and market analysis",
    link: "https://www.coursera.org/learn/financial-markets-global"
  },
  {
    id: 43,
    name: "Accounting Fundamentals",
    eligibility: "12th Pass",
    duration: "2 months",
    colleges: ["Coursera", "Udemy", "edX"],
    category: "Finance",
    level: "Beginner",
    description: "Basic accounting principles, bookkeeping, and financial statements",
    link: "https://www.coursera.org/learn/financial-accounting-basics"
  },
  {
    id: 44,
    name: "Cryptocurrency and Blockchain",
    eligibility: "12th Pass",
    duration: "4 weeks",
    colleges: ["Coursera", "Udemy", "edX"],
    category: "Finance",
    level: "Intermediate",
    description: "Blockchain technology, cryptocurrencies, and DeFi",
    link: "https://www.coursera.org/learn/cryptocurrency"
  },

  // ---- Career & Soft Skills ----
  {
    id: 45,
    name: "Public Speaking",
    eligibility: "12th Pass",
    duration: "3 weeks",
    colleges: ["Coursera", "Udemy", "edX"],
    category: "Business",
    level: "Beginner",
    description: "Improve communication, presentation skills, and confidence",
    link: "https://www.coursera.org/learn/public-speaking"
  },
  {
    id: 46,
    name: "Leadership and Management",
    eligibility: "Graduate (Any Stream)",
    duration: "3 months",
    colleges: ["Coursera", "Wharton", "edX"],
    category: "Business",
    level: "Intermediate",
    description: "Team leadership, conflict resolution, and organizational management",
    link: "https://www.coursera.org/specializations/leadership-management"
  },
  {
    id: 47,
    name: "Time Management",
    eligibility: "12th Pass",
    duration: "2 weeks",
    colleges: ["Coursera", "Udemy"],
    category: "Business",
    level: "Beginner",
    description: "Productivity techniques, goal setting, and work-life balance",
    link: "https://www.coursera.org/learn/time-management"
  },
  {
    id: 48,
    name: "Negotiation Skills",
    eligibility: "12th Pass",
    duration: "4 weeks",
    colleges: ["Coursera", "Michigan", "edX"],
    category: "Business",
    level: "Beginner",
    description: "Master negotiation strategies and conflict resolution",
    link: "https://www.coursera.org/learn/negotiation-skills"
  },

  // ---- Cloud & Cybersecurity ----
  {
    id: 49,
    name: "AWS Cloud Practitioner",
    eligibility: "12th Pass / Any Graduate",
    duration: "2 months",
    colleges: ["AWS", "Coursera", "Udemy"],
    category: "Technology",
    level: "Beginner",
    description: "Amazon Web Services fundamentals and cloud computing",
    link: "https://aws.amazon.com/training/learn-about/cloud-practitioner/"
  },
  {
    id: 50,
    name: "Microsoft Azure Fundamentals",
    eligibility: "12th Pass / Any Graduate",
    duration: "2 months",
    colleges: ["Microsoft Learn", "Coursera"],
    category: "Technology",
    level: "Beginner",
    description: "Azure cloud services, storage, and compute",
    link: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/"
  },
  {
    id: 51,
    name: "Google Cloud Platform",
    eligibility: "12th Pass / Any Graduate",
    duration: "2 months",
    colleges: ["Google Cloud", "Coursera"],
    category: "Technology",
    level: "Beginner",
    description: "GCP services, cloud architecture, and deployment",
    link: "https://www.coursera.org/professional-certificates/google-cloud-architect"
  },
  {
    id: 52,
    name: "Ethical Hacking",
    eligibility: "Graduate (IT/Any)",
    duration: "4 months",
    colleges: ["Coursera", "Udemy", "Cybrary"],
    category: "Technology",
    level: "Advanced",
    description: "Penetration testing, vulnerability assessment, and security",
    link: "https://www.coursera.org/specializations/certified-ethical-hacking-v12-cehv12-exam-prep-course"
  },
  {
    id: 53,
    name: "Network Security",
    eligibility: "Graduate (IT/Any)",
    duration: "3 months",
    colleges: ["Coursera", "Cisco", "edX"],
    category: "Technology",
    level: "Intermediate",
    description: "Network protocols, firewalls, and security best practices",
    link: "https://www.coursera.org/specializations/computer-network-security"
  },
  {
    id: 54,
    name: "Linux Administration",
    eligibility: "12th Pass / Any Graduate",
    duration: "3 months",
    colleges: ["Coursera", "Red Hat", "Udemy"],
    category: "Technology",
    level: "Intermediate",
    description: "Linux commands, shell scripting, and system administration",
    link: "https://www.coursera.org/specializations/pearson-linux-foundation-certified-system-administrator-lfcs"
  },
  {
    id: 55,
    name: "DevOps Engineering",
    eligibility: "Graduate (IT/Any)",
    duration: "4 months",
    colleges: ["Coursera", "Udemy", "Microsoft Learn"],
    category: "Technology",
    level: "Intermediate",
    description: "CI/CD pipelines, automation, and infrastructure as code",
    link: "https://www.coursera.org/professional-certificates/devops-and-software-engineering"
  },

  // Additional Technology Courses
  {
    id: 56,
    name: "TypeScript Programming",
    eligibility: "12th Pass / Any Graduate",
    duration: "4 weeks",
    colleges: ["freeCodeCamp", "Udemy", "Coursera"],
    category: "Technology",
    level: "Intermediate",
    description: "Type-safe JavaScript development with TypeScript",
    link: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/"
  },
  {
    id: 57,
    name: "Vue.js Framework",
    eligibility: "12th Pass / Any Graduate",
    duration: "2 months",
    colleges: ["Vue.js", "Udemy", "Coursera"],
    category: "Technology",
    level: "Intermediate",
    description: "Build reactive web applications with Vue.js",
    link: "https://vuejs.org/tutorial/"
  },
  {
    id: 58,
    name: "MongoDB Database",
    eligibility: "12th Pass / Any Graduate",
    duration: "3 weeks",
    colleges: ["MongoDB University", "Udemy", "Coursera"],
    category: "Technology",
    level: "Beginner",
    description: "NoSQL database design and MongoDB operations",
    link: "https://university.mongodb.com/"
  },
  {
    id: 59,
    name: "GraphQL API Development",
    eligibility: "12th Pass / Any Graduate",
    duration: "3 weeks",
    colleges: ["GraphQL Foundation", "Udemy", "Coursera"],
    category: "Technology",
    level: "Intermediate",
    description: "Build efficient APIs with GraphQL",
    link: "https://graphql.org/learn/"
  },
  {
    id: 60,
    name: "Rust Programming",
    eligibility: "Graduate (IT/Any)",
    duration: "2 months",
    colleges: ["Rust Foundation", "Udemy", "Coursera"],
    category: "Technology",
    level: "Advanced",
    description: "Systems programming with Rust for performance and safety",
    link: "https://www.rust-lang.org/learn"
  },
  {
    id: 61,
    name: "Go Programming Language",
    eligibility: "12th Pass / Any Graduate",
    duration: "6 weeks",
    colleges: ["Go", "Udemy", "Coursera"],
    category: "Technology",
    level: "Intermediate",
    description: "Concurrent programming and backend development with Go",
    link: "https://go.dev/learn/"
  },
  {
    id: 62,
    name: "PHP and MySQL",
    eligibility: "12th Pass",
    duration: "3 months",
    colleges: ["freeCodeCamp", "Udemy", "Coursera"],
    category: "Technology",
    level: "Beginner",
    description: "Server-side web development with PHP and MySQL",
    link: "https://www.freecodecamp.org/learn/back-end-development-and-apis/"
  },
  {
    id: 63,
    name: "Ruby on Rails",
    eligibility: "12th Pass / Any Graduate",
    duration: "4 months",
    colleges: ["Rails", "Udemy", "Coursera"],
    category: "Technology",
    level: "Intermediate",
    description: "Rapid web development with Ruby on Rails framework",
    link: "https://guides.rubyonrails.org/getting_started.html"
  },
  {
    id: 64,
    name: "Django Web Framework",
    eligibility: "12th Pass / Any Graduate",
    duration: "3 months",
    colleges: ["Django", "Udemy", "Coursera"],
    category: "Technology",
    level: "Intermediate",
    description: "Build web applications with Python and Django",
    link: "https://www.djangoproject.com/start/"
  },
  {
    id: 65,
    name: "Spring Boot Framework",
    eligibility: "Graduate (IT/Any)",
    duration: "4 months",
    colleges: ["Spring", "Udemy", "Coursera"],
    category: "Technology",
    level: "Intermediate",
    description: "Enterprise Java development with Spring Boot",
    link: "https://spring.io/guides"
  },
  {
    id: 66,
    name: "Angular Framework",
    eligibility: "12th Pass / Any Graduate",
    duration: "4 months",
    colleges: ["Angular", "Udemy", "Coursera"],
    category: "Technology",
    level: "Intermediate",
    description: "Build dynamic web applications with Angular",
    link: "https://angular.io/tutorial"
  },
  {
    id: 67,
    name: "WordPress Development",
    eligibility: "12th Pass",
    duration: "2 months",
    colleges: ["WordPress", "Udemy", "Coursera"],
    category: "Technology",
    level: "Beginner",
    description: "Create websites and themes with WordPress",
    link: "https://wordpress.org/support/article/first-steps-with-wordpress/"
  },
  {
    id: 68,
    name: "Web3 and Blockchain Development",
    eligibility: "Graduate (IT/Any)",
    duration: "3 months",
    colleges: ["Coursera", "Udemy", "edX"],
    category: "Technology",
    level: "Advanced",
    description: "Smart contracts, Solidity, and decentralized applications",
    link: "https://www.coursera.org/specializations/blockchain"
  }
];

const Courses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || course.level.includes(levelFilter);
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navbar />
      <div className="container py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Back to Home Button */}
          <div className="flex justify-start">
            <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Courses & Learning Paths
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore curated courses to build your skills and advance your career
            </p>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Courses Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{course.category}</Badge>
                    <Badge variant="outline">{course.level.split(' ')[0]}</Badge>
                  </div>
                  <CardTitle className="flex items-start gap-2">
                    <BookOpen className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>{course.name}</span>
                  </CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="w-4 h-4" />
                      <span>{course.eligibility}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Award className="w-4 h-4" />
                      <span>{course.colleges.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => window.open(course.link, '_blank')}
                  >
                    Explore Course
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                No courses found matching your criteria. Try adjusting your filters.
              </p>
            </Card>
          )}

          {/* Back to Top Button */}
          {showBackToTop && (
            <div className="fixed bottom-8 right-8 z-50">
              <Button
                onClick={scrollToTop}
                size="lg"
                className="rounded-full shadow-lg gap-2"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5" />
                Back to Top
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
