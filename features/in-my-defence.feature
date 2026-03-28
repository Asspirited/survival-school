Feature: In My Defence — Room 14 (SS-093)

  Scenario: Given a user navigates to In My Defence, Then the page returns 200
    Given a user navigates to /survival-school/in-my-defence
    Then the page returns 200 with HTML content

  Scenario: Given the In My Defence page loads, Then it contains protagonist chips, incident area, and a disabled submit
    Given the In My Defence page loads
    Then it contains protagonist chips for selection
    And it contains a general incident pool
    And the submit button is disabled on load

  Scenario: Given a protagonist is selected on In My Defence, Then their personal incidents become visible
    Given a user selects a protagonist on In My Defence
    Then that protagonist's personal incident chips are visible
    And the general incident pool remains visible

  Scenario: Given a protagonist and an incident are selected, Then the submit button is enabled
    Given a user selects a protagonist and an incident on In My Defence
    Then the submit button is enabled

  Scenario: Given a user submits a predicament on In My Defence, When the panel responds, Then the response contains panel members and a panel_tension field
    Given a user submits a valid predicament with a selected protagonist
    When the worker responds to POST /survival-school/in-my-defence
    Then the response is valid JSON
    And it contains an attenborough_opening string
    And it contains a panel array with at least 3 members
    And each panel member has a charId and text
    And it contains a panel_tension object
    And it contains an attenborough_verdict string

  Scenario: Given the corridor page loads, Then Room 14 is a live door linking to In My Defence
    Given a user navigates to /survival-school/rooms
    Then Room 14 is a live door
    And it links to /survival-school/in-my-defence
