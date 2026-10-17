import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: [
        "index.html",
        "pages/01-compare.html",
        "pages/02-naming.html",
        "pages/03-size.html",
        "pages/04-scan.html",
        "pages/05-palette.html",
        "pages/06-opacity.html",
        "pages/07-paint.html",
        "pages/08-theme.html",
        "pages/09-dark-system.html",
        "pages/10-dark-toggle.html",
        "pages/11-button.html",
        "pages/12-card.html",
        "pages/13-nav.html",
        "pages/14-form.html",
        "pages/15-scale.html",
        "pages/16-layout.html",
        "pages/17-states.html",
        "pages/18-formula.html",
        "pages/19-mobile.html",
        "pages/20-breakpoints.html",
        "pages/21-container.html",
        "pages/22-custom-breakpoint.html",
        "pages/23-container-query.html",
      ],
    },
  },
});
