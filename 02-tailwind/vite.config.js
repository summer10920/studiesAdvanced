import { readdirSync } from "node:fs";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import injectHTML from "vite-plugin-html-inject";

const pages = readdirSync("pages")
  .filter((name) => name.endsWith(".html"))
  .sort()
  .map((name) => `pages/${name}`);

export default defineConfig({
  plugins: [injectHTML({ replace: { undefined: "false" } }), tailwindcss()],
  build: {
    rollupOptions: {
      input: ["index.html", ...pages],
    },
  },
});
