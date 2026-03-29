Feature: Irwin Memorial Encounter (SS-012)

  Scenario: User picks an animal and watches Irwin find it
    Given a user navigates to /survival-school/irwin-memorial
    When they select an animal
    Then Steve Irwin finds and handles the animal
    And the panel rates the user's nerve watching
    And the response ends with "Crikey"
    And Attenborough delivers a closing verdict

  Scenario: Stingray Rule fires
    Given a user selects "stingray" as the animal
    When the panel responds
    Then the panel goes silent
    And Attenborough speaks one sentence
    And the encounter ends immediately

  Scenario: Tribute framing
    When the panel responds to any Irwin encounter
    Then Steve is never depicted as being in danger
    And the tone is tribute, not mockery
