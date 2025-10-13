import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      all: true,
      exclude: ["src/**/*.test.{ts,tsx}", "src/vite-env.d.ts"],
      include: ["src/**/*.{ts,tsx}"],
      provider: "v8",
      reporter: ["text", "html"],
    },
    environment: "jsdom",
    globals: true, // optional, dann man `import { describe, test }` nicht
    setupFiles: ["./vitest.setup.ts"], // oder der neue Name deiner setup-Datei
  },
});
