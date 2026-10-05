const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "online",
    service: "UltraVideoSave",
    message: "Backend is running."
  });
});

app.post("/analyze", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: "Video URL is required."
    });
  }

  let parsed;

  try {
    parsed = new URL(url);
  } catch {
    return res.status(400).json({
      error: "Please enter a valid video URL."
    });
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return res.status(400).json({
      error: "Only HTTP and HTTPS URLs are supported."
    });
  }

  res.json({
    status: "received",
    url: parsed.href,
    message:
      "URL received. Direct authorized video processing will be connected next."
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`UltraVideoSave backend running on port ${PORT}`);
});
