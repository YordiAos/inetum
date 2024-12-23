@smoke
Feature: Search and Edit an Owner
    @edit @happyPath
    Scenario: Search and edit an existing owner
        Given I navigate to the "Find Owners" page
        When I search for an owner "aguila"
        And I click on the "Edit" button for the owner
        And I change the owner name to "Jordi edit"
        Then the owner name should be updated in the owner list "Jordi edit"
