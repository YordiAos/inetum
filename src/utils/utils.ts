// src/utils/utils.ts
import { Page } from "@playwright/test";
import path from "path";
import fs from "fs";

// export async function captureAndAttachScreenshot(
//   context: any,
//   page: Page,
//   description: string
// ) {
//   // let screenshot: Buffer;
//   // screenshot = await page.screenshot();
  
//   // test.info().attach(description, {
//   //   body: screenshot,
//   //   contentType: "image/png",
//   // });
//   const screenshotPath = path.join(__dirname, "screenshots", `${description}.png`);
//   // Captura la pantalla y guarda la imagen
//   await page.screenshot({ path: screenshotPath });
//   // Verifica que 'context' tenga 'attach' y adjunta la imagen
//   if (context && context.attach) {
//     context.attach(fs.readFileSync(screenshotPath), 'image/png');
//   } else {
//     console.error("No se puede adjuntar la imagen, 'context.attach' no está disponible.");
//   }
// }

// export async function captureAndAttachScreenshot(page: Page, description: string) {
//   const screenshotPath = path.join(__dirname, '..', 'screenshots', `${description}-${Date.now()}.png`);
//   await page.screenshot({ path: screenshotPath });
//   console.log(`Captura de pantalla guardada en: ${screenshotPath}`);
//   return screenshotPath;
// }
export async function captureAndAttachScreenshot(page: Page, screenshotName: string): Promise<Buffer> {
  const screenshotDir = path.join(__dirname, '../../reports/screenshots');

  // Asegúrate de que el directorio exista
  // if (!fs.existsSync(screenshotDir)) {
  //   fs.mkdirSync(screenshotDir);
  // }

  const screenshotPath = path.join(screenshotDir, `${screenshotName}.png`);

  // Toma la captura de pantalla y la guarda
  await page.screenshot({ path: screenshotPath });

  // Devuelve el contenido del archivo como Buffer
  return fs.readFileSync(screenshotPath);
}
