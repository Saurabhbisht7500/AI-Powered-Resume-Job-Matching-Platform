require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Job = require("../models/Job");

const sampleJobs = [
  {
    title: "Frontend Developer",
    company: "PixelCraft Technologies",
    location: "Bengaluru, IN",
    description:
      "We are looking for a Frontend Developer skilled in building responsive, performant web applications. You will work closely with designers and backend engineers to ship polished user interfaces.",
    requiredSkills: [
      "javascript",
      "react",
      "next.js",
      "html",
      "css",
      "redux",
      "tailwind css",
      "git",
    ],
  },
  {
    title: "Backend Developer (Node.js)",
    company: "CloudNine Systems",
    location: "Remote",
    description:
      "Join our backend team to design and maintain scalable REST APIs and microservices powering our SaaS platform. Experience with databases and cloud deployment is a plus.",
    requiredSkills: [
      "node.js",
      "express.js",
      "mongodb",
      "rest api",
      "docker",
      "aws",
      "git",
      "microservices",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Nimbus Software Labs",
    location: "Pune, IN",
    description:
      "Full stack role covering both frontend and backend development. You will build end-to-end features across our React frontend and Node.js backend, with a MongoDB data layer.",
    requiredSkills: [
      "javascript",
      "react",
      "node.js",
      "express",
      "mongodb",
      "rest api",
      "git",
      "agile",
    ],
  },
  {
    title: "Data Analyst",
    company: "Insight Metrics",
    location: "Hyderabad, IN",
    description:
      "We need a Data Analyst comfortable working with large datasets, building dashboards, and communicating insights to stakeholders using SQL and visualization tools.",
    requiredSkills: [
      "sql",
      "python",
      "pandas",
      "numpy",
      "data analysis",
      "data visualization",
      "power bi",
      "tableau",
      "statistics",
    ],
  },
  {
    title: "Machine Learning Engineer",
    company: "NeuralWorks AI",
    location: "Remote",
    description:
      "Design and deploy machine learning models for real-world applications. Strong foundation in deep learning frameworks and data preprocessing pipelines required.",
    requiredSkills: [
      "python",
      "machine learning",
      "deep learning",
      "tensorflow",
      "pytorch",
      "scikit-learn",
      "numpy",
      "pandas",
      "nlp",
    ],
  },
  {
    title: "DevOps Engineer",
    company: "InfraGrid Cloud",
    location: "Gurugram, IN",
    description:
      "Own our CI/CD pipelines and cloud infrastructure. You'll automate deployments, manage containerized workloads, and ensure high system reliability.",
    requiredSkills: [
      "docker",
      "kubernetes",
      "aws",
      "terraform",
      "jenkins",
      "ci/cd",
      "linux",
      "ansible",
      "github actions",
    ],
  },
  {
    title: "Android Developer",
    company: "AppSphere Innovations",
    location: "Chennai, IN",
    description:
      "Build and maintain high-quality Android applications used by millions of users. Experience with Kotlin and modern Android architecture is expected.",
    requiredSkills: [
      "android",
      "kotlin",
      "java",
      "rest api",
      "git",
      "agile",
    ],
  },
  {
    title: "Java Backend Developer",
    company: "Fortress Financial Tech",
    location: "Mumbai, IN",
    description:
      "Develop robust, secure backend services for our fintech platform using Java and Spring Boot, working with relational databases and messaging systems.",
    requiredSkills: [
      "java",
      "spring boot",
      "sql",
      "postgresql",
      "microservices",
      "rest api",
      "git",
    ],
  },
  {
    title: "QA Automation Engineer",
    company: "TestForce Labs",
    location: "Remote",
    description:
      "Build and maintain automated test suites for our web and mobile applications. Strong proficiency in Selenium, TestNG, and CI/CD integration is required.",
    requiredSkills: [
      "selenium",
      "testng",
      "java",
      "python",
      "ci/cd",
      "jenkins",
      "postman",
      "git",
    ],
  },
  {
    title: "Database Administrator",
    company: "DataCore Solutions",
    location: "Pune, IN",
    description:
      "Manage enterprise-scale databases, optimize queries, and implement disaster recovery strategies using PostgreSQL and MongoDB.",
    requiredSkills: [
      "postgresql",
      "mongodb",
      "database optimization",
      "linux",
      "backup",
      "sql",
      "aws",
      "monitoring",
    ],
  },
  {
    title: "Security & Compliance Engineer",
    company: "Guardian SecureIT",
    location: "Bangalore, IN",
    description:
      "Implement security protocols, conduct vulnerability assessments, and ensure compliance with industry standards for our cloud-based applications.",
    requiredSkills: [
      "cybersecurity",
      "compliance",
      "owasp",
      "penetration testing",
      "encryption",
      "python",
      "linux",
      "aws",
    ],
  },
  {
    title: "Product Manager - SaaS",
    company: "GrowthStack AI",
    location: "Remote",
    description:
      "Drive product vision and strategy for our B2B SaaS platform. Collaborate with engineering, design, and sales teams to build features that delight customers.",
    requiredSkills: [
      "product management",
      "agile",
      "data analysis",
      "sql",
      "business analysis",
      "communication",
      "user research",
      "analytics",
    ],
  },
  {
    title: "Cloud Architect",
    company: "CloudScale Innovations",
    location: "Gurugram, IN",
    description:
      "Design and implement scalable cloud infrastructure solutions on AWS and Azure. Expertise in containerization, orchestration, and security architecture required.",
    requiredSkills: [
      "aws",
      "azure",
      "docker",
      "kubernetes",
      "terraform",
      "serverless",
      "microservices",
      "networking",
    ],
  },
  {
    title: "iOS/Swift Developer",
    company: "AppForge Studios",
    location: "Bangalore, IN",
    description:
      "Develop beautiful and performant iOS applications using Swift and SwiftUI. Experience with MVVM architecture and third-party integrations is essential.",
    requiredSkills: [
      "swift",
      "ios",
      "swiftui",
      "xcode",
      "rest api",
      "git",
      "objective-c",
      "core data",
    ],
  },
  {
    title: "Engineering Manager",
    company: "TechVision Corp",
    location: "Remote",
    description:
      "Lead and mentor engineering teams while driving technical excellence and innovation. Strong background in full-stack development and system design required.",
    requiredSkills: [
      "leadership",
      "full stack",
      "system design",
      "mentoring",
      "agile",
      "communication",
      "code review",
      "strategic planning",
    ],
  },
];

async function seed() {
  await connectDB();
  await Job.deleteMany({});
  await Job.insertMany(sampleJobs);
  console.log(`Seeded ${sampleJobs.length} job postings.`);
  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
