Feature: Panel composure engine — How Screwed Am I (SS-088)

  Scenario: Given a first-round submission, Then the response includes an initialised composureState
    Given a user submits a scenario on How Screwed Am I for the first time
    When the worker responds to POST /survival-school/app
    Then the response contains a composureState object
    And each character in the panel has a numeric composure value

  Scenario: Given a second-round submission with composureState, Then panel order reflects composure (lowest first)
    Given a user submits a decision on round 2 with a composureState where one character is rattled
    When the worker responds to POST /survival-school/app
    Then the rattled character appears earlier in the panel array than characters with higher composure
    And the response contains an updated composureState

  Scenario: Given a panel_tension callout targeting a character, Then that character's composure decreases in the returned state
    Given round 1 returns a panel_tension of type callout targeting ray
    When the returned composureState is examined
    Then ray's composure is lower than his baseline value of 8

  Scenario: Given a character reaches RATTLED tier, Then their system prompt injection reflects the register shift
    Given a character's composure is between 2 and 3
    When the worker builds the system prompt
    Then that character's voice instruction includes their pressure response behaviour

  Scenario: Given a character reaches GONE tier, Then their response reflects full register collapse
    Given a character's composure is 0 or 1
    When the panel responds
    Then that character's text reflects their gone-state pressure response
