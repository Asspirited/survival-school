Feature: Multi-turn auto-escalation loop for Doors features (SS-061)

  Scenario: IHW panel response includes automatic protagonist response
    Given the panel has responded on I've Had Worse
    Then the response JSON includes a protagonist_response field
    And the protagonist response is a non-empty string

  Scenario: IHW system prompt instructs protagonist auto-response
    Given the IHW system prompt is built
    Then the prompt contains instruction for protagonist_response
    And the prompt instructs the protagonist to make their position worse each round

  Scenario: IHW page contains LET THEM DIG button
    Given a user navigates to /survival-school/ive-had-worse
    Then the page contains a LET THEM DIG interaction element

  Scenario: IMD panel response includes automatic protagonist response
    Given the panel has responded on In My Defence
    Then the response JSON includes a protagonist_response field

  Scenario: IMD page contains LET THEM DIG button
    Given a user navigates to /survival-school/in-my-defence
    Then the page contains a LET THEM DIG interaction element
