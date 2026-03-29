Feature: Cody Override mechanic (SS-020)

  Scenario: Cody refuses to participate in bad survival advice
    Given Cody is in the panel
    And the scenario involves survival advice that is dangerously wrong
    When the panel responds
    Then Cody stops participating
    And his response indicates the advice is wrong and could kill someone
    And the response is brief and final — no drama, no speech

  Scenario: Simultaneous Cody Override and Packham Ethical Override
    Given both Cody and Packham are in the panel
    And the scenario triggers both overrides
    When the panel responds
    Then Ray agrees with both silently
    And Bear does the thing anyway
    And Hales does the correct version without mentioning it
