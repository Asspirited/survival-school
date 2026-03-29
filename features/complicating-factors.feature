Feature: Complicating Factors — How Screwed Am I
  As a user of How Screwed Am I
  I want to optionally select a complicating factor that undermines a panel member's credibility
  So that the panel must address the elephant in the room while advising me

  Background:
    Given the How Screwed Am I page is loaded
    And the complicating factors chip section is visible below the scenario input

  Scenario: Assessment with no complicating factor
    Given a user selects a scenario
    And no complicating factor chip is selected
    When they hit Assess
    Then the panel responds as normal
    And the response JSON does not contain a complicating_factor field

  Scenario: Assessment with one complicating factor
    Given a user selects a scenario
    And selects the complicating factor "Bear was recently seen at a Travelodge 400m from the filming location"
    When they hit Assess
    Then the response JSON contains the panel array
    And at least one panel card references the complicating factor

  Scenario: Complicating factor chips are optional
    Given the complicating factors section is labelled "Complicating factors (optional)"
    Then the ASSESS button is enabled without selecting a complicating factor

  Scenario: Multiple complicating factors can be selected
    Given a user selects two complicating factor chips
    Then both chips show the selected state
    And the complicating_factors array in the request contains both selections
