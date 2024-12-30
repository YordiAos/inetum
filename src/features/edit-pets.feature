@smoke
Feature: Agregar visita a una mascota
    @editPet @happyPath
    Scenario: El usuario agrega una visita a una mascota específica
        Given que estoy en el perfil de la mascota
        When agrego una visita con fecha "2024-12-25" y descripción "Visita de control"
        Then la visita con descripción "Visita de control" debe aparecer en la lista de visitas
