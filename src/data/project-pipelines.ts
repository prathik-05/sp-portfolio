import type { LucideIcon } from "lucide-react";
import {
  Video,
  FileText,
  Database,
  Boxes,
  Search,
  BrainCircuit,
  MessageSquareReply,
  Webcam,
  Gauge,
  Cpu,
  ScanLine,
  BarChart3,
  Table,
  TrendingUp,
  ShieldCheck,
  LayoutDashboard,
  CheckCircle2,
  Server,
  UserSquare2,
  CircleDot,
  Gamepad2
} from "lucide-react";

export interface PipelineNode {
  id: string;
  label: string;
  sublabel: string;
  purpose: string;
  input: string;
  output: string;
  whyThisChoice: string;
  icon: LucideIcon;
}

export interface ProjectPipeline {
  projectSlug: string;
  title: string;
  nodes: PipelineNode[];
}

export const projectPipelines: ProjectPipeline[] = [
  {
    projectSlug: "mcp-rag-video-intelligence",
    title: "Semantic Video RAG Pipeline",
    nodes: [
      {
        id: "video-in",
        label: "VIDEO INGESTION",
        sublabel: "YouTube / MP4",
        purpose:
          "Accepts YouTube URLs or local MP4 uploads and extracts the audio track plus synchronized keyframes for downstream processing.",
        input: "Video URL / file",
        output: "Audio stream + keyframes",
        whyThisChoice:
          "Both sources feed the same internal representation so every downstream stage is source-agnostic.",
        icon: Video
      },
      {
        id: "transcribe",
        label: "WHISPER TRANSCRIPT",
        sublabel: "Timestamped Chunks",
        purpose:
          "Transcribes audio into timestamped sentence chunks, splitting on natural pauses to keep each segment searchable in isolation.",
        input: "Audio stream",
        output: "Timestamped transcript segments",
        whyThisChoice:
          "Sentence-level granularity keeps embeddings semantically focused while timestamps preserve exact clip grounding.",
        icon: FileText
      },
      {
        id: "embed",
        label: "EMBEDDING PASS",
        sublabel: "Local MiniLM / ONNX",
        purpose:
          "Encodes each transcript chunk into a dense vector so semantic similarity can be computed at query time.",
        input: "Transcript segments",
        output: "Dense vectors + metadata",
        whyThisChoice:
          "A lightweight local encoder avoids per-query cloud round trips, which previously pushed latency past 1.8s.",
        icon: Boxes
      },
      {
        id: "vector-db",
        label: "CHROMADB STORE",
        sublabel: "Cosine HNSW Index",
        purpose:
          "Persists embedded chunks locally with strict timestamp metadata bounds for fast approximate nearest-neighbor retrieval.",
        input: "Dense vectors + metadata",
        output: "Indexed vector store",
        whyThisChoice:
          "ChromaDB runs fully local and ships an HNSW index, keeping retrieval cost near zero and data on-device.",
        icon: Database
      },
      {
        id: "retrieve",
        label: "RETRIEVAL",
        sublabel: "Top-k Grounding",
        purpose:
          "Embeds the user query, searches the index, then filters and merges hits by timestamp bounds and deduplication.",
        input: "Natural-language query",
        output: "Top-k grounded clip segments",
        whyThisChoice:
          "Top-k plus timestamp-bound filtering (top_k=4, in-memory NumPy merge) is what holds end-to-end latency at ~109–185ms.",
        icon: Search
      },
      {
        id: "llm",
        label: "LLM SYNTHESIS",
        sublabel: "Claude / GPT Agent",
        purpose:
          "Synthesizes a conversational answer strictly from the retrieved clip segments, refusing to answer outside their evidence.",
        input: "Top-k grounded clip segments",
        output: "Grounded draft answer",
        whyThisChoice:
          "Feeding retrieval output to an LLM with strict grounding prevents hallucination on content the index never saw.",
        icon: BrainCircuit
      },
      {
        id: "response",
        label: "MCP TOOL RESPONSE",
        sublabel: "JSON-RPC Payload",
        purpose:
          "Assembles the final answer and clip references into a lightweight JSON-RPC tool payload callable by external AI agents.",
        input: "Grounded draft answer",
        output: "Tool response + clip player",
        whyThisChoice:
          "Exposing search as an MCP tool (search_video_clips) lets autonomous agents invoke it as a standard function.",
        icon: MessageSquareReply
      }
    ]
  },
  {
    projectSlug: "real-time-object-detection",
    title: "Real-Time Detection Pipeline",
    nodes: [
      {
        id: "source",
        label: "STREAM SOURCE",
        sublabel: "Webcam / Video",
        purpose:
          "Captures live webcam frames or reads video files into the processing pipeline at the ingestion thread rate.",
        input: "Camera / video file",
        output: "Raw frame stream",
        whyThisChoice:
          "Separate capture thread keeps acquisition from ever blocking the inference loop.",
        icon: Webcam
      },
      {
        id: "queue",
        label: "FRAME QUEUE",
        sublabel: "Thread-Decoupled",
        purpose:
          "Isolates ingestion from inference with a bounded, self-discarding buffer queue to prevent stutter and overflow.",
        input: "Raw frame stream",
        output: "Bounded buffered frames",
        whyThisChoice:
          "A decoupled queue prevents the UI thread from freezing and drops stale frames instead of piling up backlog.",
        icon: Gauge
      },
      {
        id: "yolo",
        label: "YOLOv11 INFERENCE",
        sublabel: "Detection Model",
        purpose:
          "Runs YOLOv11 model inference on each queued frame, producing bounding boxes and segmentation masks.",
        input: "Buffered frames",
        output: "Detections + masks",
        whyThisChoice:
          "YOLOv11 balances speed and accuracy for real-time bounds, with dynamic resolution limits to hold latency.",
        icon: Cpu
      },
      {
        id: "overlay",
        label: "OVERLAY HUD",
        sublabel: "OpenCV Drawing",
        purpose:
          "Renders bounding boxes, masks, class filters, and counting boundaries directly into the frame overlay layer.",
        input: "Detections + masks",
        output: "Annotated frames",
        whyThisChoice:
          "Lightweight OpenCV drawing avoids adding latency back into the pipeline after inference.",
        icon: ScanLine
      },
      {
        id: "counter",
        label: "COUNTING HUB",
        sublabel: "Live Telemetry",
        purpose:
          "Tracks class-wise object counts and analytics in real time and streams them to the dashboard.",
        input: "Annotated frames",
        output: "Live object telemetry",
        whyThisChoice:
          "Separating telemetry from rendering keeps the visualization loop responsive while data accumulates.",
        icon: BarChart3
      }
    ]
  },
  {
    projectSlug: "cognito-eda",
    title: "Dataset Intelligence Pipeline",
    nodes: [
      {
        id: "csv-in",
        label: "DATASET INPUT",
        sublabel: "CSV Upload",
        purpose:
          "Accepts tabular CSV datasets with schema validation before any profiling work begins.",
        input: "CSV file",
        output: "Validated dataframe",
        whyThisChoice:
          "Validating early avoids propagating type and null issues through every downstream computation.",
        icon: Table
      },
      {
        id: "profile",
        label: "PROFILING HUB",
        sublabel: "Vectorized Stats",
        purpose:
          "Computes distributions, missing values, and correlations in vectorized single-pass routines.",
        input: "Validated dataframe",
        output: "Profile statistics",
        whyThisChoice:
          "Vectorized pandas operations make profiling fast even on large CSVs without sampling shortcuts.",
        icon: TrendingUp
      },
      {
        id: "health",
        label: "HEALTH SCORING",
        sublabel: "Readiness Engine",
        purpose:
          "Rates dataset training readiness 0–100 and flags toxic nulls, type mismatches, and class imbalances.",
        input: "Profile statistics",
        output: "Health score + warnings",
        whyThisChoice:
          "A single interpretable score converts many raw stats into an actionable go/no-go decision.",
        icon: ShieldCheck
      },
      {
        id: "dash",
        label: "DASHBOARD OUT",
        sublabel: "Interactive HUD",
        purpose:
          "Renders correlation maps, summaries, and health indicators in a Streamlit dashboard.",
        input: "Health score + stats",
        output: "Visual analytics UI",
        whyThisChoice:
          "Streamlit renders the analytics natively so profiling results are immediately interactive.",
        icon: LayoutDashboard
      },
      {
        id: "decision",
        label: "GO / NO-GO",
        sublabel: "Decision Output",
        purpose:
          "Delivers an immediate training-readiness recommendation backed by the computed health score.",
        input: "Visual analytics",
        output: "Training decision",
        whyThisChoice:
          "Ending the pipeline on a decision, not raw stats, is what makes the tool useful to a data team.",
        icon: CheckCircle2
      }
    ]
  },
  {
    projectSlug: "employee-management-rest-api",
    title: "Employee Management REST API Flow",
    nodes: [
      {
        id: "request",
        label: "CLIENT REQUEST",
        sublabel: "REST / HTTP",
        purpose:
          "Accepts incoming HTTP requests to CRUD endpoints, routing them to the correct controller handler based on method and path.",
        input: "HTTP request (JSON)",
        output: "Dispatched controller call",
        whyThisChoice:
          "Spring MVC routing keeps the client-facing surface stable and maps cleanly to REST conventions.",
        icon: Server
      },
      {
        id: "controller",
        label: "CONTROLLER LAYER",
        sublabel: "DTO + Validation",
        purpose:
          "Binds request bodies to DTOs, enforces Bean Validation constraints, and delegates business work to the service layer.",
        input: "Controller call + DTO",
        output: "Validated request payload",
        whyThisChoice:
          "Validation at the boundary rejects malformed input before it touches business logic or the database.",
        icon: CircleDot
      },
      {
        id: "service",
        label: "SERVICE LAYER",
        sublabel: "Business Logic",
        purpose:
          "Implements business rules such as uniqueness checks and data transformations, keeping controllers thin and focused.",
        input: "Validated request payload",
        output: "Processed business result",
        whyThisChoice:
          "A dedicated service layer is the separation of concerns interviewers expect in enterprise APIs.",
        icon: UserSquare2
      },
      {
        id: "repository",
        label: "JPA REPOSITORY",
        sublabel: "Spring Data",
        purpose:
          "Provides type-safe database access via Spring Data JPA, including derived queries, pagination, and sorting.",
        input: "Business result",
        output: "Persisted / retrieved entity",
        whyThisChoice:
          "Spring Data JPA removes boilerplate DAO code while keeping queries expressive and transactional.",
        icon: Database
      },
      {
        id: "db",
        label: "MYSQL STORE",
        sublabel: "Persistent Storage",
        purpose:
          "Persists employee records with schema integrity and ACID guarantees for all write operations.",
        input: "Entity to persist",
        output: "Committed row / entity",
        whyThisChoice:
          "MySQL provides reliable relational storage with mature transactions and indexing.",
        icon: Table
      },
      {
        id: "response",
        label: "STRUCTURED RESPONSE",
        sublabel: "Global Error Mapping",
        purpose:
          "Assembles DTO responses and maps any validation or not-found errors to consistent JSON with correct HTTP statuses.",
        input: "Result or exception",
        output: "Well-formed JSON response",
        whyThisChoice:
          "A @RestControllerAdvice handler keeps every response uniform regardless of where an error originates.",
        icon: CheckCircle2
      }
    ]
  },
  {
    projectSlug: "tic-tac-toe-minimax",
    title: "Minimax Game Flow",
    nodes: [
      {
        id: "state",
        label: "GAME STATE",
        sublabel: "Immutable Board",
        purpose:
          "Maintains the board as an immutable Cell[9] state model with defensive copying, plus terminal-state win/draw detection used by every other component.",
        input: "Player move",
        output: "New immutable board state",
        whyThisChoice:
          "Immutable game states make hypothetical moves safe: recursion never mutates the original board, which keeps search logic deterministic and trivially testable.",
        icon: Gamepad2
      },
      {
        id: "controller",
        label: "CONTROLLER",
        sublabel: "Turn + Session Logic",
        purpose:
          "Orchestrates turns and mouse input, validates moves, and protects the active game session so stale actions never mutate newer state.",
        input: "Mouse click / mode",
        output: "Scheduled next move",
        whyThisChoice:
          "Centralizing turn logic keeps the Swing view free of rules and makes session protection a single, testable responsibility.",
        icon: CircleDot
      },
      {
        id: "minimax",
        label: "MINIMAX ENGINE",
        sublabel: "Alpha-Beta Search",
        purpose:
          "Recursively explores the game tree with depth-aware scoring (AI win +10−depth, draw 0, AI loss depth−10), pruning irrelevant branches with alpha-beta.",
        input: "Board state + depth",
        output: "Optimal move + score",
        whyThisChoice:
          "Depth-aware Minimax with alpha-beta pruning guarantees optimal play while evaluating far fewer nodes than an unpruned search.",
        icon: BrainCircuit
      },
      {
        id: "view",
        label: "SWING VIEW",
        sublabel: "Custom Rendering",
        purpose:
          "Renders a custom Swing board with hover states and winning-line highlighting, reading AI state computed asynchronously off the EDT.",
        input: "Board state",
        output: "Interactive UI frame",
        whyThisChoice:
          "Swing gives a dependency-free desktop UI, and moving AI computation off the EDT keeps the interface responsive during search.",
        icon: LayoutDashboard
      },
      {
        id: "result",
        label: "VERIFICATION",
        sublabel: "Exhaustive Testing",
        purpose:
          "Verifies the unbeatable-AI claim through exhaustive game-tree search across every legal opponent sequence for both AI=X and AI=O.",
        input: "Full game-tree search",
        output: "Zero-loss proof + 47 tests",
        whyThisChoice:
          "Turning the claim into exhaustive evidence is what separates a demo from a defensible engineering build.",
        icon: CheckCircle2
      }
    ]
  }
];

export function getPipelineForProject(projectSlug: string): ProjectPipeline | undefined {
  return projectPipelines.find((p) => p.projectSlug === projectSlug);
}