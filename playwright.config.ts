// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  use: {
    // Establece el tamaño de la ventana globalmente para todas las pruebas
    
    actionTimeout: 19000, // Establece un tiempo máximo para las acciones,clic,esperas
    headless: false, // false muestra el navegador
    navigationTimeout: 63000, // Tiempo máximo para navegaciones (1 minuto)
  },
  workers: 1,
  retries: 2, // Establece el número de reintentos por prueba fallida (opcional)
  reporter: [
    ["html", { outputFolder: "test-results/report", open: "always" }], // Reporte HTML
    ["json", { outputFile: "test-results/results.json" }], // Reporte JSON
  ],
});
