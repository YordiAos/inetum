// src/utils/utils.ts
import { test, Page } from "@playwright/test";
import path from "path";

export async function captureAndAttachScreenshot(
  page: Page,
  description: string
) {
  let screenshot: Buffer;
  screenshot = await page.screenshot();

  test.info().attach(description, {
    body: screenshot,
    contentType: "image/png",
  });
}
