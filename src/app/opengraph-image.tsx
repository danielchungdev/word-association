import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Word Association — Daily Word Chain Puzzle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f5f5f5",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
            }}
          >
            {["W", "O", "R", "D"].map((letter) => (
              <div
                key={letter}
                style={{
                  width: 80,
                  height: 80,
                  background: "#171717",
                  color: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                  fontWeight: 700,
                  borderRadius: 8,
                }}
              >
                {letter}
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "#171717",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Word Association
          </p>
          <p
            style={{
              fontSize: 26,
              color: "#525252",
              margin: 0,
            }}
          >
            A new word chain puzzle every day
          </p>
        </div>
      </div>
    ),
    size,
  );
}
