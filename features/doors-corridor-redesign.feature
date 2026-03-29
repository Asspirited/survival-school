Feature: Doors corridor UI redesign (SS-138)

  Scenario: Jim Morrison welcome block is present
    Given a user navigates to /survival-school/rooms
    Then the page contains Jim's conversational welcome text
    And the welcome text includes "You found the corridor"

  Scenario: Door tiles show room names instead of numbers
    Given a user navigates to /survival-school/rooms
    Then each live door tile displays the room name
    And no door tile displays a door number

  Scenario: Door tiles show gold italic teasers
    Given a user navigates to /survival-school/rooms
    Then each live door tile has a teaser element
    And the teaser uses Crimson Text italic styling

  Scenario: Locked doors are visible with teasers
    Given a user navigates to /survival-school/rooms
    Then locked doors display their room name and teaser
    And locked doors are visually greyed

  Scenario: Crimson Text font is loaded
    Given a user navigates to /survival-school/rooms
    Then the page includes a Google Fonts link for Crimson Text
