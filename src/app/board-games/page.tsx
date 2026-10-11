import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board Games",
};

export default function BoardGamesPage() {
  return (
    <iframe
      src="/board-games-preview/index.html"
      title="MathSoc board games catalogue preview"
      style={{
        display: "block",
        width: "100%",
        height: "85vh",
        border: 0,
      }}
    />
  );
}