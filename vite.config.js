import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/HiewHub-Draft1/',
  plugins: [tailwindcss(), react()],
});