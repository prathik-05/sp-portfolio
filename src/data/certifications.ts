import { Sparkles } from "lucide-react";

export type VerificationStatus = "verified" | "unverified";

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  yearIssued?: number;
  verificationStatus: VerificationStatus;
  verificationUrl?: string;
  credentialId?: string;
  icon: typeof Sparkles;
}

// A certification may only be rendered "verified" when a real verification URL
// or credential ID exists. None are currently linked in this repository, so
// every entry is honestly marked "self-reported" until a public source is added.
export const certifications: Certification[] = [
  {
    id: "oci-generative-ai",
    title: "Oracle Cloud Infrastructure (OCI) 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    yearIssued: 2025,
    verificationStatus: "unverified",
    icon: Sparkles
  },
  {
    id: "qualcomm-ai-upskilling",
    title: "AI Upskilling: Hands-On Development from Model to App",
    issuer: "Qualcomm",
    verificationStatus: "unverified",
    icon: Sparkles
  },
  {
    id: "anthropic-claude-platform",
    title: "Claude Platform & Code",
    issuer: "Anthropic Academy",
    verificationStatus: "unverified",
    icon: Sparkles
  },
  {
    id: "anthropic-claude-api",
    title: "Claude with Anthropic API",
    issuer: "Anthropic Academy",
    verificationStatus: "unverified",
    icon: Sparkles
  },
  {
    id: "anthropic-intro-mcp",
    title: "Intro to MCP (Model Context Protocol)",
    issuer: "Anthropic Academy",
    verificationStatus: "unverified",
    icon: Sparkles
  },
  {
    id: "aicte-shell-edunet",
    title: "Artificial Intelligence & Data Analytics Virtual Internship",
    issuer: "AICTE, Shell India & Edunet Foundation",
    verificationStatus: "unverified",
    icon: Sparkles
  },
  {
    id: "ccna-networking-security-automation",
    title: "CCNA: Networking, Security & Automation",
    issuer: "Cisco Networking Academy",
    verificationStatus: "unverified",
    icon: Sparkles
  },
  {
    id: "ibm-skillsbuild-ai-cloud",
    title: "IBM SkillsBuild AI & Cloud Virtual Internship",
    issuer: "Edunet Foundation & AICTE",
    verificationStatus: "unverified",
    icon: Sparkles
  }
];