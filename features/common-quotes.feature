Feature: Common quotes attribute (SS-143)

  Every character in CHARACTERS has a quotes array of concrete verbal anchors
  the LLM can deploy. Quotes must have enough variety to avoid repetition,
  and must work in both positive and negative contexts.

  Scenario: Every character has a non-empty quotes array
    Given every character entry in CHARACTERS
    Then each character has a quotes property
    And quotes is an array with at least 3 entries
    And every entry is a non-empty string

  Scenario Outline: Quotes provide sufficient variety per character
    Given the character <charId>
    Then their quotes array has at least <min> entries
    And no two entries are identical

    Examples:
      | charId      | min |
      | ray         | 4   |
      | bear        | 4   |
      | cody        | 4   |
      | hales       | 4   |
      | fox         | 4   |
      | billy       | 4   |
      | ollie       | 3   |
      | craighead   | 3   |
      | coyote      | 4   |
      | attenborough| 4   |
      | oshea       | 4   |
      | stevens     | 4   |
      | stroud      | 3   |
      | jim         | 4   |
      | jeremy      | 5   |
      | middleton   | 4   |
      | mcnab       | 3   |
      | ryan        | 3   |
      | cox         | 4   |
      | faldo       | 4   |
      | hawking     | 3   |
      | lee         | 4   |
      | gordon      | 4   |
      | bristow     | 4   |
      | keane       | 4   |
      | packham     | 4   |
      | backshall   | 4   |
      | fry         | 3   |
