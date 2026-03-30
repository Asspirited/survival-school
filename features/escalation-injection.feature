Feature: Per-character escalation injection in multi-turn panel features (SS-148)

  Background:
    Given a multi-turn panel feature (IHW, IMD, The Alibi, The Expert Witness, or OMI)
    And the panel members are locked at session start

  Scenario: System prompt includes escalation injection block on every round
    Given a panel of ray, bear, fox, and cody at round 1
    When the client builds the system prompt
    Then the prompt contains a PER-CHARACTER ESCALATION section
    And each panel member has at least one named pool with concrete items
    And the prompt contains a RELATIONAL AXES section

  Scenario Outline: Escalation pools gate by round
    Given a panel including <charId> at round <round>
    When buildEscalationInjection is called
    Then <charId> has <expected_pools> pools available

    Examples:
      | charId | round | expected_pools |
      | ray    | 1     | 1              |
      | ray    | 3     | 3              |
      | bear   | 1     | 1              |
      | bear   | 3     | 3              |

  Scenario: Relational axes only fire when both characters are present
    Given a panel of ray and bear
    When buildEscalationInjection is called
    Then the injection contains the ray>bear axis
    And the injection contains the bear>ray axis
    But the injection does not contain any axis involving fox

  Scenario: Relational axes absent when no pair exists
    Given a panel of hales and keane
    When buildEscalationInjection is called
    Then the RELATIONAL AXES section is empty or absent

  Scenario: Wound description included for every character with a wound
    Given a panel of ray, bear, and cody
    When buildEscalationInjection is called
    Then ray has a WOUND line mentioning "The Show That Should Have Been His"
    And bear has a WOUND line mentioning "The Travelodge"
    And cody has a WOUND line mentioning "The Spear in the Pool"

  Scenario: Turn maps 1:1 to round for escalation gating
    Given a user has completed 3 turns (submissions) in IHW
    When the client builds the system prompt for turn 4
    Then buildEscalationInjection is called with round 4

  Scenario: Wandering characters are not in escalation injection
    Given a panel of ray and bear with morrison_present true
    When buildEscalationInjection is called
    Then the injection does not contain an escalation profile for morrison

  Scenario Outline: IHW, IMD, Alibi, Expert Witness, and OMI all include escalation injection
    Given the <feature> system prompt is built with panel members and a round number
    When the prompt is assembled
    Then the prompt contains a PER-CHARACTER ESCALATION section

    Examples:
      | feature          |
      | ive-had-worse    |
      | in-my-defence    |
      | the-alibi        |
      | the-expert-witness |
      | one-man-in       |
