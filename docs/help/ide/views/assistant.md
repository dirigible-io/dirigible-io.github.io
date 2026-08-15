---
title: Assistant
description: The Workbench's AI assistant for the hand-written Java under custom/ - it proposes a complete file, really compiles it against the project, and writes it only on an explicit Accept.
---

# Assistant

A right-region Workbench view that helps you write the Java the [intent](/help/intent/) deliberately does not express - a `CalculatedField` action, a `JavaDelegate` behind a service task, a custom component. It is the second half of the [boundary handoff](/help/intent/ai-assistant#the-boundary-and-what-happens-at-it): the Intent Editor's assistant *names* the custom work and scaffolds a stub for it, this one helps you *write* it.

It follows the editor you are working in - no file picker, no "assist with this" button. Open `custom/InvoiceNumber.java` and the pane is already about that file.

## What it will and will not help with

| The focused file | What the view does |
| --- | --- |
| `custom/*.java`, or any hand-written `.java` in the project | Chats about it |
| Anything under `gen/` | Refuses, and says why: it is rewritten on the next Generate, so a proposal there could only be lost. Change the model, or the `custom/` class it points at |
| A non-Java file | Refuses, and says so |

A refusal is always stated. An input box that silently does nothing is worse than a sentence explaining the rule.

## How a turn works

1. You describe what the class should do.
2. The view asks the **open editor** for its current content on the `editor.content.request` topic - so the assistant reasons about the **buffer you are looking at**, unsaved changes included, not the file on disk. If no editor answers within 700 ms it falls back to the workspace copy.
3. The browser posts `{ workspace, project, path, source, message, history }` to `POST /services/ide/intent/assist`.
4. The server assembles the context (the target buffer, the project's other Java sources, an index of the types available to it), calls the model, and gets back either a plain-text answer or a single `propose_java` tool call carrying the **complete** proposed file.
5. **The proposal is really compiled** before you see it - see below.
6. The view renders it as an inline Monaco **diff** against the current buffer, in the editor theme you are using.
7. **Accept** writes the file through the workspace API and posts `monaco.file.reload`. **Reject** discards it.

The assistant never writes to disk on its own. Every change lands on an explicit Accept - the same contract as the [Intent Editor's assistant](/help/intent/ai-assistant).

## The proposal is compiled, batched with the project

Validation is not a syntax check. `JavaSourceCompiler.compileBatch` compiles the proposal **together with the project's other Java sources** - the generated entities and repositories under `gen/`, the sibling `custom/` classes - exactly as the runtime compiles them. That batching is the contract, not an optimisation: a `custom/` class exists in order to use the generated repositories, so compiled alone it resolves nothing and every proposal would look broken.

Errors on the proposal are fed back to the model, which is asked to correct the **complete** source. The loop is bounded at **2 repair rounds** (at most 3 upstream calls per turn), so a stubbornly invalid proposal cannot spin the request.

Only the *target* file's diagnostics drive the loop. A sibling that was already broken is the project's state, not something the proposal did.

Whatever diagnostics remain after the repair rounds are shown next to the diff. **A proposal is never withheld because of them, and never hidden either** - you decide whether it is close enough to accept and finish by hand.

The compile is side-effect-free. It never reloads the project's classes and never republishes anything.

## Accept and a dirty editor

`monaco.file.reload` deliberately refuses to reload an editor with unsaved changes - your work is never clobbered. The view knows whether the editor was dirty, because the same content request that gave it the buffer also told it, so Accept reports honestly: the file was written, and the open editor kept its unsaved changes instead of reloading.

## Conversation

The transcript is persisted server-side, keyed by tenant, project, surface (`workbench`) and file path - the same store the Intent Editor and the Builder shell use for their own conversations. Reopen the file - on another machine, after a restart - and the conversation about it is still there.

The view keeps two lists, as the intent assistant does: a display log that may hold errors and UI notes, and a clean alternating user/assistant transcript sent upstream as `history`.

## Configuration

The Workbench assistant reuses the **same five keys** as the Intent Editor's assistant - one platform AI configuration, not a parallel set. The API key is read server-side and never sent to the browser; with no key configured the endpoint returns `412` and the view says so instead of failing on send.

See [The AI assistant - Configuration](/help/intent/ai-assistant#configuration) for the table.

The endpoint is restricted to `ADMINISTRATOR` and `DEVELOPER`.

## See also

- [The AI assistant](/help/intent/ai-assistant) - the Intent Editor's assistant, and the boundary that hands work to this one
- [Problems](/help/ide/views/problems) - the same compiler diagnostics, for the project as published
- [Workbench](/help/ide/perspectives/workbench)
