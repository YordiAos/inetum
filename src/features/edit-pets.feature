@smoke
Feature: Edit Pets to an Owner
    @editPet @happyPath
    Scenario: Edit pets to an owner and validate they appear in the list
        Given I am on the owner's profile page
        When I select "Add New Pet"
        And I fill out the pet form with valid pet information "<petName>" "<species>" "<birthDate>"
        Then Check update pet
        Examples:
            | petName   | species | birthDate  |
            | aleatorio | dog     | 2024-10-04 |

