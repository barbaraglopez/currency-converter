import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Importa el plugin de React
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
