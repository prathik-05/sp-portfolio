import {
  BrainCircuit,
  Code2,
  Cpu,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";

export const profile = {
  name: "Prathik Salla",
  handle: "prathik-05",
  role: "Software Engineer — AI/ML",
  headline: "Computer Science (Data Science) undergraduate experienced in building AI-powered applications, RAG architectures, computer vision pipelines, and backend systems.",
  location: "Hyderabad, India",
  email: "s.prathik1745@gmail.com",
  phone: "+91-9398794825",
  github: "https://github.com/prathik-05",
  linkedin: "https://www.linkedin.com/in/prathik-s07/",
  availability: "Open to software engineering and AI/ML roles (Graduation: May 2027).",
  summary:
    "Computer Science (Data Science) undergraduate with strong foundations in Python, Java, Data Structures & Algorithms, Object-Oriented Programming, REST APIs, and backend development. Experienced in building AI-powered applications using Streamlit, RAG, Computer Vision, TensorFlow, PyTorch and SQL. Hands-on experience with AI-assisted development tools, cloud platforms, and Git-based workflows. Passionate about developing scalable software systems, intelligent automation solutions, and modern AI-driven applications while continuously learning emerging technologies.",
  focus: [
    "Advanced AI-powered applications",
    "Data Structures & Algorithms",
    "Agentic AI and MCP architectures",
    "Scalable backend systems",
    "Production-level AI workflows",
    "Intelligent automation solutions",
    "Cloud and scalable architectures"
  ]
};

export const navItems = [
  "About",
  "Projects",
  "Skills",
  "Experience",
  "Credentials",
  "Contact"
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/prathik-05",
    icon: Github,
    handle: "prathik-05"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/prathik-s07/",
    icon: Linkedin,
    handle: "prathik-s07"
  },
  {
    name: "Email",
    url: "mailto:s.prathik1745@gmail.com",
    icon: Mail,
    handle: "s.prathik1745@gmail.com"
  }
];

export const stats = [
  {
    label: "Flagship Projects",
    value: "05",
    detail: "AI, Vision, Backend & Algorithms"
  },
  {
    label: "Verified Testing",
    value: "47",
    detail: "Passing Automated JUnit Tests"
  },
  {
    label: "Vision Inference",
    value: "45+",
    detail: "FPS Real-Time Stream Performance"
  },
  {
    label: "Target Graduation",
    value: "2027",
    detail: "B.Tech CSE (Data Science) · CGPA 8.50"
  }
];

export interface SkillItem {
  name: string;
  proof?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Code2;
  description: string;
  proofProject: string;
  items: SkillItem[];
}

export const skills: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    subtitle: "Java · Python · SQL · R · JavaScript · HTML/CSS",
    icon: Code2,
    description: "Core programming languages utilized across production services, ML pipelines, and algorithmic systems.",
    proofProject: "Spring Boot REST API & YOLOv11 Stream Queue",
    items: [
      { name: "Java", proof: "Employee REST API & Minimax Engine" },
      { name: "Python", proof: "MCP Video RAG & YOLOv11 Streaming" },
      { name: "SQL", proof: "MySQL Schema Design & JPA Queries" },
      { name: "JavaScript", proof: "Full-Stack Frontends & Next.js" },
      { name: "HTML/CSS", proof: "Responsive Modern Web Architectures" },
      { name: "R", proof: "Statistical Computing & Data Modeling" }
    ]
  },
  {
    id: "core-cs",
    title: "Core Computer Science",
    subtitle: "DSA · OOP · DBMS · Problem Solving",
    icon: BrainCircuit,
    description: "Fundamental engineering principles, algorithmic complexity analysis, and object-oriented architectures.",
    proofProject: "Minimax Alpha-Beta Pruning (47 Tests Passing)",
    items: [
      { name: "Data Structures & Algorithms", proof: "Exhaustive Game-Tree Search" },
      { name: "Object-Oriented Programming (OOP)", proof: "Layered MVC & Immutable Domain Models" },
      { name: "DBMS & Schema Architecture", proof: "Relational Modeling & Foreign Key Constraints" },
      { name: "Algorithmic Problem Solving", proof: "Time & Space Complexity Optimization" },
      { name: "Concurrency & Thread Safety", proof: "Async Worker Dispatch off the EDT" }
    ]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    subtitle: "RAG · YOLOv11 · Computer Vision · MCP · Agents",
    icon: Cpu,
    description: "End-to-end intelligent systems, retrieval architectures, and real-time computer vision inference.",
    proofProject: "MCP Video RAG (<180ms Search) & YOLOv11 (45+ FPS)",
    items: [
      { name: "Retrieval-Augmented Generation (RAG)", proof: "ChromaDB Semantic Chunk Retrieval" },
      { name: "Computer Vision & Segmentation", proof: "YOLOv11 & OpenCV Frame Queue" },
      { name: "Model Context Protocol (MCP)", proof: "Custom Tool Server for AI Agents" },
      { name: "Machine Learning Workflows", proof: "Feature Profiling & Health Scoring" },
      { name: "Whisper Audio & Transcription", proof: "Timestamped Alignment Ingestion" },
      { name: "AI Workflow Automation", proof: "Multi-Stage Intelligence Pipelines" }
    ]
  },
  {
    id: "frameworks-libraries",
    title: "Frameworks & Libraries",
    subtitle: "PyTorch · OpenCV · Streamlit · Spring Boot · Pandas",
    icon: Workflow,
    description: "Engineering frameworks for high-performance ML inference, data profiling, and enterprise backends.",
    proofProject: "CognitoEDA Profiler & Spring Data JPA",
    items: [
      { name: "Streamlit", proof: "Interactive Analytics & CV Dashboards" },
      { name: "PyTorch", proof: "YOLO Tensor Execution & Model Switching" },
      { name: "OpenCV", proof: "Real-Time Webcam Buffers & Overlays" },
      { name: "Spring Boot 3", proof: "Layered Enterprise Microservices" },
      { name: "Spring Data JPA", proof: "Hibernate Queries & Pagination" },
      { name: "Pandas & NumPy", proof: "Vectorized 50k+ Row Dataset Profiling" },
      { name: "Scikit-Learn", proof: "Correlation Analytics & Anomaly Detection" },
      { name: "TensorFlow", proof: "Deep Learning Foundations" }
    ]
  },
  {
    id: "cloud-tools",
    title: "Cloud & Developer Tooling",
    subtitle: "Git · GitHub · OCI · GCP · Linux · JUnit · REST APIs",
    icon: ShieldCheck,
    description: "Version control, cloud infrastructure, unit test harnesses, and automated deployment pipelines.",
    proofProject: "CI/CD Vercel Deploy & JUnit 5 Test Suite",
    items: [
      { name: "Git & GitHub Workflows", proof: "Branch Protection & PR Reviews" },
      { name: "REST APIs & RFC 7807", proof: "Centralized Exception Handling" },
      { name: "Oracle Cloud Infrastructure (OCI)", proof: "Generative AI Professional Certified" },
      { name: "Google Cloud Platform (GCP)", proof: "AI/ML Virtual Internship (Grade O)" },
      { name: "JUnit 5 & Mockito", proof: "Isolated Service-Layer Mocking" },
      { name: "Linux CLI & Bash", proof: "Environment & Daemon Automation" }
    ]
  }
];

export const skillLevels: Record<string, number> = {
  Java: 92,
  Python: 96,
  SQL: 88,
  R: 78,
  "HTML/CSS": 85,
  JavaScript: 88,
  "Data Structures & Algorithms": 92,
  "Object-Oriented Programming": 90,
  DBMS: 86,
  "Problem Solving": 92,
  "Machine Learning": 90,
  "Retrieval-Augmented Generation (RAG)": 92,
  "Computer Vision": 93,
  "AI Workflow Automation": 89,
  Streamlit: 95,
  TensorFlow: 86,
  PyTorch: 88,
  OpenCV: 92,
  NumPy: 92,
  Pandas: 93,
  Matplotlib: 88,
  Seaborn: 87,
  "Scikit-learn": 90,
  Git: 94,
  GitHub: 94,
  "Oracle Cloud Infrastructure (OCI)": 86,
  "Google Cloud": 85,
  MCP: 90,
  Linux: 86,
  "REST APIs": 91
};

export const experiences = [
  {
    title: "AI Application Builder",
    company: "Independent Projects",
    period: "2024 - Present",
    icon: Sparkles,
    summary:
      "Designing and shipping practical AI tools across RAG, computer vision, analytics, and workflow automation.",
    highlights: [
      "Built semantic retrieval and conversational interfaces for video intelligence workflows using Model Context Protocol (MCP).",
      "Created computer vision apps with real-time YOLOv11 inference, stream processing queues, and analytics.",
      "Engineered automated dataset intelligence and exploratory data analysis platforms."
    ]
  },
  {
    title: "Web Development Intern",
    company: "InAmigos Foundation (IAF)",
    period: "2 - 16 May 2026",
    icon: Sparkles,
    summary:
      "Completed a virtual web development internship, assisting with front-end tasks and receiving a certificate of internship and letter of recommendation from the foundation's leadership.",
    highlights: [
      "Assisted with front-end development tasks within an agile virtual team.",
      "Earned an official Certificate of Internship and Letter of Recommendation.",
      "Demonstrated rapid learning, deadline adherence, and collaborative problem-solving."
    ]
  },
  {
    title: "AI & Cloud Engineering Intern",
    company: "ServiceNow, AICTE, Google Cloud & Edunet Foundation",
    period: "2025 - 2026",
    icon: Sparkles,
    summary:
      "Completed virtual engineering internships leveraging ServiceNow University, Google Cloud, IBM Watsonx, and AI & Data Analytics platforms.",
    highlights: [
      "Completed ServiceNow Virtual Internship Program covering Agentic AI, Administration, Flows, and ATF.",
      "Earned Grade O (Outstanding) in Google for Developers 10-Week AI-ML Virtual Internship.",
      "Completed Google Cloud Generative AI Virtual Internship organized by SmartBridge & AICTE.",
      "Built phishing detection agents using IBM Watsonx Orchestrate during Edunet IBM SkillsBuild program."
    ]
  }
];

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  filterCategory: "AI" | "Vision" | "Backend";
  description: string;
  repo: string;
  github: string;
  live: string;
  slug: string;
  status: string;
  image: string;
  tags: string[];
  stack: string[];
  metrics: {
    latency: string;
    throughput: string;
    accuracy: string;
  };
  architecture: string[];
  features: string[];
  caseStudy?: {
    challenge: string;
    solution: string;
    implementation: string[];
    results: string[];
    lessons: string[];
  };
}

export const projects: Project[] = [
  {
    id: "mcp-video-rag",
    title: "MCP-Powered RAG Video Intelligence Platform",
    subtitle: "AGENTIC VIDEO SEARCH & CLIP RETRIEVAL",
    category: "AI Video Intelligence",
    filterCategory: "AI",
    description:
      "Engineered an agentic video RAG system using Python, Streamlit, and ChromaDB that indexes multi-hour video transcripts and visual keyframes, delivering sub-200ms semantic search with 100% timestamp-grounded clip retrieval across YouTube and local media.",
    repo: "https://github.com/prathik-05/MCP-Powered-Video-RAG",
    github: "https://github.com/prathik-05/MCP-Powered-Video-RAG",
    live: "",
    slug: "mcp-rag-video-intelligence",
    status: "Production-Ready AI System",
    image: "/images/hero-suit.jpg",
    tags: ["Python", "Streamlit", "RAG", "MCP", "ChromaDB", "Vector Search"],
    stack: ["Python", "Streamlit", "RAG", "MCP Server", "Vector Search", "ChromaDB"],
    metrics: {
      latency: "< 180ms Search Latency",
      throughput: "50+ Video Chunks / Query",
      accuracy: "100% Timestamp Grounding"
    },
    architecture: ["Video Input", "Whisper OCR", "ChromaDB Index", "LLM Grounding", "MCP Client"],
    caseStudy: {
      challenge: "Video files are dense, unindexed, and difficult to query semantically without watching hours of footage or manually scrubbing transcripts.",
      solution: "A multi-stage RAG pipeline that processes, segments, and embeds video frames and transcripts, enabling conversational query matching.",
      implementation: [
        "Built transcription-chunking and localized frame-embedding ingestion pipelines.",
        "Created a custom Model Context Protocol (MCP) server exposing video semantic search queries as executable tools.",
        "Implemented metadata-based filtering for precise timestamp and clip grounding."
      ],
      results: [
        "Delivered sub-200ms vector search across local ChromaDB embeddings.",
        "Enabled users to query exact moments across hours of video with zero manual scrubbing.",
        "Connected the custom MCP server to autonomous AI agents for tool-calling queries."
      ],
      lessons: [
        "Grounding responses with strict timestamp boundaries is critical to prevent LLM hallucinations.",
        "Caching local vector embeddings minimizes API overhead and maintains high query responsiveness.",
        "Standardizing API capabilities via MCP allows immediate tool consumption by external AI agents."
      ]
    },
    features: [
      "Sub-200ms semantic video retrieval",
      "Model Context Protocol tool server",
      "Conversational memory workflows",
      "Intelligent timestamp-aware clip generation",
      "AI-based automated notes extraction",
      "Multimodal ingestion architecture"
    ]
  },
  {
    id: "real-time-object-detection",
    title: "Real-Time Object Detection & Segmentation using YOLOv11",
    subtitle: "STREAM PROCESSING QUEUE PIPELINE",
    category: "Computer Vision",
    filterCategory: "Vision",
    description:
      "Architected a real-time computer vision pipeline with YOLOv11, OpenCV, and a thread-decoupled frame processing queue, achieving sustained 45+ FPS webcam inference and sub-25ms latency with zero frame drop during dynamic model switching.",
    repo: "https://github.com/prathik-05/yolov11-object-detection-and-segmentation",
    github: "https://github.com/prathik-05/yolov11-object-detection-and-segmentation",
    live: "",
    slug: "real-time-object-detection",
    status: "Production-style CV App",
    image: "/images/hero-mask.jpg",
    tags: ["YOLOv11", "OpenCV", "Streamlit", "PyTorch", "Python", "Frame Queue"],
    stack: ["YOLOv11", "OpenCV", "Streamlit", "Python", "Frame Queue Buffers"],
    metrics: {
      latency: "< 25ms Frame Latency",
      throughput: "45+ FPS Sustained Stream",
      accuracy: "92.4% mAP50 Detection"
    },
    architecture: ["Webcam / Video In", "Frame Queue", "YOLOv11 Inference", "Segmentation Overlay", "Counting Hub"],
    caseStudy: {
      challenge: "Computer vision streaming pipelines often suffer from high frame-processing latency, leading to lag, stuttering, and severe frame drop in live streams.",
      solution: "Engineered a frame-processing queue in Python that isolates webcam capturing, YOLOv11 model inference, and Streamlit visualization.",
      implementation: [
        "Segregated frame ingestion, model execution, and rendering loops to prevent thread blocking.",
        "Optimized frame queue buffers to maintain stable processing bounds during model-switching.",
        "Integrated dynamic counting boundaries and class filters directly into the OpenCV overlay layer."
      ],
      results: [
        "Maintained sustained 45+ FPS across webcam streams with zero buffer overflow.",
        "Decoupled inference processing from user interface rendering.",
        "Achieved sub-25ms latency with dynamic model switching between detection and segmentation."
      ],
      lessons: [
        "Decoupling model thread execution from UI rendering is essential for smooth video playback.",
        "YOLOv11 inference efficiency is maximized when batch size and frame resolution are dynamically constrained.",
        "OpenCV drawing operations must be lightweight to prevent introducing latency back into the pipeline."
      ]
    },
    features: [
      "Real-time object detection at 45+ FPS",
      "Instant segmentation mask overlay",
      "Dynamic model switching without lag",
      "Object counting & crossing analytics",
      "Thread-decoupled queue architecture",
      "Interactive Streamlit control dashboard"
    ]
  },
  {
    id: "cognito-eda",
    title: "CognitoEDA - Automated Exploratory Data Analysis Platform",
    subtitle: "DATASET INTELLIGENCE & HEALTH SCORING",
    category: "Automated Analytics",
    filterCategory: "AI",
    description:
      "Built an automated exploratory data analysis platform in Python and Streamlit, profiling 50,000+ row datasets in under 2.2 seconds with automated schema anomaly detection, missing-value imputation flags, and a composite 0-100 Data Health Scoring engine.",
    repo: "https://github.com/prathik-05/CognitoEDA",
    github: "https://github.com/prathik-05/CognitoEDA",
    live: "",
    slug: "cognito-eda",
    status: "Analytics Platform",
    image: "/images/spidey-hero.jpg",
    tags: ["Python", "Streamlit", "Pandas", "Scikit-Learn", "Automated Profiling"],
    stack: ["Python", "Streamlit", "Pandas", "Scikit-learn", "Statistical Profiling"],
    metrics: {
      latency: "< 2.2s for 50k+ Rows",
      throughput: "100% Automated Profiling",
      accuracy: "0-100 Health Score Index"
    },
    architecture: ["CSV Dataset In", "Data Profiling Hub", "Correlation Matrix", "Health Scoring", "Dashboard Out"],
    caseStudy: {
      challenge: "Preliminary exploratory data analysis is repetitive and time-consuming, while unexpected dataset schema discrepancies often crash downstream machine learning pipelines.",
      solution: "Built an automated dataset intelligence platform that profiles tabular datasets, generates health scores, and flags training impediments.",
      implementation: [
        "Coded an automated profiling engine that evaluates data distributions and missing value ratios in a single pass.",
        "Designed a data health scoring algorithm that rates dataset training readiness based on class imbalances.",
        "Built interactive correlation maps and statistical summaries into a Streamlit dashboard."
      ],
      results: [
        "Reduced exploratory data analysis from hours to under 2.2 seconds for 50k+ row datasets.",
        "Eliminated pipeline crashes by detecting schema mismatches and missing values before model training.",
        "Decreased data preprocessing troubleshooting overhead by flagging distribution anomalies."
      ],
      lessons: [
        "Automation should prioritize flagging data errors over generating excessive generic charts.",
        "A numeric health score drastically speeds up the go/no-go training decision for developers.",
        "Strict input validation prevents malformed files from corrupting statistical aggregation metrics."
      ]
    },
    features: [
      "Automated dataset profiling in <2.2s",
      "Composite 0-100 data health scoring",
      "Correlation matrix & collinearity detection",
      "Distribution anomaly & skewness alerts",
      "Interactive Streamlit visualization",
      "One-click ML-readiness validation"
    ]
  },
  {
    id: "employee-management-rest-api",
    title: "Employee Management REST API",
    subtitle: "SPRING BOOT · MYSQL · JPA · VALIDATION",
    category: "Backend / SDE",
    filterCategory: "Backend",
    description:
      "Developed a layered Spring Boot 3 enterprise REST service with Spring Data JPA and MySQL, featuring Bean Validation, RFC 7807 global exception handling, pagination/sorting, and a 100% test-passing Mockito unit test suite with sub-15ms p95 response times.",
    repo: "https://github.com/prathik-05/employee-management-rest-api",
    github: "https://github.com/prathik-05/employee-management-rest-api",
    live: "",
    slug: "employee-management-rest-api",
    status: "Production-style SDE Build",
    image: "/images/hero-mask.jpg",
    tags: ["Java", "Spring Boot", "REST API", "MySQL", "Spring Data JPA", "JUnit"],
    stack: ["Java 17", "Spring Boot 3", "Spring Data JPA", "MySQL", "Spring Validation", "JUnit 5"],
    metrics: {
      latency: "< 15ms p95 Endpoint Response",
      throughput: "Zero-N+1 JPA Queries",
      accuracy: "100% Test Suite Pass Rate"
    },
    architecture: ["Client Request", "Controller Layer", "Service Layer", "Repository (JPA)", "MySQL Database"],
    caseStudy: {
      challenge: "Interviewers expect clean, layered REST services with real validation and error handling, not just a controller that writes to a database.",
      solution: "Designed a layered Spring Boot architecture (Controller → Service → Repository) with DTOs, Bean Validation, and a global exception handler returning structured error responses.",
      implementation: [
        "Built full CRUD endpoints (GET/POST/PUT/DELETE) with path variable and query parameter routing.",
        "Enforced Bean Validation constraints (NotNull, Size, Email, Pattern) on request DTOs.",
        "Implemented a centralized @RestControllerAdvice exception handler mapping validation and not-found errors to RFC 7807-style responses.",
        "Added pagination and sorting with Spring Data Pageable and wrote JUnit 5 service-layer tests with Mockito."
      ],
      results: [
        "Sub-15ms p95 response times across indexed MySQL queries.",
        "Every endpoint returns consistent, well-formed JSON responses with proper HTTP status codes.",
        "Unit tests cover 100% of the service layer, validating strict separation of concerns."
      ],
      lessons: [
        "Layered architecture makes a REST API maintainable and is the first thing senior engineers look for.",
        "Validation should live on DTOs at the API boundary, never scattered across controllers.",
        "A single global exception handler keeps error responses uniform across the whole application."
      ]
    },
    features: [
      "Full CRUD RESTful endpoints (Spring Boot 3)",
      "DTO + Bean Validation boundary constraints",
      "Centralized RFC 7807 exception handling",
      "Indexed pagination & sorting (Spring Data)",
      "MySQL relational schema with JPA mapping",
      "JUnit 5 + Mockito unit test suite"
    ]
  },
  {
    id: "tic-tac-toe-minimax",
    title: "Tic-Tac-Toe with Minimax AI",
    subtitle: "JAVA 21 · SWING · MINIMAX · ALPHA-BETA",
    category: "Java / Game Development",
    filterCategory: "Backend",
    description:
      "Constructed an unbeatable Java 21 Swing game engine with alpha-beta pruned Minimax, immutable board models, and asynchronous worker dispatch, validated across 47 automated JUnit 5 tests with mathematically verified zero AI losses.",
    repo: "https://github.com/prathik-05/Tic-Tac-Toe-with-Minimax-AI",
    github: "https://github.com/prathik-05/Tic-Tac-Toe-with-Minimax-AI",
    live: "",
    slug: "tic-tac-toe-minimax",
    status: "Completed · 47 Tests Passing",
    image: "/images/hero-suit.jpg",
    tags: ["Java 21", "Swing", "Minimax", "Alpha-Beta Pruning", "MVC", "JUnit 5"],
    stack: ["Java 21", "Java Swing", "Minimax", "Alpha-Beta Pruning", "Immutable State", "MVC", "JUnit 5", "Maven"],
    metrics: {
      latency: "< 5ms AI Move Search",
      throughput: "47 Passing Tests",
      accuracy: "0 Losses Mathematically Guaranteed"
    },
    architecture: ["Game State", "Board Model", "Minimax Engine", "Swing View", "Game Controller"],
    caseStudy: {
      challenge: "Implement an interactive game where the AI must make mathematically optimal decisions while keeping game state, search logic, and UI responsibilities cleanly separated.",
      solution: "Built an immutable board model and recursive Minimax engine with alpha-beta pruning, connected through an MVC controller and responsive Swing interface. The AI was exhaustively tested against every legal opponent response.",
      implementation: [
        "Modeled the board as an immutable Cell[9] state with defensive copying and terminal-state evaluation.",
        "Implemented recursive Minimax with depth-aware scoring and alpha-beta pruning.",
        "Built a custom Swing board with hover states, winning-line rendering, and responsive resizing.",
        "Added asynchronous AI computation with session-generation protection against stale results."
      ],
      results: [
        "47 automated tests covering board validation, all eight winning configurations, draws, immutability, Minimax decisions, controller flow, and concurrency.",
        "Exhaustive game-tree verification confirmed that the AI never loses when playing optimally as either X or O.",
        "Alpha-beta search was validated against unpruned Minimax for equivalent decisions and reduced node exploration.",
        "The Swing UI remains responsive while AI calculations execute asynchronously off the EDT."
      ],
      lessons: [
        "Immutable game states simplify recursive game-tree exploration because hypothetical moves never mutate the original board.",
        "Minimax becomes substantially easier to reason about when terminal evaluation, maximizing/minimizing behavior, and depth scoring are separated.",
        "Alpha-beta pruning improves search efficiency without changing the optimal decision.",
        "Asynchronous computation introduces a second problem beyond algorithm correctness: stale results must be prevented from modifying newer application state."
      ]
    },
    features: [
      "Mathematically unbeatable Minimax AI (0 losses)",
      "Alpha-beta pruning for fast game-tree evaluation",
      "Player vs AI & Player vs Player game modes",
      "Custom 2D Swing UI with responsive rendering",
      "Asynchronous computation off the Event Dispatch Thread",
      "47 automated JUnit 5 unit & integration tests",
      "Immutable Board model with defensive copying",
      "Strict MVC separation of concerns"
    ]
  }
];

export const process = [
  {
    step: "Frame",
    detail: "Clarify the problem, user, data flow, constraints, and what a useful first version must prove."
  },
  {
    step: "Build",
    detail: "Prototype the core workflow quickly, keep the architecture readable, and make the interface explain itself."
  },
  {
    step: "Refine",
    detail: "Improve reliability, performance, UX details, and deployment readiness until the system feels composed."
  },
  {
    step: "Ship",
    detail: "Document the work, expose source links, prepare demos, and keep learning from real usage."
  }
];

export const education = [
  {
    degree: "Bachelor of Technology in Computer Science (Data Science)",
    institution: "Ace Engineering College, Hyderabad",
    score: "CGPA: 8.50 / 10.0",
    period: "Aug 2023 – May 2027",
    status: "Final Year Student",
    icon: GraduationCap,
    details:
      "Core coursework in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Machine Learning, Operating Systems, and Computer Networks."
  },
  {
    degree: "Intermediate / Senior Secondary (MPC Stream)",
    institution: "Alphores Jr. College",
    score: "GPA: 8.80 / 10.0",
    period: "June 2021 – May 2023",
    status: "Completed with Distinction",
    icon: GraduationCap,
    details: "Specialized in Mathematics, Physics, and Chemistry."
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
