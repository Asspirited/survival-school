Feature: One Man In — EXFIL/INFIL mode (SS-054)

  Scenario: User submits an EXFIL scenario
    Given a user navigates to /survival-school/one-man-in
    And selects a situation chip or types a freetext situation
    When they hit the submit button
    Then an EXFIL assessment is displayed
    And Craighead delivers a flat, directive briefing
    And at least 3 panel members respond in voice
    And Attenborough narrates the approach
    And an exfil_probability is shown

  Scenario: Scenario chips cover both serious and absurd
    Given the One Man In page loads
    Then there are scenario chips for both operational and mundane situations
    And at least one involves a supermarket or comparable location

  Scenario: Homepage tile links to One Man In
    Given a user navigates to /survival-school
    Then a tile links to /survival-school/one-man-in
