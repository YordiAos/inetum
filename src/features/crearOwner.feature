@smoke
Feature: Add a New Owner
    @create @happyPath
    Scenario Outline: Add a new owner successfully
        Given I am on the "Find Owners" page
        When I select "Add New Owner"
        And I fill out the form with valid owner information
            | firstName   | lastName   | address   | city   | telephone   |
            | <firstName> | <lastName> | <address> | <city> | <telephone> |
        Then verify owner created
            | firstName   | lastName   |
            | <firstName> | <lastName> |
        Examples:
            | firstName | lastName | address       | city          | telephone  |
            | Jordi1    | Aguila1  | 123 Main St 1 | Springfield 1 | 1000010001 |
            # | Jordi2    | Aguila2  | 123 Main St 2 | Springfield 2 | 1000010002 |
            # | Jordi3    | Aguila3  | 123 Main St 3 | Springfield 3 | 1000010003 |
