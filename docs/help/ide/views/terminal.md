---
title: Terminal
description: In-browser shell backed by ttyd.
---

# Terminal

A full interactive shell embedded in the IDE. Useful for `git`, `mvn`, `npm`, file inspection, and any OS command the host exposes.

## Backend

Backed by [ttyd](https://github.com/tsl0922/ttyd) on port `9000` on the same host as the Dirigible JVM. The shell is whatever the host process exposes:

- Linux / macOS - `bash`.
- Windows - `cmd.exe` (or `powershell` depending on the host configuration).

The terminal runs with the same user and working directory as the Dirigible process; the on-disk repository root lives at `./target/dirigible/` by default.

## Frontend

[Xterm.js](https://xtermjs.org/) renders the terminal in the browser and negotiates a WebSocket connection to the ttyd backend. Standard terminal key bindings work (Ctrl-C, Ctrl-D, Ctrl-R, ...).

## Multiple tabs

Open more than one Terminal tab to run parallel commands. Each tab is an independent PTY on the host.
