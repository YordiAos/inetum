// src/utils/utils.ts
import { Page } from "@playwright/test";
import path from "path";
import fs from "fs";

export class Utils {
  static async captureAndAttachScreenshot(page: Page, screenshotName: string): Promise<Buffer> {
    const screenshotDir = path.join(__dirname, "../../reports/screenshots");

    // Asegúrate de que el directorio exista
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    const screenshotPath = path.join(screenshotDir, `${screenshotName}.png`);

    // Toma la captura de pantalla y la guarda
    await page.screenshot({ path: screenshotPath });

    // Devuelve el contenido del archivo como Buffer
    return fs.readFileSync(screenshotPath);
  }

  static transformarTexto(input: string): string {
    // Reemplaza los saltos de línea (\n) por un espacio en blanco
    return input.replace(/\n/g, " ");
  }
}
