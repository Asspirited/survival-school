Feature: Cross-character panel references (SS-060)

  Scenario: System prompt includes cross-reference instruction in IHW
    Given the IHW system prompt is built
    Then the prompt contains instruction for optional reacts_to references
    And the prompt lists valid register values

  Scenario: System prompt includes cross-reference instruction in IMD
    Given the IMD system prompt is built
    Then the prompt contains instruction for optional reacts_to references

  Scenario: Output schema includes optional reacts_to field in IHW
    Given the IHW output schema definition
    Then the panel card schema includes an optional reacts_to object
    And reacts_to contains charId and register fields

  Scenario: Client renders thread indicator for reacts_to
    Given a panel card has a reacts_to field referencing another character
    Then the card displays a thread indicator element
