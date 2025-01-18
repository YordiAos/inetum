@sovos
Feature: Obtener documentos rechazados
    @happyPath
    Scenario: Obtener la lista de documentos rechazados
        Given que he iniciado sesion y estoy en la web SOVOS "https://egw401qa.paperless.com.pe/Facturacion/jsp/gestdoc/docemi/listarDocs.jsp"
        When filtro por documentos "rechazados" de la fecha "14-01-2025"
        # Then se debe mostrar por consola o por correo los documentos rechazados
        

        # Examples:
        #     | documentId | documentName    | rejectionReason          |
        #     | 12345      | Invoice 001     | Missing required info    |
        #     | 67890      | Invoice 002     | Invalid format           |
