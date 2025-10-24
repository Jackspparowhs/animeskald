import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const enterSection = (section: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentSection", section);
      router.push("/main");
    }
  };

  const categories = [
    { name: "Anime", emoji: "🎭" },
    { name: "Manga", emoji: "📚" },
    { name: "Movies", emoji: "🎬" },
    { name: "Cartoon", emoji: "🐱" },
    { name: "Hentai", emoji: "🔞" },
    { name: "More", emoji: "➕" },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Choose Your World 🌎</h1>
      <div className={styles.grid}>
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={styles.category}
            onClick={() => enterSection(cat.name.toLowerCase())}
          >
            <span style={{ fontSize: "2rem" }}>{cat.emoji}</span>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
