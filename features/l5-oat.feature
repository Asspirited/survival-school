Feature: L5 — Operational Acceptance Testing (post-deploy)

  Scenario Outline: Live GET routes return HTML with 200
    Given the worker is deployed
    When I GET <route>
    Then the status is 200
    And the content-type contains "text/html"
    And the response time is under 5000ms

    Examples:
      | route                              |
      | /survival-school                   |
      | /survival-school/app               |
      | /survival-school/worst             |
      | /survival-school/mundane           |
      | /survival-school/eat               |
      | /survival-school/deathmatch        |
      | /survival-school/fact-checker      |
      | /survival-school/coyote            |
      | /survival-school/panel-qa          |
      | /survival-school/rooms             |
      | /survival-school/ive-had-worse     |
      | /survival-school/in-my-defence     |

  Scenario: POST /assess returns valid schema within threshold
    Given the worker is deployed
    When I POST /survival-school/assess with a valid scenario
    Then the status is 200
    And the content-type contains "application/json"
    And the response contains "survival_probability" as a number 0-100
    And the response contains a non-empty "panel" array
    And the response time is under 30000ms

  Scenario: POST /ive-had-worse returns valid schema
    Given the worker is deployed
    When I POST /survival-school/ive-had-worse with a valid round
    Then the status is 200
    And the content-type contains "application/json"
    And the response time is under 30000ms

  Scenario: No secrets exposed in any response
    Given the worker is deployed
    When I GET each live route
    Then no response body contains "sk-ant-" or "ANTHROPIC_API_KEY" or "CLOUDFLARE_API_TOKEN"
