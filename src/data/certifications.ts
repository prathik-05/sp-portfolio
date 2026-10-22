import { Sparkles, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

export type VerificationStatus = "verified" | "unverified";

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  yearIssued: number;
  verificationStatus: VerificationStatus;
  verificationUrl?: string;
  credentialId?: string;
  featured?: boolean;
  icon: typeof Sparkles;
}

export const certifications: Certification[] = [
  {
    id: "qualcomm-ai-upskilling",
    title: "AI Upskilling: Hands-On Development from Model to App",
    issuer: "Qualcomm",
    yearIssued: 2026,
    verificationStatus: "verified",
    credentialId: "Badge20260527-32-sbp29p",
    featured: true,
    icon: Award
  },
  {
    id: "ccna-networking-security-automation",
    title: "CCNA: Enterprise Networking, Security & Automation",
    issuer: "Cisco Networking Academy",
    yearIssued: 2026,
    verificationStatus: "verified",
    credentialId: "1921ea60-0b35-48e5-b742-68565647c748",
    featured: true,
    icon: ShieldCheck
  },
  {
    id: "oci-generative-ai",
    title: "Oracle Cloud Infrastructure (OCI) Certified Generative AI Professional",
    issuer: "Oracle",
    yearIssued: 2025,
    verificationStatus: "verified",
    credentialId: "OCI-GENAI-2025",
    featured: true,
    icon: Sparkles
  },
  {
    id: "aicte-shell-edunet",
    title: "Artificial Intelligence & Data Analytics Virtual Internship",
    issuer: "AICTE, Shell India & Edunet Foundation",
    yearIssued: 2026,
    verificationStatus: "verified",
    credentialId: "AICTE-Shell-277177",
    featured: true,
    icon: CheckCircle2
  },
  {
    id: "anthropic-intro-mcp",
    title: "Intro to MCP (Model Context Protocol)",
    issuer: "Anthropic Academy",
    yearIssued: 2025,
    verificationStatus: "unverified",
    featured: false,
    icon: Sparkles
  },
  {
    id: "anthropic-claude-api",
    title: "Claude with Anthropic API Architecture",
    issuer: "Anthropic Academy",
    yearIssued: 2025,
    verificationStatus: "unverified",
    featured: false,
    icon: Sparkles
  },
  {
    id: "anthropic-claude-platform",
    title: "Claude Platform & Code Systems",
    issuer: "Anthropic Academy",
    yearIssued: 2025,
    verificationStatus: "unverified",
    featured: false,
    icon: Sparkles
  },
  {
    id: "ibm-skillsbuild-ai-cloud",
    title: "IBM SkillsBuild AI & Cloud Virtual Internship",
    issuer: "Edunet Foundation & AICTE",
    yearIssued: 2026,
    verificationStatus: "unverified",
    featured: false,
    icon: Sparkles
  }
];
