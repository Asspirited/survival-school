Feature: Cox and Faldo argue — no expert present (SS-091)

  Background:
    Given both cox and faldo are in the panel
    And no survival expert is present in the panel

  Scenario: Argument mechanic fires instead of mutual agreement
    When the panel responds to a predicament
    Then cox and faldo disagree on a specific survival point
    And both positions are confidently stated and factually wrong
    And neither acknowledges the other might have a point
    And no panel member corrects them

  Scenario: Escalation across rounds
    Given the panel has responded to round 1
    When round 2 fires
    Then cox and faldo's positions are more specific and more wrong
    And the disagreement has become more personally invested

  Scenario: Attenborough closes with bewilderment
    When Attenborough delivers the closing verdict
    Then the verdict references the argument without resolving it
