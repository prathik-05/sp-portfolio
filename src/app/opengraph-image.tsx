import { ImageResponse } from "next/og";

export const alt = "Prathik Salla — Software Engineer (AI/ML & Systems)";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#07090e",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(229, 9, 20, 0.15), transparent 45%), radial-gradient(circle at 80% 80%, rgba(0, 240, 255, 0.12), transparent 45%)",
          padding: "64px 72px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "14px",
              fontFamily: "monospace",
              letterSpacing: "0.22em",
              color: "#e50914",
              fontWeight: 700,
              textTransform: "uppercase"
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#22c55e"
              }}
            />
            Ace Engineering College &apos;27 · Open for Opportunities
          </div>

          <div
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#94a3b8",
              letterSpacing: "0.15em",
              textTransform: "uppercase"
            }}
          >
            Hyderabad, India
          </div>
        </div>

        {/* Center editorial */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px"
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: "-0.03em"
            }}
          >
            Prathik Salla
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#00f0ff",
              letterSpacing: "0.08em",
              textTransform: "uppercase"
            }}
          >
            Software Engineer — AI/ML & Systems
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "#cbd5e1",
              maxWidth: "880px",
              lineHeight: 1.5,
              marginTop: "8px"
            }}
          >
            Building multimodal RAG architectures, 45+ FPS real-time vision pipelines (YOLOv11),
            and production-grade Spring Boot backend systems.
          </div>
        </div>

        {/* Bottom metrics & tech stack */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
            width: "100%"
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "28px",
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#e2e8f0"
            }}
          >
            <span>Python · Java · SQL</span>
            <span>·</span>
            <span>RAG & ChromaDB</span>
            <span>·</span>
            <span>YOLOv11 Stream</span>
            <span>·</span>
            <span>Spring Boot REST</span>
          </div>

          <div
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#64748b"
            }}
          >
            sp-portfolio.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
