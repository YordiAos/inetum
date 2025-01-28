export class GeneradorCorreo {
    // Función para generar una cadena aleatoria
    generarCadenaAleatoria(longitud: number): string {
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let cadenaAleatoria = '';
      for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        cadenaAleatoria += caracteres[indiceAleatorio];
      }
      return cadenaAleatoria;
    }
  
    // Método para generar el correo
    generarCorreo(longitud: number): string {
      const cadenaGenerada = this.generarCadenaAleatoria(longitud) + '@correo.com';
      return cadenaGenerada;
    }
  }
  
  
  