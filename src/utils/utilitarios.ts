export class Utilitarios {
  transformarTexto(input: string): string {
    // Reemplaza los saltos de línea (\n) por un espacio en blanco
    return input.replace(/\n/g, " ");
  }
}
