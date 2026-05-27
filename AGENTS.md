# Agent Instructions

- Diagnose failures and fix the root cause. Do not add fallback behavior that hides a failing query, broken UI state, or missing test setup.
- Keep changes scoped to the GitHub issue being worked.
- Use `npm test` as the required verification command.
- Do not commit secrets, tokens, local usernames, or workstation-specific paths.

## Clarification Contract

If the issue cannot be completed without a product decision, create a JSON request in `.smooth-operator/orchestrator-requests/` and then stop for the orchestrator answer. Replace `${SO_EXECUTION_RUN_ID}` with the current execution run id from the runner environment.

Example:

```json
{
  "executionRunId": "${SO_EXECUTION_RUN_ID}",
  "question": "What exact text should replace the launch badge copy?",
  "reasonBlocked": "The issue asks for copy but does not define the desired wording.",
  "riskLevel": "medium",
  "evidence": [
    {
      "type": "issue_comment",
      "ref": "GitHub issue",
      "summary": "The required copy is omitted."
    }
  ],
  "canProceedWithDefault": false,
  "options": [
    {
      "label": "Ask user for exact copy",
      "description": "Wait for a human product decision."
    },
    {
      "label": "Abort",
      "description": "Stop because the task is under-specified."
    }
  ],
  "agentRecommendation": {
    "label": "Ask user for exact copy",
    "rationale": "Copy is product-facing and should not be invented.",
    "confidence": 0.95
  }
}
```