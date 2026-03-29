Feature: Packham Ethical Override (SS-013)

  Background:
    Given packham is a valid charId in panel responses
    And packham appears in PANEL_POOL rotation

  Scenario: Packham appears as a panel member in I've Had Worse
    Given a user submits a predicament on I've Had Worse
    When the panel responds with packham in the drawn panel
    Then the response JSON contains a panel entry with charId "packham"
    And the panel entry has a non-empty text field

  Scenario: Packham appears as a panel member in In My Defence
    Given a user submits a roast on In My Defence
    When the panel responds with packham in the drawn panel
    Then the response JSON contains a panel entry with charId "packham"

  Scenario: System prompt includes Ethical Override instruction
    Given the IHW system prompt is built with packham in the panel
    Then the prompt text contains Ethical Override trigger instructions
    And the prompt text references animal welfare as the trigger condition

  Scenario: Packham + Cody simultaneous override instruction present
    Given the IHW system prompt is built with both packham and cody in the panel
    Then the prompt text contains instructions for simultaneous override behaviour
