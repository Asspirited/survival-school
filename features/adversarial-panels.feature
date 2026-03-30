Feature: Adversarial panels — debate mode (SS-161)
  As a Survival School user
  I want two characters to debate a survival topic
  So that I can steer both sides and watch the argument escalate

  Scenario: Page loads with two character selectors and topic input
    Given a user navigates to /survival-school/debate
    Then the page returns 200
    And two character selector groups are visible (Player 1 and Player 2)
    And a topic input is visible
    And a submit button is present and disabled

  Scenario: Selecting both characters and entering a topic enables submission
    Given a user selects Bear Grylls as Player 1
    And selects Ray Mears as Player 2
    And enters a debate topic
    Then the submit button is enabled

  Scenario: Submitting generates opening arguments from both characters
    Given both characters are selected and a topic is entered
    When the user submits
    Then the AI generates an opening argument for each character
    And the arguments reflect each character's voice and position

  Scenario: User can trigger next round of escalation
    Given the opening arguments have been generated
    When the user clicks "Escalate"
    Then both characters double down on their positions
    And the arguments become more extreme and specific
