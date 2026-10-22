import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { ArchitectureFlow } from "@/components/ui/architecture-flow";
import { PipelineExplorer } from "@/components/pipeline/pipeline-explorer";
import { getPipelineForProject } from "@/data/project-pipelines";
import { SiteChrome } from "@/components/site-chrome";
import { projects, getProjectBySlug } from "@/data/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  // The MCP RAG project has a dedicated static deep case-study page, and the
  // Tic-Tac-Toe project has a dedicated engineering case-study page, so they are
  // excluded here to avoid a route conflict with the dynamic [slug] segment.
  return projects
    .filter(
      (project) =>
        project.slug !== "mcp-rag-video-intelligence" &&
        project.slug !== "tic-tac-toe-minimax"
    )
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} Case Study`,
    description: project.description
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const hasPipeline = Boolean(getPipelineForProject(slug));

  return (
    <SiteChrome>
      <main className="min-h-screen text-white">
        <section className="mx-auto w-[min(1180px,calc(100%-32px))] py-10 sm:py-16">
        <Link href="/#projects" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200">
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <div className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan">{project.category}</p>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,7vw,6.8rem)] font-bold uppercase leading-[0.92] tracking-[-0.065em]">
            {project.title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-300">{project.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink">
              <Github className="h-4 w-4" />
              GitHub
            </a>
            {project.live ? (<a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white"><ExternalLink className="h-4 w-4" />Live Demo</a>) : null}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-white/[0.06] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Overview</p>
            <div className="mt-7 space-y-7">
              <Block title="Challenge" text={project.caseStudy?.challenge || project.description} />
              <Block title="Solution" text={project.caseStudy?.solution || "Production architecture design."} />
              <Block title="Status" text={project.status} />
            </div>
          </div>

          <div className="rounded-[2rem] bg-white/[0.06] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Architecture</p>
            <div className="mt-7">
              {hasPipeline ? (
                <PipelineExplorer projectSlug={slug} />
              ) : (
                <ArchitectureFlow steps={project.architecture} />
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <ListBlock title="Implementation" items={project.caseStudy?.implementation || []} />
          <ListBlock title="Results" items={project.caseStudy?.results || []} />
          <ListBlock title="Lessons Learned" items={project.caseStudy?.lessons || []} />
        </div>

        <div className="mt-6 rounded-[2rem] bg-white/[0.06] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Tech Stack</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-slate-200">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
    </SiteChrome>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-2 leading-7 text-slate-300">{text}</p>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[2rem] bg-white/[0.06] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">{title}</p>
      <ul className="mt-5 space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm leading-7 text-slate-300">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
