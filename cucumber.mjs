export default {
  require: ["src/**/*.ts"],   // Ruta a los archivos de pasos
  requireModule: ["ts-node/register"],  // Configuración para TypeScript
  features: ['./src/features/**/*.feature'],
  // tags: "@create",   // Filtro para ejecutar solo los escenarios con este tag
  publishQuiet: true,
  format: [
    'json:./reports/cucumber-report.json',  // Reporte en formato JSON
    'html:./reports/cucumber-report.html'   // Reporte en formato HTML
  ]
};
