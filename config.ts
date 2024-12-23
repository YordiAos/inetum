//../config.ts

const environments = {
    // DESA: "https://petclinic-dev.up.railway.app",
    // QA: "https://petclinic-qa.up.railway.app",
    URL: "https://petclinic-production.up.railway.app",
  };

  
  export const getEnvironmentUrl = (env: string) => {
    // Hacemos un cast a tipo 'Environment' para asegurarle a TypeScript que 'env' es válido
    const environment = env as keyof typeof environments;
    return environments[environment] || environments.URL; // Usa PROD si no se encuentra el entorno
  };
  