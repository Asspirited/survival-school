Feature: Chip category tiles — consistent UX (SS-129)

  Scenario Outline: Feature page groups chips under category tiles
    Given a user navigates to <page>
    Then chips are grouped under category tile headers with class "chip-cat"
    And each tile header shows the category name
    And the first category is expanded by default
    And collapsed categories can be tapped to expand

    Examples:
      | page                              |
      | /survival-school/ive-had-worse    |
      | /survival-school/in-my-defence    |
      | /survival-school/worst            |
      | /survival-school/mundane          |
      | /survival-school/eat              |
      | /survival-school/fact-checker     |
      | /survival-school/coyote           |
      | /survival-school/panel-qa         |
      | /survival-school/irwin-memorial   |
      | /survival-school/one-man-in       |
