Feature: The Expert Witness — Room 16 (SS-133)

  A fish-out-of-water character is presented as the survival expert.
  The real experts defer to them. The deference is obviously wrong.
  Everyone knows. Nobody says. As rounds progress, the deference cracks.

  Scenario: Given a user navigates to The Expert Witness, Then the page returns 200
    Given a user navigates to /survival-school/the-expert-witness
    Then the page returns 200 with HTML content

  Scenario: Given the page loads, Then it contains an expert selector limited to fish-out-of-water characters, a scenario input, and a disabled submit
    Given the Expert Witness page loads
    Then it contains expert chips for fish-out-of-water characters only (Cox, Faldo, Jim, Hawking, Lee, Bristow, Keane)
    And it contains scenario chips and a freetext scenario input
    And the submit button is disabled on load

  Scenario: Given an expert and scenario are selected, Then the submit button is enabled
    Given a user selects an expert and a scenario
    Then the submit button is enabled

  Scenario: Given a user submits, When the panel responds, Then the response contains the expert analysis, deferring panel, and Attenborough verdict
    Given a user submits an expert and a scenario
    When the worker responds to POST /survival-school/the-expert-witness
    Then the response is valid JSON
    And it contains an attenborough_opening string
    And it contains an expert_analysis with a charId and text (the fish-out-of-water's confident analysis)
    And it contains a panel array with at least 2 real experts who defer
    And each panel member has a charId, text, and deference_holding boolean
    And it contains a panel_tension object
    And it contains an attenborough_verdict string

  Scenario: Given the corridor page loads, Then Room 16 is a live door linking to The Expert Witness
    Given a user navigates to /survival-school/rooms
    Then The Expert Witness is a live door
    And it links to /survival-school/the-expert-witness
