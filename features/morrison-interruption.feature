Feature: Jim Morrison mid-session interruption (SS-083)

  Morrison is the corridor guide. He occasionally wanders into any active
  panel session mid-conversation. The panel knows him — they welcome him,
  enjoy his visits, engage with his cryptic observations. Until he says
  something that crosses a line. Then they attack him.

  His visits vary in length. Sometimes he drops in, says one thing, and
  drifts off. Sometimes — if the topic interests him or the panel engages
  him or asks him a question — he stays across multiple rounds. He leaves
  when neither condition holds.

  Random probability per round. All panel modes.

  Scenario: Morrison interrupts with a random probability each round
    Given a panel session is in progress in any mode
    When the worker processes a round
    Then there is a random probability that the response includes a morrison_interruption object
    And the morrison_interruption contains quote, panel_reaction, and tone fields

  Scenario: Morrison does not appear every round
    Given 10 sequential rounds are submitted to the same mode
    Then morrison_interruption is absent from the majority of responses

  Scenario: Panel welcomes Morrison when interruption is benign
    Given a morrison_interruption is present in the response
    And the quote does not cross a line
    Then the tone is one of WARM, AMUSED, ENGAGED
    And at least one panellist acknowledges Morrison by name or reference

  Scenario: Panel attacks Morrison when he crosses a line
    Given a morrison_interruption is present in the response
    And the quote crosses a line with the panel
    Then the tone is HOSTILE
    And at least two panellists turn on Morrison
    And Morrison does not understand what went wrong

  Scenario: Morrison stays when engaged by topic or panel
    Given a morrison_interruption was present in the previous round
    And the panel asked Morrison a question or the topic interests him
    When the next round is processed
    Then morrison_interruption is present again with morrison_present: true
    And Morrison's quote continues or develops from the previous round

  Scenario: Morrison drifts off when not engaged
    Given a morrison_interruption was present in the previous round
    And no panellist engaged Morrison and the topic has moved on
    When the next round is processed
    Then morrison_interruption is absent or contains morrison_present: false

  Scenario: Morrison interruption response schema
    Given a user submits to any panel mode
    When the worker responds with a morrison_interruption
    Then the response JSON contains morrison_interruption.quote as a non-empty string
    And the response JSON contains morrison_interruption.panel_reaction as a non-empty string
    And the response JSON contains morrison_interruption.tone as one of WARM, AMUSED, ENGAGED, HOSTILE
    And the response JSON contains morrison_interruption.morrison_present as a boolean

  Scenario Outline: Morrison can appear in any panel mode
    Given a user submits to <mode>
    When the worker responds with a morrison_interruption
    Then the morrison_interruption schema is valid

    Examples:
      | mode                              |
      | /survival-school/assess           |
      | /survival-school/assess (mundane) |
      | /survival-school/worst            |
      | /survival-school/ive-had-worse    |
      | /survival-school/in-my-defence    |
      | /survival-school/panel-qa         |
      | /survival-school/deathmatch       |
      | /survival-school/fact-checker     |
      | /survival-school/coyote           |
      | /survival-school/eat              |
