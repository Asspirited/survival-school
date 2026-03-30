Feature: Curated panel archetype selector (SS-155)
  As a user of Survival School's Doors rooms
  I want to select a named panel archetype before submitting
  So that I get a curated panel with guaranteed chemistry instead of a random draw

  Background:
    Given the archetypes are defined:
      | Archetype       | Cast                              | Tension axis                          |
      | Core Four       | ray, fox, bear, cody              | quiet competence vs loud confidence   |
      | Contradictors   | ray, bear, mcnab, ryan            | maximum factual disagreement          |
      | Authority Room  | billy, fox, craighead, stroud     | minimal words, maximum judgment       |
      | Enthusiasts     | bear, coyote, middleton, gordon   | high energy, high wrongness           |
      | Pub Panel       | fox, gordon, ollie, stroud        | companionable, comedy-forward         |

  Scenario: Archetype chips are visible on the I've Had Worse page
    Given a user navigates to /survival-school/ive-had-worse
    Then archetype chips are visible below the protagonist selector
    And each archetype chip shows its name

  Scenario: Selecting an archetype highlights it
    Given a user navigates to /survival-school/ive-had-worse
    When the user clicks the "Core Four" archetype chip
    Then the "Core Four" chip has the selected state
    And no other archetype chip has the selected state

  Scenario: Deselecting an archetype returns to random draw
    Given a user navigates to /survival-school/ive-had-worse
    And the user has selected the "Core Four" archetype
    When the user clicks the "Core Four" chip again
    Then no archetype chip has the selected state

  Scenario: Selected archetype is sent to the server
    Given a user selects the "Contradictors" archetype
    When the user submits a predicament
    Then the POST body includes the archetype name

  Scenario: Server injects archetype hint into system prompt
    Given the server receives a POST with archetype "Core Four"
    Then the system prompt includes the archetype cast and tension axis
