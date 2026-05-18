# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Source for **www.dirigible.io** — the public website and documentation for the Eclipse Dirigible project. It is a hybrid Jekyll + MkDocs site published via GitHub Pages from the `docs/` directory on `master`.

## Build model (important to understand before editing)

The site is **not** built locally for normal commits. CI (`.github/workflows/ci.yaml`) is the source of truth and runs on every push to `master`/`main`:

1. For each `docs-*` source tree (`docs-api`, `docs-help`, `docs-blogs`, `docs-news`, `docs-releases`, `docs-home`), CI runs `squidfunk/mkdocs-material:8.5.11` in Docker to produce `docs-*/site/`.
2. CI wipes `docs/` and assembles the final published site there: MkDocs output under `docs/api/`, `docs/help/`, `docs/blogs/`, `docs/news/`, `docs/releases/`, plus `docs-home` output flattened into `docs/`.
3. Static Jekyll assets (`_data`, `_includes`, `_layouts`, `css`, `fonts`, `gdpr`, `img`, `js`, `services`, `CNAME`, `Gemfile*`, `_config.yml`, `depots.json`) and the top-level HTML pages (`features.html`, `for_developers.html`, `getting_started.html`, `project.html`) are copied into `docs/`. `index.html` is copied as `docs/index-old.html` — the home page served comes from `docs-home`.
4. `.github/folders.sh` regenerates `blogs.json`, `releases.json`, `news.json` from the last 5 dated markdown files in each `docs-*/docs/` tree. Front matter is parsed by reading literal lines 2 and 3 (`title:` and optionally `description:`), so post front matter ordering matters.
5. CI commits the regenerated `docs/` back to `master` with the message `Site content updated - ci skip`.

Two consequences:
- **Never hand-edit files under `docs/`.** They are CI-generated and will be overwritten. Edit the sources in `docs-*/docs/`, the top-level Jekyll files, or `_layouts`/`_includes`/`_data`.
- **`ci skip` in the commit message is load-bearing.** The CI job has `if: "!contains(github.event.head_commit.message, 'ci skip')"` to break the recursion when CI pushes its own commit. Don't put `ci skip` in human commits unless you intend to suppress the rebuild.

## Source layout

- `docs-home/` — landing page MkDocs project (output lands at site root).
- `docs-help/` — user guide / tutorials / API reference. Largest tree; nav defined in `docs-help/mkdocs.yml`.
- `docs-api/` — API docs.
- `docs-blogs/`, `docs-news/`, `docs-releases/` — dated posts under `docs/YYYY/MM/DD/*.md`. Each post has YAML front matter with `title`, `description`, `author`, `author_gh_user`, `author_avatar`, `read_time`, `publish_date`. Authors are also registered in `_data/authors.yml`.
- Each `docs-*` directory has its own `mkdocs.yml`, plus `overrides/` (theme partials) and `redirects/` (legacy URL stubs copied verbatim into the output).
- Top-level `*.html` files are static Jekyll pages copied straight into `docs/`.
- `_config.yml` is Jekyll config used by GitHub Pages when serving `docs/`.

## Local preview

Per the README, preview a single docs tree with the same MkDocs container CI uses:

```
docker run --rm -it -p 8000:8000 -v $PWD/docs-help:/docs squidfunk/mkdocs-material:8.5.11
```

Swap `docs-help` for any other `docs-*` directory. There is no command to build the full composite site locally — that flow only exists in CI.

The Jekyll `Gemfile` exists for GitHub Pages compatibility; `bundle exec jekyll serve` would only render the Jekyll/HTML parts, not the MkDocs trees.

## Adding a blog / news / release post

1. Create `docs-{blogs,news,releases}/docs/YYYY/MM/DD/slug.md`.
2. Match the front-matter shape used by sibling posts in the same year — line 2 must be `title: "..."` and line 3 should be `description: "..."` for `folders.sh` to pick it up correctly.
3. If introducing a new author, add them to `_data/authors.yml`.
4. The post will surface on the home page once CI rebuilds `blogs.json`/`news.json`/`releases.json`.

## Pinned versions

`squidfunk/mkdocs-material:8.5.11` is pinned in CI. If you bump it, also update the `Setup` section of `README.md` so the local preview command matches.
