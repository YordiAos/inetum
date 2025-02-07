import dotenv from "dotenv";

dotenv.config();

// Definimos los entornos permitidos
const environments = {
  GD: process.env.WEB_GDATA_WONG || "https://wongfoodqawlschv6io.myvtex.com",
  QA: process.env.WEB_QA_WONG || "https://www.pruebasqa.wong.pe",
  PROD: process.env.WEB_PROD_WONG || "https://www.wong.pe",
} as const; // `as const` hace que los valores sean inmutables y bien tipados

// Definimos un tipo específico para los entornos permitidos
type EnvironmentType = keyof typeof environments;

export const TIMEOUTS = {
  ELEMENTS: parseInt(process.env.TIMEOUT_ELEMENTS || "59001", 10),
  PAGES: parseInt(process.env.TIMEOUT_PAGES || "60001", 10),
  STEPS: parseInt(process.env.TIMEOUT_STEPS || "61001", 10),
};

/**
 * Obtiene la URL del entorno basado en la variable `env`.
 * Si el entorno no es válido, se usa `QA` por defecto.
 */
export const getEnvironmentUrl = (env: string): string => {
  const environment = env.toUpperCase() as EnvironmentType;
  if (!Object.keys(environments).includes(environment)) {
    console.warn(`⚠️ Advertencia: Entorno '${env}' no reconocido. Usando QA por defecto.`);
    return environments.QA;
  }
  return environments[environment];
};
