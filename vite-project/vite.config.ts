import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-404-html",
      writeBundle() {
        // public/404.htmlを読み込み
        const html404 = fs.readFileSync(
          path.resolve(__dirname, "404.html"),
          "utf-8"
        );
        // distディレクトリに書き込み
        fs.writeFileSync(path.resolve(__dirname, "dist/404.html"), html404);
      },
    },
  ],
  base: "/ToDoTool/",
  build: {
    outDir: "dist",
  },
});
