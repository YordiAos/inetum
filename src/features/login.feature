# npx cucumber-js src/features --tags "@login" --retry 2

@smoke
Feature: Login en la web Wong
  Como usuario nuevo,regular,prime
  Quiero iniciar sesión en la aplicación web

  @login
  Scenario Outline: Usuario inicia sesión y selecciona productos
    Given un usuario "<tipo_usuario>" con el correo "<correo>" y clave "<clave>" inicia sesión en la web
    When busca el producto "<producto>"
    And selecciona la tienda "<tienda>" para la compra
    And el producto debería aparecer en la página del carrito
    # Then

    # Bug (modal puntos bonus,sticker aparece aleatoriamente)
    Examples:
      | tipo_usuario    | correo                        | clave     | producto | tienda   |
      # Usuario regular falla al no tener direcciones
      | Usuario nuevo   | yordidosaguilar@gmail.com     | 123456aA  | arroz    | Wong Ate |
      | Usuario regular | francesca.montilla@coderio.co | Cenco1234 | cafe     | Wong Ate |
# check de autorizo datos solo para user jose
# | Usuario colaborador | jose.gutierrez@cencosud.com.pe | Cencosud12 | fideo    | Wong Ate |
# | Usuario prime     | sukey.alva@cencosud.com.pe     | Cencosud8910 | fideo    | Wong Ate |



