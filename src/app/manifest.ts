import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prathik Salla Portfolio",
    short_name: "Prathik",
    description: "AI and software engineering portfolio for Prathik Salla.",
    start_url: "/",
    display: "standalone",
    background_color: "#07070b",
    theme_color: "#00a2ff"
  };
}
