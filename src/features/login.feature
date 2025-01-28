
Feature: Login y Selección de Productos en Wong
  Como usuario
  Quiero iniciar sesión en la aplicación
  Para realizar compras en la tienda Wong.

  @login
  Scenario Outline: Usuario inicia sesión y selecciona productos
    Given un usuario de tipo "<tipo_usuario>" con correo "<correo>" y clave "<clave>"
    When el usuario ingresa con las credenciales
    Then el usuario debería poder buscar el producto "<producto>" y seleccionar la tienda "<tienda>"
    
    Examples:
      | tipo_usuario      | correo                          | clave       | producto | tienda       |
      | Usuario regular   | francesca.montilla@coderio.co   | Cenco1234   | arroz    | Wong Ate     |
      | Usuario nuevo     | yordidosaguilar@gmail.com       | 123456aA    | avena    | Wong Ate     |
