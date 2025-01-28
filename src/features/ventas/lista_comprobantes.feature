@smoke
Feature: Crear factura y boleta
    @happy_path

    Scenario Outline:Crear factura con producto afecto,inafecto,exonerado ,con ruc ,medio pago y destino caja creada por el usuario logueado.
        Given que estoy en la pagina de creacion 'subdominio.com/documents/create',selecciono tipo documento factura
        When ingreso un cliente con ruc
        And "<item_afecto>" "<item_inafecto>""<item_exonerado>" "<ruc>""<medio_pago>" "<destino_pago>"
        Then se debe mostrar factura creada exitosamente
        Examples:
        # USAR DATA REAL
            | item_afecto | item_inafecto | item_exonerado | ruc         | medio_pago            | destino_pago |
            | libro       | culantro      | mesa           | 20202020201 | efectivo              | caja venta 1 |
            | item1       | item2         | item3          | 20202020202 | Tarjeta de crédito    | caja venta 1 |
            | item1       | item2         | item3          | 20202020203 | Tarjeta de débito     | caja venta 1 |
            | item1       | item2         | item3          | 20202020201 | Transferencia         | caja venta 1 |
            | item1       | item2         | item3          | 20202020201 | Contado contraentrega | caja venta 1 |
            | item1       | item2         | item3          | 20202020201 | yape                  | caja venta 1 |
            | item1       | item2         | item3          | 20202020201 | Contado               | caja venta 1 |

    Scenario Outline:Crear boleta con producto afecto,inafecto,exonerado ,con dni ,medio pago y destino caja diaria.
        Given que estoy en la pagina de creacion,selecciono tipo boleta
        When ingreso un cliente con dni
        And "<item_afecto>" "<item_inafecto>""<item_exonerado>" "<dni>""<medio_pago>" "<destino_pago>"
        Then se debe mostrar boleta creada exitosamente
        Examples:
            | item_afecto | item_inafecto | item_exonerado | dni      | medio_pago            | destino_pago |
            | item1       | item2         | item3          | 10101010 | efectivo              | caja venta 1 |
            | item1       | item2         | item3          | 10101010 | Tarjeta de crédito    | caja venta 1 |
            | item1       | item2         | item3          | 10101010 | Tarjeta de débito     | caja venta 1 |
            | item1       | item2         | item3          | 10101010 | Transferencia         | caja venta 1 |
            | item1       | item2         | item3          | 10101010 | Contado contraentrega | caja venta 1 |
            | item1       | item2         | item3          | 10101010 | yape                  | caja venta 1 |
            | item1       | item2         | item3          | 10101010 | Contado               | caja venta 1 |

