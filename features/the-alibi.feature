Feature: The Alibi — Room 15 (SS-131)

  Two characters. Same event. Two stories. Neither fully concedes.
  The rest of the panel cross-examines, takes sides, argues amongst
  themselves. The alibi characters give ground, score points, redirect,
  and accidentally confirm each other's lies.

  Scenario: Given a user navigates to The Alibi, Then the page returns 200
    Given a user navigates to /survival-school/the-alibi
    Then the page returns 200 with HTML content

  Scenario: Given the page loads, Then it contains two protagonist selectors, event chips, and a disabled submit
    Given the Alibi page loads
    Then it contains a first protagonist selector with character chips
    And it contains a second protagonist selector with character chips
    And it contains event chips (Bravo Two Zero, the fire, the snake, the extraction)
    And the freetext event input is visible
    And the submit button is disabled on load

  Scenario: Given both protagonists and an event are selected, Then the submit button is enabled
    Given a user selects two different protagonists and an event
    Then the submit button is enabled

  Scenario: Given a user cannot select the same character for both protagonist slots
    Given a user selects McNab as protagonist 1
    Then McNab is not selectable as protagonist 2

  Scenario: Given a user submits an alibi, When the panel responds, Then the response contains both accounts, panel cross-examination, and panel argument
    Given a user submits two protagonists and an event
    When the worker responds to POST /survival-school/the-alibi
    Then the response is valid JSON
    And it contains an attenborough_opening string
    And it contains account_1 with a charId and text (protagonist 1's version)
    And it contains account_2 with a charId and text (protagonist 2's version)
    And it contains a panel array with at least 2 members (the jury)
    And panel members have their own positions, questions, and arguments with each other
    And it contains a panel_tension object
    And it contains an attenborough_verdict string

  Scenario: Given the corridor page loads, Then Room 15 is a live door linking to The Alibi
    Given a user navigates to /survival-school/rooms
    Then Room 15 is a live door
    And it links to /survival-school/the-alibi
