// Course data structure matching Courses.tsx
export interface Course {
  id: number;
  name: string;
  eligibility: string;
  duration: string;
  colleges: string[];
  category: string;
  level: string;
  description: string;
  link: string;
}

// Import courses from Courses page - we'll define them here to avoid circular imports
export const ALL_COURSES: Course[] = [
  // Technology & IT courses
  { id: 1, name: "Full Stack Web Development", eligibility: "12th Pass / Any Graduate", duration: "6 months", colleges: ["Coursera", "Udemy", "edX"], category: "Technology", level: "Beginner to Advanced", description: "Learn HTML, CSS, JavaScript, React, Node.js and more", link: "https://www.coursera.org/specializations/meta-full-stack-developer" },
  { id: 2, name: "Data Science & Machine Learning", eligibility: "Graduate (Any Stream)", duration: "8 months", colleges: ["IIT Madras Online", "upGrad", "Great Learning"], category: "Technology", level: "Intermediate", description: "Master Python, ML algorithms, and data visualization", link: "https://www.coursera.org/professional-certificates/ibm-data-science" },
  { id: 9, name: "C Programming Language", eligibility: "12th Pass / Any Graduate", duration: "4 weeks", colleges: ["freeCodeCamp", "Coursera", "edX"], category: "Technology", level: "Beginner", description: "Master C programming fundamentals, pointers, memory management, and data structures", link: "https://www.edx.org/learn/c-programming" },
  { id: 10, name: "Python for Everybody", eligibility: "12th Pass", duration: "3 months", colleges: ["Coursera", "freeCodeCamp", "edX"], category: "Technology", level: "Beginner", description: "Learn Python programming from scratch with hands-on projects", link: "https://www.coursera.org/specializations/python" },
  { id: 11, name: "Java Programming Masterclass", eligibility: "12th Pass / Any Graduate", duration: "5 months", colleges: ["Udemy", "Coursera", "Oracle"], category: "Technology", level: "Beginner to Intermediate", description: "Complete Java development course covering OOP, collections, and frameworks", link: "https://www.udemy.com/course/java-the-complete-java-developer-course/" },
  { id: 12, name: "JavaScript Algorithms and Data Structures", eligibility: "12th Pass", duration: "6 weeks", colleges: ["freeCodeCamp", "Udemy", "Coursera"], category: "Technology", level: "Beginner", description: "Master JavaScript fundamentals, algorithms, and data structures", link: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
  { id: 13, name: "React - The Complete Guide", eligibility: "12th Pass / Any Graduate", duration: "4 months", colleges: ["Udemy", "Coursera", "freeCodeCamp"], category: "Technology", level: "Intermediate", description: "Build modern web applications with React, hooks, and Redux", link: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/" },
  { id: 14, name: "Node.js and Express.js", eligibility: "12th Pass / Any Graduate", duration: "3 months", colleges: ["freeCodeCamp", "Udemy", "Coursera"], category: "Technology", level: "Intermediate", description: "Learn backend development with Node.js, Express, and MongoDB", link: "https://www.freecodecamp.org/learn/back-end-development-and-apis/" },
  { id: 15, name: "Docker and Kubernetes", eligibility: "Graduate (IT/Any)", duration: "2 months", colleges: ["Coursera", "Udemy", "Microsoft Learn"], category: "Technology", level: "Intermediate", description: "Containerization and orchestration with Docker and Kubernetes", link: "https://www.coursera.org/specializations/certified-kubernetes-application-developer-ckad-course" },
  { id: 17, name: "SQL for Data Science", eligibility: "12th Pass", duration: "4 weeks", colleges: ["Coursera", "Kaggle", "freeCodeCamp"], category: "Technology", level: "Beginner", description: "Master SQL queries, joins, and database management", link: "https://www.coursera.org/learn/sql-for-data-science" },
  { id: 22, name: "Machine Learning by Stanford", eligibility: "Graduate (Any Stream)", duration: "3 months", colleges: ["Coursera", "Stanford", "edX"], category: "Technology", level: "Intermediate", description: "Andrew Ng's famous ML course covering algorithms and neural networks", link: "https://www.coursera.org/learn/machine-learning" },
  { id: 25, name: "Data Analysis with Python", eligibility: "12th Pass", duration: "6 weeks", colleges: ["freeCodeCamp", "Kaggle", "Coursera"], category: "Technology", level: "Beginner", description: "Analyze data using pandas, NumPy, and matplotlib", link: "https://www.freecodecamp.org/learn/data-analysis-with-python/" },
  { id: 49, name: "AWS Cloud Practitioner", eligibility: "12th Pass / Any Graduate", duration: "2 months", colleges: ["AWS", "Coursera", "Udemy"], category: "Technology", level: "Beginner", description: "Amazon Web Services fundamentals and cloud computing", link: "https://aws.amazon.com/training/learn-about/cloud-practitioner/" },
  { id: 50, name: "Microsoft Azure Fundamentals", eligibility: "12th Pass / Any Graduate", duration: "2 months", colleges: ["Microsoft Learn", "Coursera"], category: "Technology", level: "Beginner", description: "Azure cloud services, storage, and compute", link: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/" },
  { id: 51, name: "Google Cloud Platform", eligibility: "12th Pass / Any Graduate", duration: "2 months", colleges: ["Google Cloud", "Coursera"], category: "Technology", level: "Beginner", description: "GCP services, cloud architecture, and deployment", link: "https://www.coursera.org/professional-certificates/google-cloud-architect" },
  { id: 7, name: "Cybersecurity Fundamentals", eligibility: "Graduate (IT/Any)", duration: "5 months", colleges: ["EC-Council", "Coursera", "Cybrary"], category: "Technology", level: "Intermediate to Advanced", description: "Network security, ethical hacking, cryptography", link: "https://www.coursera.org/specializations/intro-cyber-security" },
  
  // Business & Finance courses
  { id: 3, name: "Digital Marketing", eligibility: "12th Pass", duration: "3 months", colleges: ["Google Digital Garage", "HubSpot Academy", "Simplilearn"], category: "Business", level: "Beginner", description: "SEO, social media marketing, content marketing, and analytics", link: "https://learndigital.withgoogle.com/digitalgarage" },
  { id: 34, name: "Google Analytics Certification", eligibility: "12th Pass", duration: "3 weeks", colleges: ["Google", "Coursera"], category: "Business", level: "Beginner", description: "Learn web analytics and data-driven marketing", link: "https://analytics.google.com/analytics/academy/" },
  { id: 35, name: "HubSpot Content Marketing", eligibility: "12th Pass", duration: "2 weeks", colleges: ["HubSpot Academy"], category: "Business", level: "Beginner", description: "Content strategy, SEO, and inbound marketing", link: "https://academy.hubspot.com/courses/content-marketing" },
  { id: 36, name: "Social Media Marketing", eligibility: "12th Pass", duration: "2 months", colleges: ["Coursera", "HubSpot", "Udemy"], category: "Business", level: "Beginner", description: "Facebook, Instagram, LinkedIn, and Twitter marketing strategies", link: "https://www.coursera.org/learn/social-media-marketing" },
  { id: 37, name: "Email Marketing", eligibility: "12th Pass", duration: "3 weeks", colleges: ["HubSpot Academy", "Coursera"], category: "Business", level: "Beginner", description: "Email campaigns, automation, and conversion optimization", link: "https://academy.hubspot.com/courses/email-marketing" },
  { id: 38, name: "Project Management", eligibility: "Graduate (Any Stream)", duration: "4 months", colleges: ["Coursera", "Google", "edX"], category: "Business", level: "Intermediate", description: "Agile, Scrum, and project management methodologies", link: "https://www.coursera.org/professional-certificates/google-project-management" },
  { id: 39, name: "Business Analytics", eligibility: "Graduate (Any Stream)", duration: "5 months", colleges: ["Coursera", "Wharton", "edX"], category: "Business", level: "Intermediate", description: "Data-driven business decisions and analytics", link: "https://www.coursera.org/specializations/business-analytics" },
  { id: 40, name: "Entrepreneurship Fundamentals", eligibility: "12th Pass", duration: "3 months", colleges: ["Coursera", "edX", "Udemy"], category: "Business", level: "Beginner", description: "Start your own business, funding, and business planning", link: "https://www.coursera.org/specializations/entrepreneurship" },
  { id: 45, name: "Public Speaking", eligibility: "12th Pass", duration: "3 weeks", colleges: ["Coursera", "Udemy", "edX"], category: "Business", level: "Beginner", description: "Improve communication, presentation skills, and confidence", link: "https://www.coursera.org/learn/public-speaking" },
  { id: 46, name: "Leadership and Management", eligibility: "Graduate (Any Stream)", duration: "3 months", colleges: ["Coursera", "Wharton", "edX"], category: "Business", level: "Intermediate", description: "Team leadership, conflict resolution, and organizational management", link: "https://www.coursera.org/specializations/leadership-management" },
  { id: 5, name: "Financial Planning & Analysis", eligibility: "Graduate (Commerce/Any)", duration: "6 months", colleges: ["NSE Academy", "NISM", "ICE"], category: "Finance", level: "Intermediate", description: "Investment planning, portfolio management, financial analysis", link: "https://www.nseindia.com/learn/self-study-ncfm-modules-all" },
  { id: 41, name: "Investment Management", eligibility: "Graduate (Commerce/Any)", duration: "4 months", colleges: ["Coursera", "NSE", "edX"], category: "Finance", level: "Intermediate", description: "Portfolio management, risk analysis, and investment strategies", link: "https://www.coursera.org/specializations/investment-management" },
  { id: 42, name: "Financial Markets", eligibility: "Graduate (Commerce/Any)", duration: "3 months", colleges: ["Coursera", "Yale", "edX"], category: "Finance", level: "Intermediate", description: "Stock markets, bonds, derivatives, and market analysis", link: "https://www.coursera.org/learn/financial-markets-global" },
  { id: 43, name: "Accounting Fundamentals", eligibility: "12th Pass", duration: "2 months", colleges: ["Coursera", "Udemy", "edX"], category: "Finance", level: "Beginner", description: "Basic accounting principles, bookkeeping, and financial statements", link: "https://www.coursera.org/learn/financial-accounting-basics" },
  
  // Creative Arts courses
  { id: 4, name: "Graphic Design & UI/UX", eligibility: "10th Pass", duration: "4 months", colleges: ["Coursera", "Udemy", "Skillshare"], category: "Creative", level: "Beginner to Intermediate", description: "Adobe suite, Figma, design principles, and user research", link: "https://www.coursera.org/specializations/graphic-design" },
  { id: 6, name: "Content Writing & Copywriting", eligibility: "12th Pass", duration: "2 months", colleges: ["Udemy", "Coursera", "LinkedIn Learning"], category: "Creative", level: "Beginner", description: "SEO writing, creative writing, blogging, and storytelling", link: "https://www.udemy.com/topic/content-writing/" },
  { id: 8, name: "Video Editing & Production", eligibility: "10th Pass", duration: "3 months", colleges: ["Udemy", "LinkedIn Learning", "Skillshare"], category: "Creative", level: "Beginner", description: "Adobe Premiere Pro, Final Cut Pro, video storytelling", link: "https://www.udemy.com/topic/video-editing/" },
  { id: 29, name: "Figma UI/UX Design", eligibility: "10th Pass", duration: "4 weeks", colleges: ["Figma", "Udemy", "Coursera"], category: "Creative", level: "Beginner", description: "Design interfaces and prototypes with Figma", link: "https://help.figma.com/hc/en-us/articles/360041003114" },
  { id: 30, name: "Adobe Photoshop Masterclass", eligibility: "10th Pass", duration: "2 months", colleges: ["Udemy", "Adobe", "LinkedIn Learning"], category: "Creative", level: "Beginner", description: "Master photo editing and digital design with Photoshop", link: "https://www.udemy.com/topic/photoshop/" },
  { id: 31, name: "Illustrator for Beginners", eligibility: "10th Pass", duration: "6 weeks", colleges: ["Udemy", "Adobe", "Skillshare"], category: "Creative", level: "Beginner", description: "Create vector graphics and illustrations with Adobe Illustrator", link: "https://www.udemy.com/topic/adobe-illustrator/" },
  { id: 32, name: "3D Modeling with Blender", eligibility: "12th Pass", duration: "3 months", colleges: ["Udemy", "Blender", "Coursera"], category: "Creative", level: "Intermediate", description: "Learn 3D modeling, animation, and rendering with Blender", link: "https://www.udemy.com/topic/blender/" },
  { id: 33, name: "Photography Fundamentals", eligibility: "10th Pass", duration: "4 weeks", colleges: ["Coursera", "Udemy", "Skillshare"], category: "Creative", level: "Beginner", description: "Master camera settings, composition, and lighting", link: "https://www.coursera.org/specializations/photography-basics" },
  
  // Healthcare & Science courses (we'll add some free courses)
  { id: 101, name: "Introduction to Psychology", eligibility: "12th Pass", duration: "6 weeks", colleges: ["Coursera", "Yale", "edX"], category: "Health", level: "Beginner", description: "Understand human behavior, cognition, and mental processes", link: "https://www.coursera.org/learn/introduction-psychology" },
  { id: 102, name: "Human Anatomy and Physiology", eligibility: "12th Pass", duration: "8 weeks", colleges: ["Coursera", "edX"], category: "Health", level: "Beginner", description: "Learn about the human body systems and functions", link: "https://www.coursera.org/learn/anatomy" },
  { id: 103, name: "Nutrition and Health", eligibility: "12th Pass", duration: "4 weeks", colleges: ["Coursera", "Wageningen", "edX"], category: "Health", level: "Beginner", description: "Learn about nutrition, diet, and healthy living", link: "https://www.coursera.org/learn/nutrition" },
  { id: 104, name: "Biochemistry and Molecular Biology", eligibility: "Graduate (Science)", duration: "6 weeks", colleges: ["edX", "MIT", "Coursera"], category: "Health", level: "Intermediate", description: "Explore biological molecules and cellular processes", link: "https://www.edx.org/course/introduction-to-biology" },
  { id: 105, name: "Public Health Fundamentals", eligibility: "12th Pass", duration: "5 weeks", colleges: ["Coursera", "Johns Hopkins", "edX"], category: "Health", level: "Beginner", description: "Introduction to public health principles and practices", link: "https://www.coursera.org/learn/public-health" },
  { id: 106, name: "Medical Terminology", eligibility: "12th Pass", duration: "3 weeks", colleges: ["Coursera", "edX"], category: "Health", level: "Beginner", description: "Learn medical terms and healthcare language", link: "https://www.coursera.org/learn/medical-terminology" },
  { id: 107, name: "Epidemiology", eligibility: "Graduate (Science/Any)", duration: "4 weeks", colleges: ["Coursera", "Johns Hopkins", "edX"], category: "Health", level: "Intermediate", description: "Study of disease patterns and public health", link: "https://www.coursera.org/learn/epidemiology" },
];

// Map category IDs to course categories
export const getCoursesByCategory = (categoryId: string): Course[] => {
  const categoryMap: Record<string, string> = {
    tech: "Technology",
    business: "Business",
    creative: "Creative",
    health: "Health",
  };
  
  const courseCategory = categoryMap[categoryId] || "Technology";
  const courses = ALL_COURSES.filter(course => course.category === courseCategory);
  
  // Return 6-7 courses, prioritizing variety in levels
  return courses.slice(0, 7);
};

