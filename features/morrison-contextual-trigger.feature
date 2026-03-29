Feature: Morrison contextual trigger (SS-099)

  Scenario: Morrison appears when trigger word is mentioned
    Given Morrison is not currently in the room
    And the predicament or panel discussion contains a trigger word
    When the panel responds
    Then Morrison has approximately 80% chance of appearing
    And his interruption references the trigger word

  Scenario: Trigger words include Morrison-relevant themes
    Given the trigger word list includes: door, doors, the end, end, death, die, dead,
      snake, desert, poetry, poet, fire, light, break on through, ride, storm,
      crystal ship, strange, wilderness
    When any of these appear in user input or panel context
    Then Morrison's appearance probability increases from 20% to 80%

  Scenario: Morrison responds to the trigger as if addressed
    Given Morrison appears via contextual trigger
    When he delivers his quote
    Then the quote relates to the trigger word or theme
    And the panel reacts as if Morrison appeared out of nowhere
