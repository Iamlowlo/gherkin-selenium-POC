Feature: Finding some cheese
  Testing example with selenium

  Scenario: As an user I want to search words on google
    Given I'm browsing
    And I go to the Google search page
    When I search for "cheese"
    Then the page title should start with "cheese"