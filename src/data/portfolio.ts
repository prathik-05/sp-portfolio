import {
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  Eye,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Server,
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
  availability: "Open to software engineering and AI/ML roles.",
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
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail }
];

export interface SkillItem {
  name: string;
  level: number;
  badge?: string;
  category: string;
  description: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Code2;
  level: number;
  description: string;
  items: string[];
  detailedItems?: SkillItem[];
}

export const technicalPillars = [
  {
    id: "vision-pipeline",
    title: "Streaming Computer Vision",
    tech: "YOLOv11 · OpenCV · PyTorch",
    stat: "Real-Time / Thread-Decoupled",
    description: "Low-latency frame queue buffers, live webcam inference, dynamic class segmentation and counting overlays.",
    icon: Eye
  },
  {
    id: "agentic-rag",
    title: "Agentic RAG & MCP Architecture",
    tech: "Model Context Protocol · ChromaDB · Whisper",
    stat: "Timestamp-Aware Search",
    description: "Multimodal video intelligence, semantic transcription embeddings, and autonomous agent tool schemas.",
    icon: BrainCircuit
  },
  {
    id: "backend-systems",
    title: "Production Backend & SDE",
    tech: "Java 21 · Spring Boot 3 · JPA · MySQL",
    stat: "Clean Layered / Tested",
    description: "Centralized exception handling, strict DTO validation, JPA repositories, and JUnit 5 unit test suites.",
    icon: Server
  },
  {
    id: "automated-analytics",
    title: "Automated Data Intelligence",
    tech: "Python · Pandas · Streamlit · Scikit-Learn",
    stat: "One-Click Health Scoring",
    description: "Automated statistical profiling, correlation heatmaps, dataset health scores, and anomaly detection.",
    icon: Database
  }
];

export const skills: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    subtitle: "Java · Python · SQL · R · HTML/CSS · JavaScript",
    icon: Code2,
    level: 94,
    description: "Core programming languages for application engineering, scripting, and data pipelines.",
    items: [
      "Java",
      "Python",
      "SQL",
      "R",
      "HTML/CSS",
      "JavaScript"
    ]
  },
  {
    id: "core-cs",
    title: "Core Computer Science",
    subtitle: "DSA · OOP · DBMS · Problem Solving",
    icon: BrainCircuit,
    level: 91,
    description: "Fundamental computer science foundations, algorithmic problem solving, and database design.",
    items: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "DBMS",
      "Problem Solving"
    ]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    subtitle: "ML · RAG · Computer Vision · AI Automation",
    icon: Cpu,
    level: 92,
    description: "Machine learning workflows, computer vision inference, RAG retrieval architectures, and automation.",
    items: [
      "Machine Learning",
      "Retrieval-Augmented Generation (RAG)",
      "Computer Vision",
      "AI Workflow Automation"
    ]
  },
  {
    id: "frameworks-libraries",
    title: "Frameworks & Libraries",
    subtitle: "Streamlit · TensorFlow · PyTorch · OpenCV · Pandas",
    icon: Workflow,
    level: 90,
    description: "Machine learning, computer vision, data manipulation, and visualization libraries.",
    items: [
      "Streamlit",
      "TensorFlow",
      "PyTorch",
      "OpenCV",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn"
    ]
  },
  {
    id: "cloud-tools",
    title: "Cloud & Tools",
    subtitle: "Git · GitHub · OCI · Google Cloud · MCP · Linux · REST APIs",
    icon: ShieldCheck,
    level: 88,
    description: "Cloud infrastructure, version control, Model Context Protocol, and API development.",
    items: [
      "Git",
      "GitHub",
      "Oracle Cloud Infrastructure (OCI)",
      "Google Cloud",
      "MCP",
      "Linux",
      "REST APIs"
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
    accuracy?: string;
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
    description:
      "Developed an MCP-powered AI video intelligence platform using Python, Streamlit, and RAG for semantic video understanding, conversational querying, and contextual retrieval across YouTube and local video content.",
    repo: "https://github.com/prathik-05/MCP-Powered-Video-RAG",
    github: "https://github.com/prathik-05/MCP-Powered-Video-RAG",
    live: "",
    slug: "mcp-rag-video-intelligence",
    status: "Production-Ready AI System",
    image: "/images/hero-suit.jpg",
    tags: ["Python", "Streamlit", "RAG", "MCP", "ChromaDB", "Vector Search"],
    stack: ["Python", "Streamlit", "RAG", "MCP", "Vector Search", "ChromaDB"],
    metrics: {
      latency: "Semantic Vector Search",
      throughput: "MCP Tool Calling Ready",
      accuracy: "Timestamp-Aware Retrieval"
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
        "Enabled users to locate specific topics semantically without manual scrubbing.",
        "Integrated local ChromaDB vector store for efficient embedding retrieval.",
        "Connected the custom MCP server to autonomous AI agents for tool-calling queries."
      ],
      lessons: [
        "Grounding responses with strict timestamp boundaries is critical to prevent LLM hallucinations.",
        "Caching local vector embeddings minimizes API overhead and maintains high query responsiveness.",
        "Standardizing API capabilities via MCP allows immediate tool consumption by external AI agents."
      ]
    },
    features: [
      "Semantic video retrieval",
      "Conversational memory workflows",
      "Intelligent clip generation",
      "AI-based notes generation",
      "Timestamp-aware querying",
      "Multimodal architecture"
    ]
  },
  {
    id: "real-time-object-detection",
    title: "Real-Time Object Detection & Segmentation using YOLOv11",
    subtitle: "STREAM PROCESSING QUEUE PIPELINE",
    category: "Computer Vision",
    description:
      "Developed a real-time object detection and segmentation system using YOLOv11, OpenCV, and Streamlit supporting webcam, image, and video inference with dynamic model switching and interactive visualization.",
    repo: "https://github.com/prathik-05/yolov11-object-detection-and-segmentation",
    github: "https://github.com/prathik-05/yolov11-object-detection-and-segmentation",
    live: "",
    slug: "real-time-object-detection",
    status: "Production-style CV App",
    image: "/images/hero-mask.jpg",
    tags: ["YOLOv11", "OpenCV", "Streamlit", "PyTorch", "Python", "Frame Queue"],
    stack: ["YOLOv11", "OpenCV", "Streamlit", "Python", "Frame Queue Buffers"],
    metrics: {
      latency: "Thread-Decoupled Queue",
      throughput: "Webcam & Video Streaming",
      accuracy: "Bounding Box & Segmentation"
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
        "Maintained smooth live video streaming across webcam and uploaded footage.",
        "Decoupled inference processing from user interface rendering.",
        "Prevented video buffer overflow with thread-safe frame management."
      ],
      lessons: [
        "Decoupling model thread execution from UI rendering is essential for smooth video playback.",
        "YOLOv11 inference efficiency is maximized when batch size and frame resolution are dynamically constrained.",
        "OpenCV drawing operations must be lightweight to prevent introducing latency back into the pipeline."
      ]
    },
    features: [
      "Real-time object detection",
      "Segmentation support",
      "Dynamic model switching",
      "Object counting and analytics",
      "Low-latency inference pipeline",
      "Interactive visualization dashboard"
    ]
  },
  {
    id: "cognito-eda",
    title: "CognitoEDA - Automated Exploratory Data Analysis Platform",
    subtitle: "DATASET INTELLIGENCE & HEALTH SCORING",
    category: "Automated Analytics",
    description:
      "Developed CognitoEDA, an AI-powered exploratory data analysis platform using Python and Streamlit for automated dataset intelligence, visualization, and interactive analytics on CSV datasets.",
    repo: "https://github.com/prathik-05/CognitoEDA",
    github: "https://github.com/prathik-05/CognitoEDA",
    live: "",
    slug: "cognito-eda",
    status: "Analytics Platform",
    image: "/images/spidey-hero.jpg",
    tags: ["Python", "Streamlit", "Pandas", "Scikit-Learn", "Automated Profiling"],
    stack: ["Python", "Streamlit", "Pandas", "Scikit-learn", "Statistical Profiling"],
    metrics: {
      latency: "Automated Vectorized Profiling",
      throughput: "Schema Anomaly Detection",
      accuracy: "Data Health Scoring Engine"
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
        "Automated initial dataset exploratory analysis routines into a single click.",
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
      "Automated dataset intelligence",
      "AI-driven insights",
      "Correlation analysis",
      "Dataset health scoring",
      "Dynamic dashboards",
      "Statistical analysis workflows"
    ]
  },
  {
    id: "employee-management-rest-api",
    title: "Employee Management REST API",
    subtitle: "SPRING BOOT · MYSQL · JPA · VALIDATION",
    category: "Backend / SDE",
    description:
      "Engineered a production-grade Employee Management REST API with Spring Boot, Spring Data JPA, and MySQL featuring full CRUD operations, request validation, centralized exception handling, pagination, sorting, and unit-tested service layers.",
    repo: "https://github.com/prathik-05/employee-management-rest-api",
    github: "https://github.com/prathik-05/employee-management-rest-api",
    live: "",
    slug: "employee-management-rest-api",
    status: "Production-style SDE Build",
    image: "/images/hero-mask.jpg",
    tags: ["Java", "Spring Boot", "REST API", "MySQL", "Spring Data JPA", "JUnit"],
    stack: ["Java 17", "Spring Boot", "Spring Data JPA", "MySQL", "Spring Validation", "JUnit 5"],
    metrics: {
      latency: "REST Endpoint Response",
      throughput: "Pagination & Sorting",
      accuracy: "Validation + Error Handling"
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
        "Every endpoint returns consistent, well-formed JSON responses with proper HTTP status codes.",
        "Invalid input is rejected at the boundary before touching business logic or the database.",
        "Unit tests cover the service layer, validating the interview-relevant separation of concerns."
      ],
      lessons: [
        "Layered architecture makes a REST API maintainable and is the first thing senior engineers look for.",
        "Validation should live on DTOs at the API boundary, never scattered across controllers.",
        "A single global exception handler keeps error responses uniform across the whole application."
      ]
    },
    features: [
      "Full CRUD REST endpoints",
      "DTO + Bean Validation",
      "Centralized exception handling",
      "Pagination & sorting",
      "Spring Data JPA with MySQL",
      "JUnit 5 + Mockito unit tests"
    ]
  },
  {
    id: "tic-tac-toe-minimax",
    title: "Tic-Tac-Toe with Minimax AI",
    subtitle: "JAVA 21 · SWING · MINIMAX · ALPHA-BETA",
    category: "Java / Game Development",
    description:
      "Built a Java 21 Swing Tic-Tac-Toe application with an immutable game-state model, unbeatable Minimax AI with alpha-beta pruning, MVC architecture, asynchronous AI computation, and exhaustive game-tree verification.",
    repo: "https://github.com/prathik-05/tic-tac-toe-minimax",
    github: "https://github.com/prathik-05/tic-tac-toe-minimax",
    live: "",
    slug: "tic-tac-toe-minimax",
    status: "Completed · 47 Tests Passing",
    image: "/images/hero-suit.jpg",
    tags: ["Java 21", "Swing", "Minimax", "Alpha-Beta Pruning", "MVC", "JUnit 5"],
    stack: ["Java 21", "Java Swing", "Minimax", "Alpha-Beta Pruning", "Immutable State", "MVC", "JUnit 5", "Maven", "Concurrency"],
    metrics: {
      latency: "Async AI off the EDT",
      throughput: "Exhaustive game-tree verification",
      accuracy: "Zero losses · AI=X and AI=O"
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
        "The Swing UI remains responsive while AI calculations execute asynchronously."
      ],
      lessons: [
        "Immutable game states simplify recursive game-tree exploration because hypothetical moves never mutate the original board.",
        "Minimax becomes substantially easier to reason about when terminal evaluation, maximizing/minimizing behavior, and depth scoring are separated.",
        "Alpha-beta pruning improves search efficiency without changing the optimal decision.",
        "Asynchronous computation introduces a second problem beyond algorithm correctness: stale results must be prevented from modifying newer application state."
      ]
    },
    features: [
      "Unbeatable Minimax AI (verified)",
      "Alpha-beta pruning",
      "Player vs AI mode",
      "Player vs Player mode",
      "Swing GUI with hover states",
      "Asynchronous AI off the EDT",
      "47 automated JUnit 5 tests",
      "Immutable game-state model"
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
    track: "Ace Engineering College",
    institution: "CGPA: 8.50",
    period: "Aug 2023 – May 2027",
    icon: GraduationCap,
    details:
      "Strong foundations in Python, Java, Data Structures & Algorithms, Object-Oriented Programming, REST APIs, DBMS, and Machine Learning."
  },
  {
    degree: "Intermediate / Senior Secondary",
    track: "Alphores Jr. College (MPC Stream)",
    institution: "GPA: 8.80",
    period: "June 2021 – May 2023",
    icon: GraduationCap,
    details: "Mathematics, Physics, and Chemistry stream with high distinction."
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
