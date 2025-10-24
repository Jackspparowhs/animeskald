import { useEffect, useState } from "react";

type ContentItem = {
  title: string;
  image?: string;
};

export default function Main() {
  const [section, setSection] = useState("anime");
  const [content, setContent] = useState<ContentItem[]>([]);

  const apis: Record<string, string> = {
    anime: "https://example.com/api/anime",
    manga: "https://example.com/api/manga",
    movies: "https://example.com/api/movies",
    cartoon: "https://example.com/api/cartoons",
    hentai: "https://example.com/api/hentai",
    more: "https://example.com/api/more",
  };

  useEffect(() => {
    const saved = localStorage.getItem("currentSection") || "anime";
    setSection(saved);
    loadSection(saved);
  }, []);

  const loadSection = async (sec: string) => {
    try {
      const res = await fetch(apis[sec]);
      const data = await res.json();
      setContent(data.results || []);
    } catch (err) {
      console.error(err);
      setContent([]);
    }
  };

  const switchSection = (sec: string) => {
    localStorage.setItem("currentSection", sec);
    setSection(sec);
    loadSection(sec);
  };

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        {Object.keys(apis).map((sec) => (
          <button
            key={sec}
            onClick={() => switchSection(sec)}
            style={{
              margin: "5px",
              padding: "10px 15px",
              background: section === sec ? "#ff0044" : "#222",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {sec.toUpperCase()}
          </button>
        ))}
      </header>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {section.toUpperCase()}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {content.length > 0 ? (
          content.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#111",
                padding: "10px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <img
                src={item.image || "https://via.placeholder.com/180x250?text=No+Image"}
                alt={item.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <h4 style={{ marginTop: "10px" }}>{item.title}</h4>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>Loading or no data...</p>
        )}
      </div>
    </div>
  );
}
