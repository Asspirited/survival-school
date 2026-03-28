Feature: I've Had Worse — Room 13 (SS-066 / SS-094)

  Scenario: Given a user navigates to I've Had Worse, Then the page returns 200
    Given a user navigates to /survival-school/ive-had-worse
    Then the page returns 200 with HTML content

  Scenario: Given the page loads, Then it contains protagonist chips, predicament input, generic chips, and a disabled submit
    Given the I've Had Worse page loads
    Then it contains protagonist chips for selection
    And it contains trivial predicament chips (paper cut, stubbed, damp, lukewarm)
    And the predicament input is visible
    And the submit button is disabled on load

  Scenario: Given the page loads, Then it does NOT contain any roast/rationalisation chips
    Given the I've Had Worse page loads
    Then the chip list does not contain "the hotel"
    And the chip list does not contain "Deliveroo"
    And the chip list does not contain "corporate paintball"

  Scenario: Given a user submits a predicament, When the panel responds, Then the response includes panel_tension
    Given a user submits a valid predicament with a selected protagonist
    When the worker responds to POST /survival-school/ive-had-worse
    Then the response is valid JSON
    And it contains an attenborough_opening string
    And it contains a panel array with at least 3 members
    And it contains a panel_tension object
    And it contains an attenborough_terminal string
