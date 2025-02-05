# npx cucumber-js src/features --tags "@login" --retry 2

@smoke
Feature: Login en la web Wong
  Como usuario nuevo,regular,prime
  Quiero iniciar sesión en la aplicación web

  @login
  Scenario Outline: Usuario inicia sesión y selecciona productos
    Given un usuario de tipo "<tipo_usuario>" con correo "<correo>" y clave "<clave>"
    When el usuario ingresa con las credenciales
    Then el usuario debería poder buscar el producto "<producto>" y seleccionar la tienda "<tienda>"

    # Bug modal (aparece aleatoriamente)
    # Sigue acumulando tus stickers virtuales y puntos bonus con tus compras en Wong.pe
    # Aún no tienes los puntos y/o stickers suficientes.
    Examples:
      | tipo_usuario    | correo                        | clave     | producto | tienda   |
      | Usuario regular | francesca.montilla@coderio.co | Cenco1234 | leche    | Wong Ate |
      | Usuario nuevo   | yordidosaguilar@gmail.com     | 123456aA  | arroz    | Wong Ate |
