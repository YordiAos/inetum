@smoke
Feature: Add Pets to an Owner
    @addPet @happyPath
    Scenario: Add two pets to an owner and validate they appear in the list
        Given I am on the owner's profile page
        When I select "Add New Pet"
        And I fill out the pet form with valid pet information "<petName>" "<species>" "<birthDate>"
        Then Check registered pet
        Examples:
            | petName   | species | birthDate  |
            | firu | dog     | 2024-10-04 |

