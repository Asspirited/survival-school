Feature: User as panel member (SS-159)
  As a Survival School user
  I want to play as a panel character and respond in their voice
  So that I can participate in the comedy rather than just spectate

  Scenario: Page loads with character identity selector
    Given a user navigates to /survival-school/play-as
    Then the page returns 200
    And character identity chips are visible
    And a predicament input is visible
    And a submit button is present and disabled

  Scenario: Selecting a character identity enables submission
    Given a user selects "I'm Bear Grylls" as their identity
    And the user enters a predicament
    Then the submit button is enabled

  Scenario: Submitting generates panel responses without the user's character
    Given the user is playing as Bear Grylls
    When the user submits a predicament
    Then the AI panel responds with all characters except Bear
    And the user is prompted to respond in character

  Scenario: User submits their in-character response
    Given the panel has responded
    And the user types their response in character
    When the user submits their response
    Then the AI evaluates whether the response matches the character's register
    And the panel reacts to the user's contribution

  Scenario: Panel calls out register breaks
    Given the user's response breaks character register
    Then at least one panel member notes the discrepancy
    And the register evaluation includes specific feedback
