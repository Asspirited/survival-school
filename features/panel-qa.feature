Feature: Panel Q&A
  As a user I want to ask the survival panel any question
  So that I can hear six experts contradict each other with full conviction

  Background:
    Given I am on the Panel Q&A page at /survival-school/panel-qa

  # ── Input ──────────────────────────────────────────────────────────────────

  Scenario: Freetext input is visible on arrival
    Then I see a freetext question input field
    And I see clickable question chips below the input
    And the Submit button is inactive

  Scenario: Clicking a chip populates the freetext field
    When I click a question chip
    Then the chip text appears in the freetext field
    And the Submit button becomes active

  Scenario: Typing activates Submit
    When I type a question into the freetext field
    Then the Submit button becomes active

  Scenario: Chips cover all six environments
    Then I see at least one chip from each of: jungle, arctic, ocean, desert, urban, woodland

  # ── Panel response structure ────────────────────────────────────────────────

  Scenario: Submitting a question returns a valid JSON response
    Given I have entered a survival question
    When I press Submit
    Then the response contains an attenborough_opening field
    And the response contains a panel array
    And each panel card has a charId and a text field
    And the response contains an attenborough_verdict field
    And the response contains a panel_dynamic object

  Scenario: All six characters respond
    Given I have submitted a survival question
    When the panel responds
    Then the panel array contains a card for each of: ray, bear, cody, hales, fox, stroud

  Scenario: Attenborough bookends every response
    Given a Panel Q&A response is rendered
    Then the attenborough_opening renders above all panel cards
    And the attenborough_verdict renders below all panel cards
    And Attenborough does not appear in the panel card array

  Scenario: Attenborough's full name is displayed
    Given a Panel Q&A response is rendered
    Then the label "David Attenborough" is visible in the UI
    And the abbreviation "DA" is not used as his display name

  # ── Contradiction Engine ────────────────────────────────────────────────────

  Scenario: panel_dynamic type is always one of four valid states
    Given any Panel Q&A response
    Then panel_dynamic.type is one of: one_wrong, both_wrong, both_right, consensus

  Scenario: Contradiction renders with direct character address
    Given a response where panel_dynamic.type is one_wrong, both_wrong, or both_right
    Then panel_dynamic.between contains at least two charIds
    And at least one of those characters references the other directly in their text

  Scenario: Consensus response carries no cross-references
    Given a response where panel_dynamic.type is consensus
    Then panel_dynamic.between is empty or absent
    And no panel card references another panel member by name

  Scenario: panel_dynamic.note describes the disagreement
    Given a contradiction response
    Then panel_dynamic.note is a non-empty string
    And it describes what the characters disagree about

  # ── Navigation ──────────────────────────────────────────────────────────────

  Scenario: Panel Q&A page loads at its route
    When a user navigates to /survival-school/panel-qa
    Then the page returns 200
    And the content-type is text/html

  Scenario: Panel Q&A is live in the homepage nav
    When a user visits /survival-school
    Then the Panel Q&A nav item badge reads LIVE
    And the panel-panel-qa div contains an iframe
    And the iframe src points to /survival-school/panel-qa
