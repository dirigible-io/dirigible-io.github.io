---
title: The AI assistant
description: The Intent Editor's third pane - Claude proposes a complete updated app.intent through a tool, the editor shows it as a diff, and Accept merges it. The key stays server-side.
---

# The AI assistant

The third pane of the [Intent Editor](/help/intent/editor) (toggled by the toolbar's discussion icon) is a natural-language assistant that edits `app.intent` at your altitude. It **proposes a patch to the intent, never a re-emitted model file** - the "edit shape, not file shape" contract from the [manifesto](/manifesto/).

It is optional. Turn it off and the editor is still a structured YAML editor a person drives directly. AI is an accelerator, never a single point of failure.

## How it works

1. You describe a change in plain language ("add a country field to Customer").
2. The browser sends `{ yaml, message, history }` to `POST /services/ide/intent/agent`.
3. The server calls the Anthropic Messages API and returns `{ reply, proposedYaml }`. Claude answers either with a plain-text clarifying question, or by calling a single `propose_intent` tool that returns the **complete** updated YAML.
4. The editor renders the proposal as a Monaco **diff** against the current buffer.
5. **Accept** replaces the buffer (still unsaved - dirty tracking and the debounced re-parse fire as usual). **Reject** discards it.

You still Save and Generate yourself. **The assistant never writes to disk and never runs the generators.**

Returning the whole file and diffing it locally was chosen over LLM-authored unified diffs (fragile to apply) and structured edit-ops (which lose comments and formatting). The system prompt teaches Claude the diff-stability rules: change minimally, preserve key order and comments, append rather than reorder.

## The system prompt

The assistant's system prompt is an **externalised, reviewable resource** (`intent-assistant-guide.md`, loaded from the classpath), not an inline string - so it can be maintained as documentation and kept in lockstep with what the parser enforces. It documents the full schema, including the [declarative-glue catalog](/help/intent/glue) and the trigger `businessKey` / `businessKeyStrategy`, plus the recipient grammar (literal / direct field / one-hop `relation.field`, no braces).

## Transcript discipline

The browser keeps two lists: a display log (which may hold errors and UI notes) and a clean alternating user/assistant transcript sent as `history`. The current YAML is embedded fresh in every latest user turn, so the model always diffs against ground truth even after an Accept. Tool calls are not replayed. A failed turn pops its dangling user turn so the next request stays alternating.

## Configuration

The API key is read server-side via `DirigibleConfig` and is **never** sent to the browser. With no key configured the assistant is disabled and the endpoint returns `412`.

| Environment variable | Default | Purpose |
| --- | --- | --- |
| `DIRIGIBLE_INTENT_AI_API_KEY` | (blank) | Anthropic API key. Blank disables the assistant. |
| `DIRIGIBLE_INTENT_AI_MODEL` | `claude-opus-4-8` | model id |
| `DIRIGIBLE_INTENT_AI_BASE_URL` | `https://api.anthropic.com` | API base URL |
| `DIRIGIBLE_INTENT_AI_MAX_TOKENS` | `8192` | max response tokens |
| `DIRIGIBLE_INTENT_AI_VERSION` | `2023-06-01` | Anthropic API version header |

The whole feature is one server-side bridge (`IntentAgentService` + `IntentAgentEndpoint`); the JDK `HttpClient` makes the call. The key never leaves the server.

## See also

- [The Intent Editor](/help/intent/editor)
- [The `.intent` file](/help/intent/intent-file)
- [Intent-Driven Application Development Manifesto](/manifesto/)
- [Environment variables](/help/setup/environment-variables)
