import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  use: {
    // Establece el tamaño de la ventana globalmente para todas las pruebas
    viewport: { width: 1900, height: 900 },
  },
  workers: 1,
  retries: 2, // Establece el número de reintentos por prueba fallida (opcional)
  reporter: [
    ["html", { outputFolder: "test-results/report", open: "always" }], // Reporte HTML
    ["json", { outputFile: "test-results/results.json" }], // Reporte JSON
  ],
});
