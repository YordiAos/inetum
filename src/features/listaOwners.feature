@smoke
Feature: Manage Owners in Petclinic
  @list @happyPath
  Scenario: Access and display the list of owners
    Given I navigate to the Petclinic home page
    When I access the "Owners" section
    Then I should see a list of registered pet owners
