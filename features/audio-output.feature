Feature: Audio output for panel cards (SS-158)

  Panel character responses can be played aloud with distinct
  character-appropriate voices via ElevenLabs TTS.

  Scenario: Panel card shows play button
    Given a user is on the I've Had Worse page
    When the panel response renders
    Then each panel card has a visible speaker button

  Scenario: Clicking play streams character audio
    Given a panel card for Ray has rendered with response text
    When the user clicks the speaker button on Ray's card
    Then audio begins playing within 3 seconds
    And the button shows a loading state while audio loads
    And the button shows a playing state while audio plays

  Scenario: Each character has a distinct voice
    Given panel cards for Ray, Bear, and Attenborough have rendered
    When the user plays each card's audio
    Then each character's audio uses a different ElevenLabs voice ID

  Scenario: TTS route returns audio stream (OAT)
    Given a POST to /survival-school/tts with charId "ray" and text "Don't."
    When the worker processes the request
    Then it returns audio/mpeg with status 200
    And the response streams without full buffering
    And no ELEVENLABS_API_KEY appears in the response headers or body
