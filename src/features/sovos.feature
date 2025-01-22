#npx cucumber-js src/features --tags "@sovos"
@sovos
Feature: Obtener documentos rechazados
    @happyPath
    Scenario: Obtener la lista de documentos rechazados
        Given que he iniciado sesion y estoy en la web SOVOS "https://egw401qa.paperless.com.pe/Facturacion/jsp/gestdoc/docemi/listarDocs.jsp"
        #Usar formato dia-mes-año "14-01-2025"
        #si no se agrega fecha osea fecha igual a vacio "" tomara la fecha actual
        When filtro por documentos "rechazados" del dia "14-01-2025"
        
