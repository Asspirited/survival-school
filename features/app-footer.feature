Feature: App footer (SS-047)

  Scenario: Homepage has a footer with branding
    Given a user visits /survival-school
    Then a footer is visible below the tile grid
    And the footer contains "SURVIVAL SCHOOL"
    And the footer contains attribution text
